import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import hw from '@/views/Helloworld.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'hw',
        component: hw
    }
]


export default createRouter({
    history: createWebHistory(),
    routes
})