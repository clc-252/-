<template>
  <div class="personal">
    <router-link :to="{path:`/editPersonal/${currentUser.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.create_date|dateFormat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <personalcell title="我的关注" desc="关注的用户"></personalcell>
    <personalcell title="我的跟帖" desc="跟帖/回复"></personalcell>
    <personalcell title="我的收藏" desc="文章/视频"></personalcell>
    <personalcell title="设置"></personalcell>
    <hmbutton @click="exit">退出</hmbutton>
  </div>
</template>

<script>
// 引入personalcell.vue
import personalcell from "@/components/personalcell.vue";
// 引入封装的按钮
import hmbutton from "@/components/hmbutton.vue";
// 引入user.js
import { getUserById } from "@/apis/user.js";
// 引入全局过滤器
import {dateFormat} from '@/utils/myfilters.js'
export default {
  components: {
    personalcell,
    hmbutton
  },
  data() {
    return {
      // 当前登录的用户对象
      currentUser: {}
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
    let res = await getUserById(this.$route.params.id);
    console.log(res);
    if(res.data.message==='获取成功'){
      this.currentUser=res.data.data
      // 将图片路径补充完整
      this.currentUser.head_img='http://127.0.0.1:3000'+this.currentUser.head_img
    }else if(res.data.message==='用户信息验证失败'){
      // 验证失败，跳回登录页进行登录
      this.$router.push({name:'Login'})
    }
  },
  // 退出的方法
  methods:{
    exit(){
      // 将本地存储的token值删除
      localStorage.removeItem('userLogin_token')
      // 跳转到浏览新闻主页
      this.$router.push({name:'Index'})
    }
  },
  // 注册过滤器
  filters:{
    dateFormat
  }
};
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn {
  margin: 20px auto;
}
</style>