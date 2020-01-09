<template>
  <div class="focus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <div class="box" v-for="(item,index) in followList" :key="item.id">
        <img :src="item.head_img" alt />
        <div class="center">
          <p>{{item.nickname}}</p>
          <span>{{item.create_date|dateFormat}}</span>
        </div>
        <span @click="unfollow(item.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
// 引入头部模块
import myheader from "@/components/hmheader.vue";
// 引入封装的获取用户关注列表的方法
import { getUserFollows,unfollowUser } from "@/apis/user.js";
// 引入全局过滤器
import { dateFormat } from "@/utils/myfilters.js";
export default {
  data() {
    return {
      followList: []
    };
  },
  components: {
    myheader
  },
  async mounted() {
    let res = await getUserFollows();
    console.log(res);
    this.followList = res.data.data.map(value => {
      value.head_img = "http://127.0.0.1:3000" + value.head_img;
      return value;
    });
  },
  methods:{
      async unfollow(id,index){
          let res=await unfollowUser(id)
          this.$toast.success(res.data.message)
        //   根据id删除取消关注用户的内容
        this.followList.splice(index,1)
      }
  },
  //   注册全局过滤器
  filters: {
    dateFormat
  }
};
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
