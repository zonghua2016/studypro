module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: './dist/[name].[hash:8].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          
        },
        exclude: '/node_modules/'
      },

    ]
  }
}