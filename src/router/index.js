// 先引入vue
import Vue from 'vue'
// 再引入vueRouter
import VueRouter from 'vue-router'
// 挂载
Vue.use(VueRouter)

// 引入路由所映射的组件
import Login from '@/views/Login.vue'

// 创建路由对象
let router =new VueRouter({
    // 配置路由
    routes:[
        {
            name:'Login',
            path:'/login',
            component:Login
        }
    ]
})

// 暴露路由
export default router