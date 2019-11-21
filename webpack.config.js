const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: [ '@babel/polyfill', './src/client/index' ],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' },
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ],
    }, {
      test: /\.(png|woff|woff2|eot|ttf)$/,
      loader: 'file-loader',
    }, {
      test: /\.svg$/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: 'react-svg-loader',
          options: { jsx: true },
        },
      ],
    }],
  },
  resolve: { extensions: [ '.js', '.jsx' ] },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    proxy: { '/api': 'http://localhost:8080' },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
