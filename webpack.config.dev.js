const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const NODE_ENV = process.env.NODE_ENV

const setPath = function(folderName) {
  return path.join(__dirname, folderName)
}

const setPublicPath = () => {
  switch (NODE_ENV) {
    case 'production':
      return ''

    case 'development':
    default:
      return '/'
  }
}

const extractHTML = new HtmlWebpackPlugin({
  title: 'qpet vue',
  filename: 'index.html',
  inject: true,
  template: setPath('/public/index.html'),
  BASE_URL: '/',
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true
  },
  environment: process.env.NODE_ENV,
  isLocalBuild: true,
  imgPath: 'src/assets'
})


const config = {
   entry: {
     build: path.join(setPath('src'), 'main.ts')
   },

  output: {
    path: path.resolve(__dirname), //this one sets the path to serve
    publicPath: setPublicPath(),
    filename: '[name].js'
  },

  optimization:{
    runtimeChunk: false,
    splitChunks: {
      chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    }
  },

  resolveLoader: {
    modules: [setPath('node_modules')]
  },

  mode: 'development',

  devtool: 'cheap-source-map',

  devServer: {
    historyApiFallback: true,
    noInfo: false
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    extractHTML,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/style.[hash].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],

  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts?$/,
        use: [
          'babel-loader',
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'vue-style-loader', // creates style nodes from vue
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
          useRelativePath: true
        }
      }
    ]
  },
}

module.exports = config
