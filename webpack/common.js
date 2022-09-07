const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const env = process.env.NODE_ENV;
const { _path } = require('../lib/util');
const { getEntrys, htmlPlugins } = require('./pages');
const sysConfig = require(_path('./sysConfig.js'));

function getAlias() {
  let _alias = {
    '@': _path('./src'),
  };;
  if(sysConfig.alias) {
    for(let i in sysConfig.alias) {
      _alias[i] = _path(sysConfig.alias[i])
    }
  }

  return _alias;
}

process.env.BABEL_ENV = env != 'prod' ? 'development' : 'production';

let output;
const pureOutput = {
  path: sysConfig?.output?.path ? _path(sysConfig?.output?.path) :  _path('./dist'),
  // [contenthash:8] - 本应用打包输出文件级别的更新，导致输出文件名变化
  filename: 'static/js/[name]/[name]-[contenthash:8].js',
  // 编译前清除目录
  clean: true,
};
if(sysConfig.output) {
  output = Object.assign(pureOutput, sysConfig.output, { path: sysConfig?.output?.path ? _path(sysConfig?.output?.path) :  _path('./dist') });
}else {
  output = pureOutput;
}

module.exports = {
  entry: getEntrys(),
  output,
  resolve: {
    // 配置路径别名
    alias: getAlias(),
    mainFiles: ['index', 'main'],
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    ...htmlPlugins(),
    new CleanWebpackPlugin(),
    new Webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(env || 'dev')
    }),
    new Webpack.ProvidePlugin({
      "React": "react",
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      threads: true
    }),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" },
      ],
    }),
  ],
}
