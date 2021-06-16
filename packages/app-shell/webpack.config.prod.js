const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

const mode = 'development';

const merged = merge(common, {
  mode,
  plugins: [
    new webpack.DefinePlugin({
      GRAPHQL_API: JSON.stringify('https://graph.buffer.com'),
    }),
  ],
});

module.exports = merged;
