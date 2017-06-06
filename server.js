const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

function webpackInit() {
  const config = require('./webpack.config');
  const PORT = process.env.UI_PORT;
  const HOSTNAME = process.env.UI_HOSTNAME;

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(PORT, HOSTNAME, (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log(`Listening at ${HOSTNAME}:${PORT}`);
  });
}

export default webpackInit;
