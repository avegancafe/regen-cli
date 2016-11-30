var path = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, "src/client/public");
var APP_DIR = path.resolve(__dirname, "src/client/app");

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    APP_DIR + "/javascripts/index.js"
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel', 'react-hot-loader/webpack'],
      include: path.join(__dirname, 'src', 'client', 'app', 'javascripts')
    }]
  },
  resolve: {
    alias: {
      "@components": path.resolve(path.join(__dirname, 'src', 'client', 'app', 'javascripts', 'components'))
    }
  }
};
