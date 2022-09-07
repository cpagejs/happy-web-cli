import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import 'antd-mobile/es/global';
import { HashRouter} from "react-router-dom";
import App from './App';

import en from './languages/en';
import zh from './languages/zh';

/* eslint-disable no-undef */
console.log(NODE_ENV)
if (NODE_ENV !== 'prod') {
  const VConsole = require('vconsole');
  new VConsole();
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <IntlProvider locale={navigator.language} messages={en} defaultLocale="en">
      <HashRouter>
        <App />
      </HashRouter>
    </IntlProvider>
  );
