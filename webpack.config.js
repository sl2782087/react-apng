const path = require('path');

module.exports = {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'images/[name].[hash:8].[ext]',
        },
      },
    ],
  },
};
