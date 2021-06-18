const path = require('path')
const { BannerPlugin } = require('webpack')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
}
