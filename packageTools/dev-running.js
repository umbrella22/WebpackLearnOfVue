const chalk = require('chalk')
const path = require('path')
const webpack = require('webpack')
const Portfinder = require("portfinder")
const WebpackDevServer = require('webpack-dev-server')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { createServer } = require('vite')


const utils = require('./utils')
const config = require('../config')
const webpackConfig = require('./webpack.dev')
const viteConifg = require("./vite.config")


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const DevServerConfig = {
    // 当使用history出现404时则自动调回index页
    historyApiFallback: true,
    // 启用gzip
    compress: false,
    // 设置webpack热加载地址
    host: HOST || config.dev.host,
    // 设置dev-server监听的端口
    port: config.dev.port,
    // 设置是否自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 从config文件中读取端口代理设置
    proxy: config.dev.proxyTable,
}
const viteDevConfig = {
    server: {
        // 设置webpack热加载地址
        host: HOST || config.dev.host,
        // 设置是否自动打开浏览器
        open: config.dev.autoOpenBrowser,
        // 从config文件中读取端口代理设置
        proxy: config.dev.proxyTable,
    }

}

function statr() {
    Portfinder.basePort = config.dev.port || PORT
    Portfinder.getPort(async (err, port) => {
        if (err) {
            console.log(chalk.red('  启动失败，端口占用\n'))
            console.log('PortError:', err)
            process.exit(1)
        } else {
            if (config.dev.useVite) {
                const viteAllConfig = Object.assign(viteConifg, viteDevConfig)
                viteAllConfig.server.port = port
                const server = await createServer(viteAllConfig)
                server.listen(port)
            } else {
                webpackConfig.plugins.push(new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {},
                    onErrors: config.dev.notifyOnErrors
                        ? utils.createNotifierCallback()
                        : undefined
                }))
                DevServerConfig.port = port
                // WebpackDevServer.addDevServerEntrypoints(webpackConfig, DevServerConfig);
                const compiler = webpack(webpackConfig)
                const server = new WebpackDevServer(DevServerConfig, compiler)
                server.start()
            }

        }
    })
}

statr()