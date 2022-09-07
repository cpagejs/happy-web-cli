import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "@/layout";
import Login from "@/pages/login";
import { getUserInfo, getLang } from "@/utils/auth";
import { ConfigProvider } from 'antd';
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";

function AppRouter() {
  const userInfo = getUserInfo();
  const lang = getLang();

  if(!userInfo) {
    window.location.href = "/#/login";
  }
  return (
    <ConfigProvider locale={lang === 'en' ? enUS : zhCN}>
      <Router basename="">
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/*" element={< AdminLayout/>} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default AppRouter;
