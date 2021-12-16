const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CURRENT_WORKING_DIR = process.cwd()

const config = {
  mode: "production",
  entry: [
    path.join(CURRENT_WORKING_DIR, 'client/src/index.js')
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR , '/dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
            "style-loader", 
            {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true
                }
            }
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader, 
            "css-loader"
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  target: "node",
 };

module.exports = config