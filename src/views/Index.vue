<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>&nbsp;
        <span>搜索新闻</span>
      </div>
      <!-- 点击右边的图标，会跳转到个人中心页 -->
      <div class="user" @click="$router.push({path: `/personal/${id}`})">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- 标签栏 -->
    <div class="nav">
      <!-- 通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
      <van-tabs v-model="active" swipeable>
        <!-- 动态渲染数据 -->
        <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">内容 1</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 引入获取栏目列表的方法
import {getCategoryList} from '@/apis/category.js'
export default {
  data() {
    return {
      id:'',
      // 如果用户登录了，栏目数据中会返回'关注'这一栏目，为了让默认绑定的标签为'热点'，需要判断用户是否登陆
      active: localStorage.getItem('userLogin_token')?1:0,
      cateList:[]
    }
  },
  // 页面一加载就需要获取到所有栏目的数据
  async mounted(){
    // 获取用户id，用户跳转到个人中心页
    this.id=JSON.parse(localStorage.getItem('userData')).id
    let res=await getCategoryList()
    console.log(res);
    // 将栏目数据存起来
    this.cateList=res.data.data
  }
};
</script>

<style lang='less' scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo {
    padding: 0 10px;
  }
  .iconnew {
    font-size: 60px;
  }
  .search {
    flex: 1;
    height: 36px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.5);
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    .icon_search {
      font-size: 18px;
    }
  }
  .user {
    font-size: 26px;
    padding: 0 10px 0 20px;
  }
}
</style>