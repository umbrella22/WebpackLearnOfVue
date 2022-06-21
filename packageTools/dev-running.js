const chalk = require('chalk')
const webpack = require('webpack')
const Portfinder = require("portfinder")
const WebpackDevServer = require('webpack-dev-server')
const { createServer } = require('vite')
const { join } = require('path')
const { prompt } = require('inquirer')

const { getConfig } = require('./utils')

const config = require('../config')
const webpackConfig = require('./webpack.dev')
const viteConifg = require("./vite.config")

const HOST = getConfig.HOST
const PORT = getConfig.PORT && Number(getConfig.PORT)
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
    proxy: {
        [getConfig.API_PREFIX]: {
            target: getConfig.API_HOST,
            changeOrigin: true,
        }
    },
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
        proxy: {
            [getConfig.API_PREFIX]: {
                target: getConfig.API_HOST,
                changeOrigin: true,
            }
        },
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
                webpackConfig.plugins.push(new webpack.DefinePlugin({
                    'process.env': JSON.stringify(getConfig),
                }))
                DevServerConfig.port = port
                const compiler = webpack(webpackConfig)
                const wepackServer = new WebpackDevServer(DevServerConfig, compiler)
                wepackServer.start()
                compiler.hooks.done.tap('done', () => {
                    console.log(chalk.green('启动成功，请访问：'))
                    console.log(chalk.green(`http://127.0.0.1:${DevServerConfig.port}`))
                })
                break;
            case 'vite':
                const viteAllConfig = Object.assign({}, viteConifg, viteDevConfig, {
                    define: {
                        'process.env': JSON.stringify(getConfig),
                        'process.tools': JSON.stringify({ mode: 'vite' })
                    }
                })
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
        console.log('PortError:', error)
        process.exit(1)
    }
}

statr()