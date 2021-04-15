const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const config = require("../config")
const utils = require('./utils')
const dev = require('../config/dev.env')

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    output: {
        filename: '[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(dev),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.development.html',
            chunksSortMode: 'none',
            inject: 'body',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: config.dev.devtool
});
