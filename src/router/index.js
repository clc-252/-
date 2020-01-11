// 先引入vue
import Vue from 'vue'
// 再引入vueRouter
import VueRouter from 'vue-router'
// 挂载
Vue.use(VueRouter)

// 引入路由所映射的组件
// 1.登陆
import Login from '@/views/Login.vue'
// 2.个人中心
import Personal from '@/views/Personal.vue'
// 3.编辑个人信息
import EditPersonal from '@/views/EditPersonal.vue'
// 4.浏览新闻主页
import Index from '@/views/Index.vue'
// 5.注册页面
import Register from '@/views/Register.vue'
// 6.新闻详情页
import ArticleDetail from '@/views/ArticleDetail.vue'
// 7.我的关注
import MyFollows from '@/views/MyFollows.vue'
// 8.我的收藏
import MyStars from '@/views/MyStars.vue'
// 9.精彩评论
import Comment from '@/views/Comment.vue'
// 10.栏目管理
import CateManager from '@/views/CateManager.vue'
// 搜索页面
import Search from '@/views/Search.vue'




// 创建路由对象
let router = new VueRouter({
    // 配置路由
    routes: [
        // 浏览新闻首页的路由
        {
            name:'Index',
            path:'/',
            component:Index
        },
        // 登陆的路由
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        // 个人中心页的路由
        {
            name: 'Personal',
            path: '/personal/:id',
            component: Personal
        },
        // 编辑个人信息的路由
        {
            name:'EditPersonal',
            path:'/editPersonal/:id',
            component:EditPersonal
        },
        // 注册页面的路由
        {
            name:'Register',
            path:'/register',
            component:Register
        },
        // 新闻详情页的路由
        {
            name:'ArticleDetail',
            path:'/articleDetail/:id',
            component:ArticleDetail
        },
        // 我的关注的路由
        {
            name:'MyFollows',
            path:'/myFollows',
            component:MyFollows
        },
        // 我的收藏的路由
        {
            name:'MyStars',
            path:'/myStars',
            component:MyStars
        },
        // 精彩评论路由
        {
            name:'Comment',
            path:'/comment/:id',
            component:Comment
        },
        // 栏目管理的路由
        {
            name:'CateManager',
            path:'/cateManager',
            component:CateManager
        },
        // 搜索页面的路由
        {
            name:'Search',
            path:'/Search',
            component:Search
        }
    ]
})

// 添加导航守卫：前置守卫 - 在路由跳转之前调用，所有路由跳转都要经过这个守卫
// to：目标路由
// from：源路由
// next：下一步操作，也就是当前用户需要进行的操作
router.beforeEach((to, from, next) => {
    // 如果你要访问的是个人中心页，才需要进行验证
    if (to.path.indexOf('/personal') === 0) {
        // 先将本地存储中的token值获取出来
        let token = localStorage.getItem('userLogin_token')
        // 当用户要访问个人中心页时，需要进行验证
        if (token) {
            // 如果有token值，说明已经登陆过了，这是就可以进行下一步的操作——跳转到个人中心页
            next()
        } else {
            // 如果没有token，说明没有登陆过，这时需要重定向路由到登录页进行登陆
            next({
                name: 'Login'
            })
            // next()
        }
    }else{
        // 如果访问的是不需要验证的页面，如浏览新闻，则不需要进行验证，可以进行下一步操作
        next()
    }

})

// 暴露路由
export default router