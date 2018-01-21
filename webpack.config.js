const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './app.js',
    // vendor: ['lodash']
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: 'dist',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.join(__dirname, './node_modules')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 通过 minimize 选项压缩 CSS 代码
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.transform.js'
            },
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // 压缩
                minimize: true,
                module: true,
                localIdentName: '[path][name]_[local]_[hash:base64:5]'
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-cssnext')()
                ]
              },
            }
          ]
        })
      }
    ],
  },
  plugins: [
    // 压缩css 
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: false
    })
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'common',
  //     minChunks: 2,
  //     chunks: ['app', 'app1']
  //   }),

  //   new webpack.optimize.CommonsChunkPlugin({
  //     names: ['vendor', 'manifest'],
  //     minChunks: Infinity
  //   })
  ]
}
