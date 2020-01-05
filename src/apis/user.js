// 引入封装好的axios
import axios from '@/utils/myaxios.js'

// 封装一个实现登陆的方法
export const login=(data)=>{
    // 返回一个promise对象
    return axios({
        method:'post',
        url:'/login',
        data
    })
}

// 封装一个根据用户id获取用户数据的方法
export const getUserById=(id)=>{
    return axios({
        url:`/user/${id}`,
        // 设置一个请求头，用于验证用户是否登陆 - headers:{后台规定的key:token}
        headers:{'Authorization':localStorage.getItem('userLogin_token')}
    })
}