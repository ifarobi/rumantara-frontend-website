const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const appConfig = require('./config/app.js');
const webpackConfig = require('./config/webpack.dev.js');

const server = new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
  stats: {colors: true},
});

server.listen(appConfig.port, appConfig.host, function (err) {
  if (err) console.error(err);

  console.log('Listening to %s:%s', appConfig.host, appConfig.port);
});
