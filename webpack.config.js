import path from 'path';
import webpack from 'webpack';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
const PORT = process.env.UI_PORT;
const HOSTNAME = process.env.UI_HOSTNAME;
const PROTOCOL = process.env.PROTOCOL;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${PROTOCOL}://${HOSTNAME}:${PORT}`,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new OpenBrowserPlugin({ url: `${PROTOCOL}://${HOSTNAME}:${PORT}`}),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
