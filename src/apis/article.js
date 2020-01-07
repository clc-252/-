// 引入已经封装好的axios
import axios from '@/utils/myaxios.js'

// 封装一个实现获取栏目新闻数据的方法
export const getPostList=(params)=>{
    return axios({
        url:'/post',
        params
    }) 
}