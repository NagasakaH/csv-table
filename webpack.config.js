const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/csvTable.ts',
  output: {
    filename: 'csvTable.js',
    path: path.resolve(__dirname, 'webpack'),
    library: 'csvTable',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  module: {
    rules: [
      {test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/},
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
};
