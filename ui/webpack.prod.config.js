const path = require('path');
const config = require('./webpack.config');

module.exports = {
  ...config,
  entry: path.resolve(__dirname, 'src', 'customElement.js'),
  output: { ...config.output, libraryTarget: 'amd' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }, { loader: 'eslint-loader' }],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['to-string-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
