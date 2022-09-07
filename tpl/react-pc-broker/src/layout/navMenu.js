import React, { useContext, useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { cloneDeep } from "lodash";
import { appContext } from "@/context/appContext";
import { translate } from "@/utils/lang";
import menuRoutes from "@/config/menuRoutes";

export default function NavMenu() {
  const navigate = useNavigate();
  const menuRoutesCopy = cloneDeep(menuRoutes);
  const { Sider } = Layout;
  const { state, dispatch } = useContext(appContext);

  const [openKeys, setOpenKeys] = useState(state.menu.openKeys);

  useEffect(() => {
    if(state.navCollapsed) {
      setOpenKeys(state.menu.openKeys);
    }

    if(!state.navCollapsed) {
      dispatch({
        type: 'openKeys',
        payload: openKeys
      });
    }
  }, [state.navCollapsed]);

  const setMenusLang = (menus) => {
    menus.forEach(item => {
      const label = item.label;
      item["label"] = translate(label);
      if(item.children && item.children.length) {
        setMenusLang(item.children);
      }
    });
    return menus;
  };
  const _menus = setMenusLang(menuRoutesCopy);

  // 菜单组折叠
  const onOpenChange = (keys) => {
    dispatch({
      type: 'openKeys',
      payload: keys
    });
  };

  const onMenuSelect = (menu) => {
    console.log(menu)
    dispatch({
      type: 'selectedKeys',
      payload: [menu.key]
    });
    navigate(menu.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={state.navCollapsed}>
      <div className="menu-logo">logo</div>
      <Menu
        mode="inline"
        theme="dark"
        onOpenChange={onOpenChange}
        onSelect={onMenuSelect}
        openKeys={state.menu.openKeys}
        selectedKeys={state.menu.selectedKeys}
        items={_menus}
      />
    </Sider>
  );
}