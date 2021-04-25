const { join } = require("path")
const vuePlugin = require("@vitejs/plugin-vue")
const { defineConfig } = require("vite")
const dev = require('../config/dev.env')

function resolve(dir) {
    return join(__dirname, '..', dir)
}

const root = resolve('src')

const config = defineConfig({
    mode: process.env.NODE_ENV,
    root,
    define: {
        'process.env': JSON.stringify(dev),
        'process.tools': JSON.stringify({ mode: 'vite' })
    },

    resolve: {
        alias: {
            '@': root,
        }
    },
    base: './',
    build: {
        outDir: resolve('dist'),
        emptyOutDir: true
    },
    server: {
        port: Number(process.env.PORT),
    },
    plugins: [
        vuePlugin()
    ],
    optimizeDeps: {
    },
    publicDir: resolve('static'),
})


module.exports = config