const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

const PATH_BUILD = path.resolve(__dirname, 'build');
const mode = 'production';

const merged = merge(common, {
  mode,
  output: {
    filename: './[name].js',
    clean: true,
    path: PATH_BUILD,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SC_ATTR: JSON.stringify('app-shell-styles'),
      },
    }),
  ],
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
});

module.exports = merged;
