const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require("./package.json").dependencies;
module.exports= (options)=> {
  const dotenv = require('dotenv').config({
    path: path.join(__dirname, options.env),
  }).parsed;
  return {
  target: 'web',
  entry:{
    main:path.resolve(__dirname,'./src/index.js'),
  },
  output:{
    path:path.resolve(__dirname,'./dist'),
    filename:'[name].[contenthash].bundle.js'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8000,
    /*static: {
      directory: path.join(__dirname, 'dist'),
    },*/
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'containerApplication',
      remotes: {
        // RCL: "RCL@" + dotenv.RCL_APP,
        ApplicationA:'ApplicationA@'+dotenv.APPLICATION_A_URL,
        ApplicationB:'ApplicationB@'+dotenv.APPLICATION_B_URL,
      },
      shared: {
        ...deps,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ]
  },
}
}
