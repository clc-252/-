import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/reset.css'
Vue.config.productionTip = false

// 在这个文件中引入路由模块
import router from '@/router/index.js'

new Vue({
  // 注入
  router,
  render: h => h(App),
}).$mount('#app')
