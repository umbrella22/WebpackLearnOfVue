'use strict'
const path = require('path')

module.exports = {
    // 对应dev环境的快捷设置
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 使用webpack进行端口代理，一般是用于跨域
        proxyTable: {},
        // 使用什么devtools
        devtool: 'eval-source-map',
        // 这是设置的是局域网和本地都可以访问
        host: '0.0.0.0',
        // 端口号
        port: 8080,
        // 是否自动打开浏览器
        autoOpenBrowser: false,
        // 是否使用系统提示弹出错误简略信息
        notifyOnErrors: true,
        cssSourceMap: true,
        openDevTools: true,
        // 是否使用vite代替webpack
        useVite: false
    },
    //  对应build环境的快捷设置
    build: {
        // 模板index
        index: path.resolve(__dirname, '../dist/index.html'),
        // 是否允许被devTools插件调试
        openDevTools: false,

        // 此处决定打包的文件夹
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        // 针对vue，如果你想通过双击index打开你的页面的话
        // 你就需要更改为'./'即可
        assetsPublicPath: './',

        /**
         * 打包时是否启用map
         */

        productionSourceMap: false,

        // 此处配置是是否启动webpack打包检测你可以通过使用以下命令进行启动
        // `npm run build --report`
        // 或者你也可以直接设置true或者false来直接进行控制
        bundleAnalyzerReport: process.env.npm_config_report,
        // 此处配置可使用插件自动配置需要cdn加速的模块
        // 你可能需要执行 npm i webpack-cdn-plugin -D 命令来安装这个依赖
        // 因为本包中可能会不带这项依赖，毕竟不是每个人都需要
        cdn: false,
        // 需要说明的是，这个里，用于配置需要被webpack忽略的依赖包名
        // 为了能够看出差距，我这里就加入了elementui和echarts两个很大的依赖包能够看出非常大的差距
        NeedCdnModuleName: {},
        // 这里则是被webpack忽略之后，加载cdn
        NeedCdnModuleAddress: [],
        // 此处配置是是否使用gzip功能对代码进行高强度的压缩(值得注意的是gzip功能需要nginx做出对应的配置,谨慎开启)
        // 你可能需要执行 npm i compression-webpack-plugin -D 命令来安装这个依赖
        // 因为本包中可能会不带这项依赖，毕竟不是每个人都需要
        gzip: false,
        // 这里设置需要被压缩的文件后缀默认是只压缩css和js
        productionGzipExtensions: ['js', 'css'],
        // 是否启用自动上传到服务器
        AutoUpload: false,
        // 插件配置信息
        UploadServer: {
            ip: '',
            user: '',
            password: '',
            src: path.resolve(__dirname, '../dist'),
            dist: '/home/dist/'
        }
    }
}
