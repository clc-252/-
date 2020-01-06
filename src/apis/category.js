// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 封装一个实现获取栏目列表的方法
export const getCategoryList=()=>{
    return axios({
        url:'/category'
    })
}