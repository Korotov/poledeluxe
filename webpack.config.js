'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env, options) => {
  let isDevelopment = options.mode === 'development';
  let conf = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    output: {
      filename: "./js/bundle.js",
      path: path.resolve(__dirname, 'dist')
    },
    devtool: isDevelopment ? "eval" : false,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      overlay: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './pug/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'price.html',
        template: './pug/price.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'schedule.html',
        template: './pug/schedule.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'contact.html',
        template: './pug/contact.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'styles.html',
        template: './pug/styles.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'kids.html',
        template: './pug/kids.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'trainers.html',
        template: './pug/trainers.pug'
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/styles.css',
      })
    ],
    module: {
      rules: [
        {
          test: '/\.js$/',
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.pug$/,
          use: [{
            loader: 'html-loader',
            options: {
              root: path.resolve(__dirname, 'dist'),
            }
          },
          'pug-html-loader']
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceMapContents: false
              }
            }
          ],
        },

        {
          test: /\.woff2?$|\.ttf$|\.eot$/,
          use: [{
            loader: "file-loader",
            options: {
              name: '[path][name].[ext]'
            }

          }]
        },
        {
          test: /\.svg$|\.png$|\.jpg$/,
          use: [{
            loader: "file-loader",
            options: {
              name: '[path][name].[ext]'
            }
          }]
        }
      ]
    },
  };
  return conf;
};