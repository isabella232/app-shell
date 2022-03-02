const webpack = require('webpack');
const fs = require('fs');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

const mode = 'development';

const merged = merge(common, {
  mode,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    disableHostCheck: true,
    https: {
      key: fs.readFileSync(
        '../../../reverseproxy/certs/local.buffer.com-wildcard.key'
      ),
      cert: fs.readFileSync(
        '../../../reverseproxy/certs/local.buffer.com-wildcard.crt'
      ),
    },
    host: '0.0.0.0',
    port: '8085',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});

module.exports = merged;
