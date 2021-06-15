const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

const mode = 'development';

const merged = merge(common, {
  mode,
  devServer: {
    contentBase: './dist',
    compress: true,
    disableHostCheck: true,
    https: true,
    host: '0.0.0.0',
    port: '8085',
  }
});

module.exports = merged;
