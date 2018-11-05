'use strict';
const path = require("path");
console.log(path.resolve(__dirname, 'dist/js'));
let conf = {
  entry : './js/main.js',
  output : {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer : {
    overlay: true,
  }
};

module.exports = conf;