const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractToolbox = new ExtractTextPlugin('css/toolbox.css');
const extractApp = new ExtractTextPlugin('css/app.css');

module.exports = {
  entry: [
    path.join(__dirname, '../client/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/public/',
    filename: 'script.bundle.js',
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
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__SERVER__': JSON.stringify(true)
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
  ],
  resolve: {
    alias: {
      config: path.join(__dirname, '../client/config/app.dev.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../client'), path.resolve(__dirname, '../common')],
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
        include: path.resolve(__dirname, '../client'),
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
