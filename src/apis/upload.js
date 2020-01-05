// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 封装一个实现文件上传的方法
export const uploadFile=(data)=>{
    return axios({
        method:'post',
        url:'/upload',
        data
    })
}