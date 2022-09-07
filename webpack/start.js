const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const common = require('./common');
const { _path } = require('../lib/util');

const sysConfig = require(_path('./sysConfig.js'));

const devConfig = merge(common, {
  mode: 'development',
  output: {
    path: _path('./dist'),
    // [contenthash:8] - 本应用打包输出文件级别的更新，导致输出文件名变化
    filename: '[name].js',
    publicPath: '/',
    // 编译前清除目录
    clean: true,
  },
  // output,
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    open: sysConfig.openBrower, // 自动打开页面
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
    client: {
      overlay: true,
    },
    host: sysConfig.host,
    // 端口
    port: sysConfig.port,
    proxy: sysConfig.proxyConfig,
    https: sysConfig.https ? sysConfig.https : false,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
}) // 暂不添加配置

const compiler = Webpack(devConfig);
const server = new WebpackDevServer(devConfig.devServer, compiler);

server.startCallback(() => {
  console.log('---runing----');
});
