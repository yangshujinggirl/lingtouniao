/* eslint import/no-extraneous-dependencies: 0 */
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.base.js');
const ip = require('ip');

const port = 3002;

module.exports = () => webpackMerge(commonConfig(), {
  devtool: 'cheap-module-source-map',
  devServer: {
    port,
    host: ip.address(),
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '',
    proxy: {
      // '/': {
      //   changeOrigin: true,
      //   // target: 'https://www.lingtouniao.com',
      //   target: 'http://192.168.18.196:8081'
      //   // pathRewrite: { '^/v3': '' }
      // },
      // '/native': {
      //   changeOrigin: true,
      //   // target: 'https://www.lingtouniao.com'
      //   target: 'http://192.168.18.194:8080'
      //   // pathRewrite: { '^/v3': '' }
      // }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'corelib',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ]
});
