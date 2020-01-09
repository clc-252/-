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

// 3.封装一个实现点赞和取消赞的方法
export const likeArticle=(id)=>{
    return axios({
        url:`/post_like/${id}`
    })
}

// 4.封装一个实现收藏和取消收藏的方法
export const starArticle=(id)=>{
    return axios({
        url:`/post_star/${id}`
    })
}