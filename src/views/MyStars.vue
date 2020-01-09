<template>
  <div class="stars">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <hmarticleBlock
      v-for="item in startsList"
      :key="item.id"
      :post="item"
      @click="$router.push({path:`/articleDetail/${item.id}`})"
    ></hmarticleBlock>
  </div>
</template>

<script>
// 引入头部模块
import myheader from "@/components/hmheader.vue";
// 引入封装的新闻模块
import hmarticleBlock from "@/components/hmarticleBlock.vue";
// 引入获取用户收藏列表的方法
import { getUserStars } from "@/apis/user.js";
export default {
  data() {
    return {
      startsList: []
    };
  },
  components: {
    myheader,
    hmarticleBlock
  },
  async mounted() {
    let res = await getUserStars();
    console.log(res);
    this.startsList = res.data.data;
  }
};
</script>

<style>
</style>