const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
const nodeExternals = require('webpack-node-externals');

const config = {
    name: "server",
    entry: [ path.join(CURRENT_WORKING_DIR , './server/server.js') ],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",      //outputs the bundled code in server.generated.js in the dist folder
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
        {
            test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
            use: 'file-loader'
        }
        ]
    }
 };

module.exports = config;