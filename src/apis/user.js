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