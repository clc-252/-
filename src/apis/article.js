// 引入已经封装好的axios
import axios from '@/utils/myaxios.js'

// 1.封装一个实现获取栏目新闻数据的方法
export const getPostList=(params)=>{
    return axios({
        url:'/post',
        params
    }) 
}

// 2.封装一个实现根据新闻id获取新闻详情的方法
export const getArticleById=(id)=>{
    return axios({
        url:`/post/${id}`
    })
}