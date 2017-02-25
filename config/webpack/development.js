var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var appConfig = require('../app.js');

module.exports = {
  entry:[
    path.join(__dirname, "../..","src/index.js"),
    ['webpack-dev-server/client?',appConfig.protocol,"://",appConfig.host,":",appConfig.port].join(""),
    "webpack/hot/only-dev-server"
  ],
  output: {
    path : path.join(__dirname,"../../","public"),
    publicPath : "/public/",
    filename: "script.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include : path.join(__dirname, "../..","src")
    }
    ]
  }
};
