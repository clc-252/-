<template>
  <div class="cate">
    <hmheader title="栏目管理">
      <i class="iconfont iconjiantou2" slot="left" @click="$router.back()"></i>
    </hmheader>
    <div class="removecate mycate">
      <p>点击删除以下频道</p>
      <span v-for="item in cateList" :key="item.id">{{item.name}}</span>
    </div>
    <div class="addcate mycate">
      <p>点击添加以下频道</p>
      <span>社会</span>
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
  data(){
      return {
          cateList:[]
      }
  },
  async mounted(){
      let res=await getCateList()
      console.log(res);
      
      this.cateList=res.data.data
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