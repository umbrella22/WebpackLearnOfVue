const { join } = require("path")
const vuePlugin = require("@vitejs/plugin-vue")
const { defineConfig } = require("vite")

function resolve(dir) {
    return join(__dirname, '..', dir)
}

const root = resolve('src')

const config = defineConfig({
    mode: process.env.NODE_ENV,
    root,
    define: {
    },

    resolve: {
        alias: {
            '@': root,
        }
    },
    base: './',
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: `import { h,Fragment } from 'vue'`
    },
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