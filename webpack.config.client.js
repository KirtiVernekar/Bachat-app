const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: "browser",
    mode: "development",
    devtool: 'inline-source-map',
    entry: [
        path.join(CURRENT_WORKING_DIR, 'client/src/index.js')
    ],
    output: {      //output path for the bundled code
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        publicPath: '/dist/',          //base path for all assets in the application
        filename: 'bundle.js',         //The client-side code of the app will be loaded in the browser from the bundled code in bundle.js
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
            use: 'file-loader'
        }
        ]
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
        'react-dom': '@hot-loader/react-dom'
        }
    },
    target: "node",
 };

module.exports = config;
