'use strict'
const os = require("os")
const path = require('path');
const utils = require('./utils')
const config = require('../config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpackbar = require('webpackbar')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require("happypack")
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
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
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
                options: {
                    cacheDirectory: 'node_modules/.cache/vue-loader',
                    cacheIdentifier: '7270960a'
                }
            }
        },
        {
            test: /\.js$/,
            use: 'happypack/loader?id=HappyRendererBabel',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 8192,
                    name: utils.assetsPath('image/[name]-[hash:8].[ext]')
                }
            }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 8192,
                    name: utils.assetsPath('fonts/[name]-[hash:8].[ext]')
                }
            }]
        }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpackbar({
            name: "示例",
        }),
        new HardSourceWebpackPlugin(),
        new HappyPack({
            id: 'HappyRendererBabel',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }],
            threadPool: HappyThreadPool
        }),
    ],
};