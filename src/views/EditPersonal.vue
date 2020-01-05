<template>
  <div class="edit">
    <hmheader title="编辑资料">
      <!-- 方法一： -->
      <!-- <van-icon name="arrow-left" slot="left"/> -->
      <!-- 方法二：可以添加图标或者文字 -->
      <!-- $router.back()/$router.go(-1):返回上一步 -->
      <i class="iconfont iconjiantou2" slot="left" @click="$router.back()"></i>
    </hmheader>
    <div class="userimg">
      <img :src="currentUser.head_img"  />
      <!-- 使用upload -->
      <van-uploader :after-read="afterRead" />
    </div>
    <personalcell title="昵称" :desc="currentUser.nickname"></personalcell>
    <personalcell title="密码" :desc="currentUser.password"></personalcell>
    <personalcell title="性别" :desc="currentUser.gender?'男':'女'"></personalcell>
  </div>
</template>

<script>
// 引入封装好的头部部分
import hmheader from "@/components/hmheader.vue";
// 引入用户资料的列表
import personalcell from "@/components/personalcell.vue";
// 引入封装的获取用户数据的api
import { getUserById } from "@/apis/user.js";
export default {
  components: {
    hmheader,
    personalcell
  },
  data() {
    return {
      // 当前登录的用户数据
      currentUser: {}
    };
  },
  async mounted() {
    // 页面一加载就根据id获取用户数据
    let res = await getUserById(this.$route.params.id);
    console.log(res);
    // 如果数据获取成功
    if(res.data.message==='获取成功'){
        this.currentUser = res.data.data;
        if(this.currentUser.head_img){
            this.currentUser.head_img='http://127.0.0.1:3000'+this.currentUser.head_img
        }else{
            // 如果没有图片，则给定一张默认图片
            this.currentUser.head_img='http://127.0.0.1:3000/uploads/image/IMG1568705287936.jpeg'
        }
    }
  },
  methods: {
    // 文件上传完毕后会触发after-read回调函数，获取到对应的file对象
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  }
};
</script>

<style lang='less' scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    position: absolute;
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // 深度作用选择器：使 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件
  /deep/.van-uploader__upload{
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
  /deep/.van-uploader{
      position: absolute;
      top: 53%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
  }
}
</style>