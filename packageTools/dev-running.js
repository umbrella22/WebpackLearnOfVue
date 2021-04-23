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
    clientLogLevel: 'warning',
    // 当使用history出现404时则自动调回index页
    historyApiFallback: true,
    contentBase: path.join(__dirname, "../dist"),
    // 热加载模式
    hot: true,
    // 启用gzip
    compress: false,
    // 设置webpack热加载地址
    host: HOST || config.dev.host,
    // 设置是否自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 当编译器出现错误时，在全屏覆盖显示错误位置
    overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
    // 从config文件中读取端口代理设置
    proxy: config.dev.proxyTable,
    // 启用简洁报错
    quiet: true,
    // 启用监听文件变化
    watchOptions: {
        poll: config.dev.poll,
    }
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
                    compilationSuccessInfo: {
                        messages: [`您的项目已成功启动`],
                        notes: [`本机访问请在vscode的终端中按住左ctrl键点击: http://127.0.0.1:${port} \n `, `局域网访问地址: http://${utils.getNetworkIp()}:${port}`],
                    },
                    onErrors: config.dev.notifyOnErrors
                        ? utils.createNotifierCallback()
                        : undefined
                }))
                WebpackDevServer.addDevServerEntrypoints(webpackConfig, DevServerConfig);
                const compiler = webpack(webpackConfig)
                const server = new WebpackDevServer(compiler, DevServerConfig)
                server.listen(port)
            }

        }
    })
}

statr()