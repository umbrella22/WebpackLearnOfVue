import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'


const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')