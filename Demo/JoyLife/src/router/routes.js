// npm install vue-router@4
// 安装路由,通过路由实现底部导航栏对主体的切换--24.2.18
const routes = [
  {
    path: '/',
    component: () => import('../views/Home/index.vue'),//使用动态加载模式，节省首页加载性能
    name: '首页'
  },
  {
    path: '/Server',
    component: () => import('../views/Server/index.vue'),
    name: '服务'
  },
  {
    path: '/Publish',
    component: () => import('../views/Publish/index.vue'),
    name: '发布'
  },
  {
    path: '/Message',
    component: () => import('../views/Message/index.vue'),
    name: '消息'
  },
  {
    path: '/User',
    component: () => import('../views/User/index.vue'),
    name: '我的'
  }
]

export default routes