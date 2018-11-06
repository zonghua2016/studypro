var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var purifyCSS = require('purifycss-webpack');
var glob = require('glob-all')
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(css|less)$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: {
          loader: 'style-loader',
          // loader: 'style-loader/url'
          // loader: 'style-loader/useable',
          options: {
            // insertInto: '#box',
            singleton: true,
            transform: './css.transform.js'
          }
        },
        use: [{
            loader: 'css-loader',
            // loader: 'file-loader',
            options: {
              minimize: true,
              modules: true,
              localIdentName: '[path][name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // require('autoprefixer')(),
                require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      })
    }]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
      allChunks: false
    }),
    new purifyCSS({
      paths: glob.sync([
        path.join(__dirname, './index.html'),
        path.join(__dirname, './src/*.js')
      ])
    })
  ]
}