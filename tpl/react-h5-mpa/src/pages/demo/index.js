
import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl';

import App from './app';
import en from './languages/en';
import zh from './languages/zh';

if(NODE_ENV !== 'prod') {
  const VConsole = require('vconsole');
  new VConsole();
}

ReactDOM.render(
  <IntlProvider locale={navigator.language} messages={en} defaultLocale="en">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </IntlProvider>,
  document.getElementById('root')
);
  