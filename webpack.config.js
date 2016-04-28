const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
  entry: {
    bundle: getEntrySources([
      './src/index.js'
    ])
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader'
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'react-hot!babel!eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader!cssnext-loader'
    }, {
      test: /\.scss$/,
      loader: 'style!css?sourceMap!sass?sourceMap'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'url-loader?prefix=img/&limit=53248'
    }, {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'url-loader?prefix=font/&limit=53248'
    }]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})]
};
