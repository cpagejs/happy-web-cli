const htmlWebpackPlugin = require('html-webpack-plugin');
const { _path } = require('../lib/util');
const sysConfig = require(_path('./sysConfig.js'));

function getEntrys() {
  if(sysConfig.isMpa) {
    let obj = {};
    sysConfig.routes.forEach(item => {
      obj[item['name']] = _path(item['js']);
    });
    return obj;
  }else {
    return _path('./src/index.js');
  }
}

function htmlPlugins() {
  let arr = [];
  if(sysConfig.isMpa) {
    sysConfig.routes.forEach(item => {
      arr.push(new htmlWebpackPlugin({
        filename: item['name'] + '.html',
        template: _path(item['html']),
        favicon:  _path('./public/favicon.ico'),
        chunks: [item.name]
      }));
    });
  }else {
    arr.push(new htmlWebpackPlugin({
      template: _path('./public/index.html'),
      favicon:  _path('./public/favicon.ico'),
    }));
  }
  return arr;
}

module.exports = {
  getEntrys,
  htmlPlugins
};