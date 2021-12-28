const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    
    name: "browser",
    mode: "development",
    devtool: 'inline-source-map',
    target: "web",
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
            exclude:/node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ],
        },
        {
            test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
            use: 'file-loader'
        }
        ]
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    resolve: {
        alias: {
        'react-dom': '@hot-loader/react-dom'
        }
    },
 };

module.exports = config;
