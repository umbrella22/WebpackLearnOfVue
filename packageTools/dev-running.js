const chalk = require('chalk')
const webpack = require('webpack')
const Portfinder = require("portfinder")
const WebpackDevServer = require('webpack-dev-server')
const { createServer } = require('vite')
const { join } = require('path')
const { prompt } = require('inquirer')


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
    static: {
        directory: join(__dirname, '..', 'static'),
        publicPath: '/static/',
    }
}
const viteDevConfig = {
    server: {
        // 设置vite服务地址
        host: HOST || config.dev.host,
        // 设置是否自动打开浏览器
        open: config.dev.autoOpenBrowser,
        // 从config文件中读取端口代理设置
        proxy: config.dev.proxyTable,
    }

}

async function statr() {
    try {
        Portfinder.basePort = config.dev.port || PORT
        const port = await Portfinder.getPortPromise()
        const Answers = await prompt([{
            type: 'list',
            message: '请选择编译引擎：',
            name: 'compiler',
            default: 'webpack',
            choices: ['webpack', 'vite']
        }])
        switch (Answers.compiler) {
            case 'webpack':
                DevServerConfig.port = port
                const compiler = webpack(webpackConfig)
                const wepackServer = new WebpackDevServer(DevServerConfig, compiler)
                wepackServer.start()
                break;
            case 'vite':
                const viteAllConfig = Object.assign({}, viteConifg, viteDevConfig)
                viteAllConfig.server.port = port
                const viteServer = await createServer(viteAllConfig)
                await viteServer.listen(port)
                viteServer.config.logger.info(
                    chalk.cyan(`\n  vite v${require('vite/package.json').version}`) +
                    chalk.green(` dev server running at:\n`),
                    {
                        clear: !viteServer.config.logger.hasWarned,
                    }
                )
                viteServer.printUrls()
                break;
            default:
                break;
        }

    } catch (error) {
        console.log(chalk.red('  启动失败，端口占用\n'))
        console.log('PortError:', err)
        process.exit(1)
    }
}

statr()