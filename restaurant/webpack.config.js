const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};