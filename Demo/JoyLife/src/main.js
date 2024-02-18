import { createApp } from 'vue'
import App from './App.vue'
import router from './router'//全局引入路由
import './assets/iconfont.scss'//全局引入图标文件

createApp(App).use(router).mount('#app')
