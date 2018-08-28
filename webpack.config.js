const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'zeus.bundle.js'
  }
}
