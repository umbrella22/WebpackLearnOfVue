import { createRouter, createWebHistory } from 'vue-router'
import hw from '@/views/Helloworld.vue'

const routes = [
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