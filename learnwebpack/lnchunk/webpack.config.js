var webpack = require('webpack');
var path = require('path')
module.exports = {
  entry: {
    'pagea': './pagea',
    'pageb': './pageb',
    'vendor': ['lodash']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'vendor'],
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    })
  ]
}
