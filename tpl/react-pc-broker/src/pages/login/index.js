import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginComp from "./login";
import GaCode from "./gaCode";
import { getUserInfo } from "@/utils/auth";
import "./index.less";

function Login() {
  const navigate = useNavigate();
  const [gaShow, setGaShow] = useState(false);
  const [requestId, setRequestId] = useState();

  const showGaCode = (data) => {
    setGaShow(true);
    setRequestId(data.requestId);
  };

  useEffect(() => {
    const userInfo = getUserInfo();
    if (navigate) {
      if (userInfo) {
        navigate('/');
      } else {
        navigate('/login');
      }
    } else {
      if (userInfo) {
        window.location.href = "/";
      } else {
        window.location.href = "/#/login";
      }
    }
  }, []);

  return (
    <div className="login-container">
      <div className="wrapper">
        {gaShow ? <GaCode requestId={requestId} /> : <LoginComp showGaCode={showGaCode} />}
      </div>
    </div>
  );
}

export default Login;
