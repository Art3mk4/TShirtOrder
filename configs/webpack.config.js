const baseConfig = require('ufs-ui-configs/webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = baseConfig;

config.entry = path.resolve(__dirname, '../src/index.tsx');
config.externals = {};
config.output.libraryTarget = 'umd';
config.plugins.push(
    new CopyWebpackPlugin([{from: path.resolve(__dirname, '../node_modules/ufs-ui/dist/'), to: 'ufs-ui'}]),
    new HtmlWebpackPlugin(
        {
            template: path.resolve(__dirname, '../static/index.html')
        }
    )
);

config.output.publicPath = './';
config.devServer.publicPath = '/';

module.exports = config;