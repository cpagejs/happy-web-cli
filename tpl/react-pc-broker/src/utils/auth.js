import Cookie from "js-cookie";
import { TOKEN_KEY, USER_INFO, SELECT_MENU, LANG, MENU_TRIGGLE } from "../config/constants";

export function getToken() {
  return Cookie.get(TOKEN_KEY);
}

export function logout() {
  window.localStorage.removeItem(USER_INFO);
  window.localStorage.removeItem(SELECT_MENU);
  window.localStorage.removeItem(LANG);
  window.localStorage.removeItem(MENU_TRIGGLE);
  setTimeout(() => {
    window.location.href = "/";
  }, 0);
}

export function setUserInfo(data) {
  window.localStorage.setItem(USER_INFO, data);
}

export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem(USER_INFO));
}

export function setSelectMenu(data) {
  window.localStorage.setItem(SELECT_MENU, JSON.stringify(data));
}

export function getSelectMenu() {
  return JSON.parse(window.localStorage.getItem(SELECT_MENU));
}

export function setLang(type) {
  window.localStorage.setItem(LANG, type);
}

export function setMenuTrigger(data) {
  window.localStorage.setItem(MENU_TRIGGLE, data);
}

export function getMenuTrigger() {
  if(!window.localStorage.getItem(MENU_TRIGGLE)) {
    return false;
  }

  const obj = {
    "true": true,
    "false": false
  };
  return obj[window.localStorage.getItem(MENU_TRIGGLE)];
}

export function getLang() {
  const lang = window.localStorage.getItem(LANG);
  if(lang) {
    return lang;
  }else {
    setLang("en");
    return "en";
  }
}