var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config');

const PORT = process.env.PORT || 8080;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(PORT, function(err, result) {
    if (err) console.log(err);
    console.log('Listening at port '+ PORT);
});
