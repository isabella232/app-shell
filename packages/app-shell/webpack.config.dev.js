const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

const mode = 'development';

const merged = merge(common, {
  mode,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    disableHostCheck: true,
    https: true,
    host: '0.0.0.0',
    port: '8085',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = merged;
