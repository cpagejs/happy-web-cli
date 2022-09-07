/**
 * 配置一些系统的常量
 */

/* eslint-disable no-undef */
const env = NODE_ENV;
const sysName = 'xx';

const TOKEN_KEY = `${env}_${sysName}_token`;
const USER_INFO = `${env}_${sysName}_user`;
const SELECT_MENU = `${env}_${sysName}_selectmenu`; // 左侧按钮选中状态

const LANG = `${env}_${sysName}_lang`; // 多语言

const MENU_TRIGGLE = `${env}_${sysName}_navCollapsed`; // 菜单展开折叠状态

export {
	TOKEN_KEY,
	USER_INFO,
	SELECT_MENU,
	LANG,
	MENU_TRIGGLE,
};