import React, { useReducer } from "react";
import { setSelectMenu, getSelectMenu, getLang, setLang, setMenuTrigger, getMenuTrigger } from "@/utils/auth";

const menuInfo = getSelectMenu();
const initialState = {
  menu: {
    openKeys: menuInfo?.openKeys || [],
    selectedKeys: menuInfo?.selectedKeys || [],
  },
  lang: getLang(),
  navCollapsed: getMenuTrigger() || false,
};

const appContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "logout":
      return {
        menu: {
          openKeys: [],
          selectedKeys: [],
        },
        lang: 'en',
        navCollapsed: false
      };
    case "openKeys":
      setSelectMenu({
        ...state.menu,
        openKeys: action.payload,
      });
      return {
        ...state,
        menu: {
          ...state.menu,
          openKeys: action.payload,
        }
      };
    case "selectedKeys":
      setSelectMenu({
        ...state.menu,
        selectedKeys: action.payload,
      });
      return {
        ...state,
        menu: {
          ...state.menu,
          selectedKeys: action.payload
        }
      };
    case "changeLang":
      setLang(action.payload);
      return {
        ...state,
        lang: action.payload
      };
    case "changeMenuTrigger":
      setMenuTrigger(action.payload);
      return {
        ...state,
        navCollapsed: action.payload
      };
    default:
      return state;
  }
}

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appContext.Provider value={{ state, dispatch }}>
      {props.children}
    </appContext.Provider>
  );
};

export { reducer, appContext, AppProvider };
