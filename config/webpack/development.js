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
    path : path.resolve(__dirname,"../../","public"),
    publicPath : "/public/",
    filename: "script.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../..","src"),
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader',
            options: {presets: ["es2015", "react", "stage-0"]}
          }
        ]
      }
    ]
  }
};
