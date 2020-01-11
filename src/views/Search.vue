<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="userKey" placeholder="请输入搜索关键词" shape="round"></van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <router-link to>美女</router-link>
      <router-link to>美女</router-link>
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
      searchList: []
    };
  },
  methods: {
    async onSearch() {
      let res = await searchArticle({ keyword: this.userKey });
      // console.log(res);
      if (res.data.data.length > 0) {
        this.searchList = res.data.data;
      }
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