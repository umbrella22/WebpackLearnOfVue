'use strict'
const path = require('path');
const utils = require('./utils')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const webpackbar = require('webpackbar');
const webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.ts'
    },
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].bundle.js'),
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    babelParserPlugins: [
                        'jsx',
                        'classProperties',
                        'decorators-legacy'
                    ]
                }
            }]
        },
        {
            test: /\.ts$/,
            use: [{
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                }
            }]
        },
        {
            test: /\.js$/,
            use: [{
                loader: 'esbuild-loader',
                options: {
                    loader: 'js',
                }
            }]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/,
            type: "asset/resource",
            generator: {
                filename: 'imgs/[name]--[hash].[ext]'
            }
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            type: "asset/resource",
            generator: {
                filename: 'media/[name]--[hash].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: "asset/resource",
            generator: {
                filename: 'fonts/[name]--[hash].[ext]'
            }
        }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpackbar({
            name: "示例",
        }),
        new webpack.DefinePlugin({
            '__VUE_OPTIONS_API__': true,
            '__VUE_PROD_DEVTOOLS__': process.env.NODE_ENV === 'production'
                ? config.build.openDevTools
                : config.dev.openDevTools
        })
    ],
};