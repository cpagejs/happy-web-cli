import React, { useContext, useEffect } from "react";
import { Layout, Menu, Dropdown, Select } from "antd";
import MyIcon from "@/components/icon/";
import { logout as appLogout } from "@/utils/auth";
import { appContext } from "@/context/appContext";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { translate } from "@/utils/lang";
import { getUserInfo } from "@/utils/auth";

const { Header } = Layout;

const RightMenu = ({ logout }) => (
  <Menu className="right-down">
    <Menu.Item
      key="logout"
      onClick={logout}
      icon={<MyIcon type="icon_disconnectdevice" />}
    >
      {translate("退出")}
    </Menu.Item>
  </Menu>
);

const getPopupContainer = (HTMLElement) => HTMLElement;

const LayoutHeader = (props) => {
  const { state, dispatch } = useContext(appContext);
  const logout = () => {
    appLogout();
  };

  const onLangChange = (res) => {
    dispatch({
      type: "changeLang",
      payload: res
    });
  };

  useEffect(() => {
    // setInterval(() => {
    //   const pops = document.getElementsByClassName("ant-menu-submenu-popup");
    //   if(pops && pops.length) {
    //     for (let i = 0; i < pops.length; i++) {
    //       const ele = pops[i];
    //       if(!ele.classList.contains("menupop-show")) {
    //         ele.classList.add("menupop-show");
    //       }
    //     }
    //   }
    // }, 100);
  }, []);

  const toggle = () => {
    dispatch({
      type: "changeMenuTrigger",
      payload: !state.navCollapsed
    });
  };

  const userInfo = getUserInfo();

  return (
    <Header className="header">
      <div className="trigger">
        {React.createElement(state.navCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
      </div>
      {props.children}
      <div className="right">
        <Select defaultValue={state.lang} style={{ width: 120, marginRight: 10 }} onChange={onLangChange}>
          <Select.Option value="zh">中文</Select.Option>
          <Select.Option value="en">English</Select.Option>
        </Select>
        <Dropdown
          placement="bottom"
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={logout} />}
        >
          <div>{userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default LayoutHeader;
