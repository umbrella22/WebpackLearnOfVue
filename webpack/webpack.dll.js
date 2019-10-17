const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackbar = require('webpackbar')
module.exports = {
    mode: 'development',
    entry: {
        vendor: ['element-ui', 'vue', 'echarts']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dist'),
        library: '_dll_[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),//clean dist
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, '../dist', '[name].manifest.json'),
        }),
        new webpackbar({
            name: "抽取依赖中",
        })
    ],
};