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
      <van-tabs v-model="active" swipeable sticky>
        <!-- 动态渲染数据 -->
        <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
          <!-- 新闻列表：生成当前栏目的文章列表数据 -->
          <hmarticleblock v-for="item in cate.postList" :key="item.id" :post="item"></hmarticleblock>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 引入获取栏目列表的方法
import { getCategoryList } from "@/apis/category.js";
// 引入获得当前栏目新闻数据的方法
import { getPostList } from "@/apis/article.js";
// 引入封装的新闻模块
import hmarticleblock from "@/components/hmarticleBlock.vue";
export default {
  data() {
    return {
      id: "",
      // 如果用户登录了，栏目数据中会返回'关注'这一栏目，为了让默认绑定的标签为'热点'，需要判断用户是否登陆
      active: localStorage.getItem("userLogin_token") ? 1 : 0,
      cateList: []
    };
  },
  // 页面一加载就需要获取到所有栏目的数据
  async mounted() {
    // 获取用户id，用户跳转到个人中心页
    this.id = JSON.parse(localStorage.getItem("userData")).id;
    // 获取所有栏目数据
    let res = await getCategoryList();
    console.log(res);
    // 将栏目数据存到cateList中
    this.cateList = res.data.data;
    // console.log(this.cateList);

    // ------------------------------- 重点理解内容：对数据进行改造 ------------------------------------
    // 基于业务需求，我们可以对源数据进行改造，我们可以在每一个栏目对象中，添加用于存储这个栏目新闻数据的数组
    // map()方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值
    this.cateList = this.cateList.map(value => {
      return {
        ...value, // ...展开运算符，展开这个对象
        postList: [], // 当前这个栏目的新闻数据列表
        pageIndex: 1, // 这个栏目的当前页码
        pageSize: 10 // 这个栏目每页所显示的新闻条数
      };
    });
    // console.log(this.cateList[this.active]);  // 当前默认的栏目:this.cateList[this.active]

    // 对数据进行渲染，调用handleData方法
    this.handleData()
  },
  components: {
    hmarticleblock
  },
  // 监听当前栏目active的变化
  watch:{
    active(){
      // console.log(this.active);
      // 判断当前栏目是否已经加载过，如果以及加载过了就不要再发送请求
      if(this.cateList[this.active].postList.length===0){
        this.handleData();
      }
    }
  },
  // 将获取到当前栏目新闻数据之后的操作封装成一个方法
  methods:{
    async handleData(){
    let res2 = await getPostList({
      pageIndex: this.cateList[this.active].pageIndex,
      pageSize: this.cateList[this.active].pageSize,
      category: this.cateList[this.active].id
    });
    // console.log(res2);
    // 得到当前栏目数据之后，再渲染到页面
    this.cateList[this.active].postList = res2.data.data;
    console.log(this.cateList[this.active]);
    }
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