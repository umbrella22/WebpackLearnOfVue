import Vue from 'vue'
import VueRouter from 'vue-router'
import hw from '@/views/Helloworld'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/',
        name: 'hw',
        component: hw
    }]
})