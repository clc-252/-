// 引入axios
import axios from 'axios'

// 设置基准路径baseURL
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 添加请求拦截器：在发出请求之前拦截，所有的请求都会经过这个拦截器
// 请求拦截器只是对发送请求的报文进行处理，但是不会替你发送请求
axios.interceptors.request.use(function (config) {
    // console.log(config) //config中，可以设置请求头
    // 在发送请求之前做些什么
    // 1.获取token
    let token=localStorage.getItem('userLogin_token')
    // 2.判断是否有token，如果有，就将token设置在请求头中一起发送请求
    if(token){
        config.headers.Authorization =token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器：在接收响应前拦截，对响应的内容进行处理
axios.interceptors.response.use(function (response) {
    // console.log(response) //response中有登陆用户的数据
    // 对响应数据做点什么
    if(response.data.message==='用户信息验证失败'){
        // 跳转到登陆页面进行登陆
        window.location.href='#/login'
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 暴露
export default axios