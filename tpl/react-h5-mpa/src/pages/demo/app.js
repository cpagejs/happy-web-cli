import React from 'react';
import { Button } from 'antd-mobile';
import { useEffect,useState } from 'react';
import { useIntl } from 'react-intl';
import './index.less';
import 'antd-mobile/es/global';

import { urlParse } from '@/utils/common';

import { appPackage } from './api';


function App() {
  const intl = useIntl();
  const [txt] = useState(123);

  useEffect(() => {
    appPackage();

    console.log(urlParse('type'));
  }, []);
  return (
    <>
      page1---{txt}
      <p><Button color='primary'>antd-mobile</Button></p>
      <p>{intl.formatMessage({ id: "switch" })}</p>
    </>
  );
}

export default App;