'use strict'
const path = require('path')
const packageConfig = require('../package.json')
const config = require('../config')
const MiniCssPlugin = require('mini-css-extract-plugin');

// 将资源文件合并到config文件中的配置项中
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}
exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
            esModule:false
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // 这里就是生成loader和其对应的配置
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // 当配置信息中开启此项时，启用css分离压缩
        // 这一项在生产环境时，是默认开启的
        if (options.extract) {
            return [MiniCssPlugin.loader].concat(loaders)
        } else {
            // 如果不开启则让vue-style-loader来处理
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// 根据上面的函数遍历出来的各个css预处理器的loader进行最后的拼装
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}
// 当出现报错时，弹出系统弹窗告知出现错误
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {

        if (severity !== 'error') return

        const error = errors[0]
        console.log(error.name||error.webpackError)
        const filename = error.file && error.file.split('!').pop()
        // 这里是设置当出现错误时，给你的，标题，错误信息，错误文件地址，以及图标
        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name||'webpack Error',
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

// 获取本地局域网ip
exports.getNetworkIp = () => {
    const os = require('os');
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}
