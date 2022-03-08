const path = require('path');

module.exports = {
  entry: './src/exports/main.js',
  output: {
    filename: './[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components/'),
      context: path.resolve(__dirname, './src/common/context/'),
      hooks: path.resolve(__dirname, './src/common/hooks/'),
      utils: path.resolve(__dirname, './src/common/utils/'),
    },
  },
};
