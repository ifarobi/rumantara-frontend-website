var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var appConfig = require('./config/app.js');
var webpackConfig = require('./config/webpack/development.js');

var server = new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  publicPath : webpackConfig.output.publicPath,
  historyApiFallback : true
});

server.listen(appConfig.port, appConfig.host, function(err){
  if(err) console.error(err);

  console.log('Listening to %s:%s', appConfig.host, appConfig.port);
});
