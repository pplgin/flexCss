const path = require('path')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry:['./src/js/index.js'],
  output: {
      path: path.join(__dirname, './dist/js'),
      filename: "bundle.js",
      publicPath: '/',
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
      test: /(\.css|\.scss)$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass!postcss')
    }, {
      test: /\.js?$/,
      loaders: ['babel-loader','babel?presets[]=stage-0,presets[]=es2015'],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new ExtractTextPlugin('../css/index.css'),
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
    }, {
      reload: false
    })
  ],
  postcss: function() {
    return [require('postcss-cssnext')];
  }
}
