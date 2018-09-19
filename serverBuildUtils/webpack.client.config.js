const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },

  resolve: {
    alias: {
      'createApi': './create-api-client'
    }
  },

  plugins: [
    new VueSSRClientPlugin()
  ]
})

module.exports = config
