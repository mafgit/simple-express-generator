const path = require('path')
const { BannerPlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
  watch: true,
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
}
