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
        url:`/user/${id}`
        // 设置一个请求头，用于验证用户是否登陆 - headers:{后台规定的key:token}
        // headers:{'Authorization':localStorage.getItem('userLogin_token')}
    })
}

// 封装一个可以更新用户信息的方法
export const updataUserById=(id,data)=>{
    return axios({
        method:'post',
        url:`/user_update/${id}`,
        data
    })
}

// 封装一个实现用户注册的方法
export const usersRegister=(data)=>{
    return axios({
        method:'post',
        url:'/register',
        data
    })
}

// 封装一个实现关注用户的方法
export const followUser=(id)=>{
    return axios({
        url:`/user_follows/${id}`
    })
}

// 封装一个实现取消关注用户的方法
export const unfollowUser=(id)=>{
    return axios({
        url:`/user_unfollow/${id}`
    })
}

// 获取用户关注列表的方法
export const getUserFollows=()=>{
    return axios({
        url:'/user_follows'
    })
}

// 获取用户收藏列表的方法
export const getUserStars=()=>{
    return axios({
        url:'/user_star'
    })
}