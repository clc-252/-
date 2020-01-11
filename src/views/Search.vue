<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="userKey" placeholder="请输入搜索关键词" shape="round"></van-search>
      <div @click="onSearch(userKey)">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <!-- <router-link to='' v-for="(item,index) in historyList" :key="index" @click="onSearch">{{item}}</router-link> -->
      <a href="javascript:;" v-for="(item,index) in historyList" :key="index" @click="onSearch(item)">{{item}}</a>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        :to="{path:`/articleDetail/${item.id}`}"
        v-for="item in searchList"
        :key="item.id"
      >{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
// 引入搜索文章的方法
import { searchArticle } from "@/apis/article.js";
export default {
  data() {
    return {
      userKey: "",
      searchList: [],
      historyList:[]
    };
  },
  mounted(){
      this.historyList=this.getData()
  },
  methods: {
    async onSearch(key) {
      let res = await searchArticle({ keyword: key});
      // console.log(res);
      if (res.data.data.length > 0) {
        this.searchList = res.data.data;
      }
    //   将关键字存储到本地
    let arr=this.getData()
    // 判断当前数组中是否已经存在该关键字
    let index=arr.indexOf(key)
    if(index!==-1){
        arr.splice(index,1)
    }
    arr.unshift(key)
    localStorage.setItem('search_history_userkey',JSON.stringify(arr))
    },
    // 获取之前存储的历史关键字
    getData(){
        return JSON.parse(localStorage.getItem('search_history_userkey')||'[]')
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>