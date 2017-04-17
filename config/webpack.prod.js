const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const appConfig = require('./app.js');

const extractToolbox = new ExtractTextPlugin('css/toolbox.css');
const extractApp = new ExtractTextPlugin('css/app.css');

module.exports = {
  entry: [
    path.join(__dirname, '../src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/public/',
    filename: 'script.js',
  },
  plugins: [
    extractApp,
    extractToolbox,
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'react', 'stage-0'] },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../node_modules/react-toolbox/lib'),
        use: extractToolbox.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: "[name]--[local]--[hash:base64:8]"
              }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/flexboxgrid/')],
        exclude: path.resolve(__dirname, '../node_modules/react-toolbox/lib'),
        use: extractApp.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            }
          ]
        }),
      }
    ],
  },
  devtool: 'cheap-module-source-map',
};
