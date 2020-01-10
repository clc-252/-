<template>
  <div class="cate">
    <hmheader title="栏目管理">
      <i class="iconfont iconjiantou2" slot="left" @click="$router.back()"></i>
    </hmheader>
    <div class="removecate mycate">
      <p>点击删除以下频道</p>
      <span v-for="(item,index) in cateList" :key="item.id" @click="removeCate(index)">{{item.name}}</span>
    </div>
    <div class="addcate mycate">
      <p>点击添加以下频道</p>
      <span
        v-for="(item,index) in unaddcateList"
        :key="item.id"
        @click="addCate(index)"
      >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
// 引入封装好的头部部分
import hmheader from "@/components/hmheader.vue";
// 引入获取栏目数据的方法
import { getCateList } from "@/apis/cate.js";
export default {
  components: {
    hmheader
  },
  data() {
    return {
      // 添加栏目数据的数组
      cateList: [],
      // 未添加栏目数据的数组
      unaddcateList: []
    };
  },
  async mounted() {
    if (localStorage.getItem("remove_cate_list")) {
      this.cateList = JSON.parse(localStorage.getItem("remove_cate_list"));
    } else {
      let res = await getCateList();
      console.log(res);
      this.cateList = res.data.data;
      if (localStorage.getItem("userLogin_token")) {
        // 判断如果登陆过就不要显示'关注'和'头条'栏目
        this.cateList = this.cateList.splice(2);
      } else {
        // 没有登陆过就不要显示'头条'栏目
        this.cateList = this.cateList.splice(1);
      }
    }
    if(localStorage.getItem("add_cate_list")){
        this.unaddcateList=JSON.parse(localStorage.getItem("add_cate_list"))
    }
  },
  methods: {
    // 移除栏目
    removeCate(index) {
      // 当点击某个栏目，拿到该栏目的索引，先将这个栏目添加到unaddcateList数组中
      this.unaddcateList.push(this.cateList[index]);
      // 再将这个栏目从cateList数组中移除
      this.cateList.splice(index, 1);
      // 将数据存储到本地
      localStorage.setItem("remove_cate_list", JSON.stringify(this.cateList));
      localStorage.setItem("add_cate_list", JSON.stringify(this.unaddcateList));
    },
    //  添加栏目
    addCate(index) {
      // 当点击某个栏目，拿到该栏目的索引，先将这个栏目添加到cateList数组中
      this.cateList.push(this.unaddcateList[index]);
      // 再将这个栏目从unaddcateList数组中移除
      this.unaddcateList.splice(index, 1);
      // 将数据存储到本地
      localStorage.setItem("remove_cate_list", JSON.stringify(this.cateList));
      localStorage.setItem("add_cate_list", JSON.stringify(this.unaddcateList));
    }
  }
};
</script>

<style lang='less' scoped>
.mycate {
  padding: 15px;
  clear: both;
  > p {
    font-size: 14px;
    color: #999;
    line-height: 20px;
  }
  > span {
    float: left;
    padding: 10px 16px;
    border: 1px solid #ccc;
    margin-left: 12px;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>