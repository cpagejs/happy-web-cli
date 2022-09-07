const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const chalk = require('chalk');
const common = require('./common');
const { getEntrys } = require('./pages');
const { _path } = require('../lib/util');
const sysConfig = require(_path('./sysConfig.js'));

const prodConfig =  {
  mode: 'production',
  target: 'web',
  output: {
    publicPath: sysConfig.output ? sysConfig.output.publicPath : '/',
    filename: 'static/js/[name]/[name]-[contenthash:8].js',
  },
  entry: getEntrys(),
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name]_[contenthash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024    //(表示10kb以下的文件转换成base64编码)
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name]_[contenthash:6][ext]',
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]/[name]_[contenthash:6].css',
    }),
    new CompressionPlugin(),
  ],
  //terser-webpack-plugin 默认开启了 parallel: true 配置，并发运行的默认数量： os.cpus().length - 1 ，
  //  配置的 parallel 数量为 4，使用多进程并发运行压缩以提高构建速度。
  optimization: {
    // 通过配置 optimization.runtimeChunk = true，为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    // runtimeChunk: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        commons: {
          test: /\.(s*)js$/,
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          name: 'common',
          enforce: true,
          priority: -11
        },
      }
    },
  },
};

let webpackConfig;
webpackConfig = merge(common, prodConfig);

Webpack(webpackConfig, function (err, stats) {
  if (err) {
    console.log(chalk.red('打包失败'));
    console.log(err);
    process.exit(1);
  }
  if (stats.hasErrors()) {
    console.log(chalk.red('打包失败'));
    process.stderr.write(stats.toString('errors-only'));
    process.exit(1);
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: true,
    children: false
  }) + '\n\n');
  console.log(chalk.green('打包结束'));
});
