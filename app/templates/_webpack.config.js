var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
  // new ExtractTextPlugin('bundle.css', { allChunks: true }),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  })
]

module.exports = {
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['', '.js']
  },
  entry: [ './src/index' ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'ZooidUISpinner'
  },
  externals: {
   react: {
     root: 'React',
     commonjs2: 'react',
     commonjs: 'react',
     amd: 'react'
   }
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
        exclude: /node_modules/
      }
    ]
  }
};
