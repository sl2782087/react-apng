const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/ApngComponent.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'ApngComponent.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  }
};
