/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base.js')

const DIR_DOCS = path.resolve(__dirname, 'docs')
const DIR_PUBLIC = path.resolve(__dirname, 'public')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',

  output: {
    clean: true,
    path: DIR_DOCS,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/logo_32.png',
      template: './src/index_docs.html',
      title: 'AP MATH & MUSIK',
      publicPath: '/ap-mathemusik'
    }),
    new CopyPlugin({
      patterns: [{
        from: DIR_PUBLIC,
        to: '.',
      }],
    }),
    new webpack.EnvironmentPlugin({
      AP_MATHEMUSIK_PUBLIC: '/ap-mathemusik',
      AP_MATHEMUSIK_ENVIRONMENT: 'github',
    }),
  ]
})
