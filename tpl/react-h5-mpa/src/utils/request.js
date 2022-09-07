import { Toast } from "antd-mobile";
import axios from "axios";

// import { getLang } from "./language";
import { getToken, TOKEN_KEY } from "./auth";

const RESPONSE_CODE = {
  SUCCESS: 200,
  TOKEN_EXPIRATION: 30000,
  LOGIN_MANY_FAIL: 31123,
  BANK_ACCOUNT_LENGTH_LG_10: 3038,
  BANK_ACCOUNT_ALREADY: 3010,
  FUND_PASSWORD_ERROR_LG_5: 31073,
  TRADE_ERROR: 32105, //42001
};

const NO_ALERT_ERROR_CODE = new Set([]);

const request = axios.create({
  baseURL: '/',
  timeout: 15000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

request.interceptors.request.use(
  function (config) {
    config.headers = config.headers || {};
    config.params = config.params || {};
    config.headers["Accept-Language"] = "en";
    config.params[TOKEN_KEY] = getToken();
    return config;
  },
  function (error) {
    const result = error.request ? error.request.data : undefined;
    Toast.show({
      content: result ? result.msg : error.message,
    });
    return Promise.reject(result || error);
  }
);

request.interceptors.response.use(
  function (response) {
    /**
     * 如果 http 状态码是200，也有可能是失败（后台不改，这里由前端做兼容）
     */
    if (response.data?.code) {
      /**
       * 后台说返回 code 也不一定表示失败
       */
      // 后台返回了 code
      if (response.data.code === RESPONSE_CODE.SUCCESS) {
        /**
         * 沟通后，后台表示返回 200 就表示成功
         */
        return {
          code: 0,
          status: response.status,
          data: response.data.data || response.data || {},
        };
      } else if (response.config.url !== "/api/v1/ausFiatAsset/showPayId") {
        /**
         * /api/v1/ausFiatAsset/showPayId 这里如果是 payId 状态，后台返回为 { code: 3017.. }, 这种也表示成功
         */
        if (!NO_ALERT_ERROR_CODE.has(response.data.code)) {
          // 这里为了应付不同提示框的需求（产品需求）
          // 需要弹出错误提示框
          Toast.show({
            content: response.data?.msg || "",
          });
          return response.data;
        }
        return Promise.reject(response.data);
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
      // return logout();
    }
    if (!NO_ALERT_ERROR_CODE.has(result?.code)) {
      // 需要弹出错误提示框
      Toast.show({
        content: result ? result.msg : error.message,
      });
      return result || error;
    }
    return Promise.reject(result || error);
  }
);

export default request;
