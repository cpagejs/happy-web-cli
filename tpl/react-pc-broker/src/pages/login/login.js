import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import md5 from "md5";
import MyIcon from "@/components/icon";
import { setUserInfo } from "@/utils/auth";
import { loginApi } from "./api";
import "./index.less";

const IPT_RULE_USERNAME = [
  {
    required: true,
    message: "请输入邮箱",
  },
];

const IPT_RULE_PASSWORD = [
  {
    required: true,
    message: "请输入密码",
  },
];

function Login(props) {
  const [btnLoad, setBtnLoad] = useState(false);

  const onFinish = (values) => {
    setBtnLoad(true);
    const params = {
      username: values.email,
      // password: md5(values.password).toLocaleUpperCase(),
      password: values.password
    };
    loginAction(params);
  };

  const loginAction = (params) => {
    loginApi(params)
      .then((res) => {
        setBtnLoad(false);

        if (res.code === 0) {
          setUserInfo(JSON.stringify(res?.data?.data));
        }
      })
      .catch(() => {
        setBtnLoad(false);
      });
  };

  return (
    <div className="login-comp">
      <div className="title">broker-admin</div>
      <div className="welcome">welcome</div>
      <Form
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={IPT_RULE_USERNAME}>
          <Input
            prefix={<MyIcon type="icon_nickname" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item name="password" rules={IPT_RULE_PASSWORD}>
          <Input.Password
            prefix={<MyIcon type="icon_locking" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item className="forget">
            <span>Forget Password?</span>
          </Form.Item>
        </Form.Item>
        <Form.Item className="btns">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={btnLoad}
          >
            login
          </Button>
          <Button htmlType="reset">reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
