var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractToolbox = new ExtractTextPlugin('css/toolbox.css');
const extractApp = new ExtractTextPlugin('css/app.css');

module.exports = {
  entry: path.resolve(__dirname, '../../server'),
  output: {
    path: path.resolve(__dirname, '../../server'),
    filename: 'server.bundle.js'
  },
  plugins: [
    extractApp,
    extractToolbox,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__SERVER__': JSON.stringify(true)
    })
  ],
  target: 'node',
  externals: fs.readdirSync(path.resolve(__dirname, '../../node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    alias: {
      config: path.join(__dirname, '../../client/config/app.dev.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'react', 'stage-0'] },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../../node_modules/react-toolbox/lib'),
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
        include: [path.resolve(__dirname, '../../client'), path.resolve(__dirname, '../node_modules/flexboxgrid/')],
        exclude: path.resolve(__dirname, '../../node_modules/react-toolbox/lib'),
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
    ]
  }
}
