const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
// const HtmlWebpackPlugin = require("html-webpack-plugin"); //loads our HTML files n injects the bundle(s) in the same file
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const nodeExternals = require('webpack-node-externals');

const config = {
    name: "server",
    target: "node",
    entry: [ path.join(CURRENT_WORKING_DIR , './server/server.js') ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            // {
            //     test: /\.css$/i,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //     ],
            // },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, "src", "index.html")
        //   },
        // new MiniCssExtractPlugin({
        //     filename: '[name].css'
        // }),
    ],
 };

module.exports = config;