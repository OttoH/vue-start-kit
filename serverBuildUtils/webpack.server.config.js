const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',

  entry: './src/entry-server.js',

  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    alias: {
      'createApi': './create-api-server'
    }
  },

  externals: /\.css$/,

  plugins: [
    new VueSSRServerPlugin()
  ]
})
