import { createApp } from 'vue'
import App from './App.vue'
import router from './router'//全局引入路由
import './assets/scss/iconfont.scss'//全局引入图标文件
import './assets/scss/main.scss'//全局引入样式文件

//element全局引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//高德天气全局引入
import AMapLoader from '@amap/amap-jsapi-loader';

//引入store 的vuex
import messageStore from './store/messageStore'

createApp(App).use(router).use(ElementPlus).use(messageStore).mount('#app')


