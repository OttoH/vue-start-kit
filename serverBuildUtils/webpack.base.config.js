const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

// const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'

const setPath = function(folderName) {
  return path.join(__dirname, folderName)
}

const setPublicPath = () => {
  switch (NODE_ENV) {
    case 'production':
      return '/dist/'

    case 'development':
    default:
      return '/dist/'
  }
}

const config = {
  output: {
    path: setPath('../dist'), //this one sets the path to serve
    publicPath: setPublicPath(),
    filename: '[name].[chunkhash].js'
  },

  optimization:{
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },

  resolveLoader: {
    modules: [setPath('../node_modules')]
  },

  mode: isProd ? 'production' : 'development',

  devtool: isProd
    ? false
    : '#cheap-module-source-map',

  devServer: {
    historyApiFallback: true,
    noInfo: false
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/style.[hash].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || 'development'),
        'process.env.VUE_ENV': isProd ? '"server"' : '"client"'
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
        exclude: /node_modules/,
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
          useRelativePath: true
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  }
}

module.exports = config
