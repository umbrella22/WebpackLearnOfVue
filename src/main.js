import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// 当切仅当开发模式时，引入css，不然webpack还是会将element的字体和css打包进来，比较致命
// 当然这里也要判断一下是否开启了cdn，如果没有开启cdn却也忽略了css的引入，那就更致命了
(process.env.NODE_ENV === 'production' && !require('../config/index').build.cdn) ?
    require('element-ui/lib/theme-chalk/index.css') :
    require('element-ui/lib/theme-chalk/index.css')

Vue.use(ElementUI);






new Vue({
    el: '#app',
    router,
    render: h => h(App)
})