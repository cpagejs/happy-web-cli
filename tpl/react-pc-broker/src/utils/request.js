import axios from "axios";
import { message } from "antd";
import { logout, getLang } from "./auth";

const NO_ALERT_ERROR_CODE = new Set([]);

const RESPONSE_CODE = {
  SUCCESS: 200,
  TOKEN_EXPIRATION: 30000,
  LOGIN_MANY_FAIL: 31123,
  BANK_ACCOUNT_LENGTH_LG_10: 3038,
  BANK_ACCOUNT_ALREADY: 3010,
  FUND_PASSWORD_ERROR_LG_5: 31073,
  TRADE_ERROR: 32105, //42001
};

const request = axios.create({
  baseURL: '',
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  function (config) {
    config.headers = config.headers || {};
    config.params = config.params || {};
    config.headers["Accept-Language"] = getLang() || "en";
    return config;
  },
  function (error) {
    const result = error.request ? error.request.data : undefined;
    message.error(result ? result.msg : error.message);
    return Promise.reject(result || error);
  }
);

request.interceptors.response.use(
  function (response) {
    /**
     * 如果 http 状态码是200，也有可能是失败
     */
    if (response.data?.code) {
      // 后台返回了 code
      if (response.data.code === RESPONSE_CODE.SUCCESS) {
        /**
         * 返回 200 就表示成功
         */
        return {
          code: 0,
          status: response.status,
          data: response.data.data || response.data || {},
        };
      }
    }
    // 没有返回 code，直接返回数据，表示一定成功
    return {
      code: 0,
      status: response.status,
      data: response.data || {},
    };
  },
  function (error) {
    const result = error.response ? error.response.data : undefined;
    if (result?.code === RESPONSE_CODE.TOKEN_EXPIRATION) {
      // 登录过期
      return logout();
    }
    if (!NO_ALERT_ERROR_CODE.has(result?.code)) {
      // 需要弹出错误提示框
      message.error(result ? result.msg : error.message);
      return result || error;
    }
    return Promise.reject(result || error);
  }
);

export default request;
