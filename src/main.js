import Vue from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/reset.css'
Vue.config.productionTip = false

// 在这个文件中引入路由模块
import router from '@/router/index.js'

// 引入vant框架
import { Toast,Icon,Uploader,Dialog,Field,Picker } from 'vant'
Vue.use(Toast) // Toast 轻提示
   .use(Icon)  // Icon 图标
   .use(Uploader) // Uploader 文件上传
   .use(Dialog)  // Dialog 弹出框
   .use(Field)  // Field 输入框
   .use(Picker) // Picker 选择器

new Vue({
  // 注入
  router,
  render: h => h(App),
}).$mount('#app')
