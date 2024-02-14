const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/source.ts',
  output: {
    path: path.resolve(__dirname, 'transformed'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
