import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { appContext } from "../context/appContext";
import zh_CN from './zh';
import en_US from './en';
import { getLang } from "@/utils/auth";

export default function LangProvider(props) {
	const { state } = useContext(appContext);

	const chooseLocale = (val) => { 
    let _val = val || getLang();
    switch (_val) {
      case 'en':
        return en_US
      case 'zh':
        return zh_CN
      default:
        return zh_CN
    }
  };

	// 获取 locale
	let locale = state.lang; 
  let { children } = props;

  // 包裹子组件 让子组件共享react-intl的api 实现多语言
	return (
    <IntlProvider
      key={locale}
      locale={locale}
      defaultLocale='zh'
      messages={chooseLocale(locale)}
    >
      {children}
    </IntlProvider>
  );

}