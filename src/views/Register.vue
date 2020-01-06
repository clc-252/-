<template>
  <div class="register">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- 使用自己封装的hminput文本框 -->
        <hminput
          placeholder="请输入用户名或手机号码"
          :rules="/^(\d{5,6})$|^(1\d{10})$/"
          msg="用户名或手机号不正确"
          v-model="users.username"
        ></hminput>
        <hminput placeholder="请输入密码" :rules="/^\S{3,16}$/" msg="密码不正确" v-model="users.password"></hminput>
        <hminput placeholder="请输入昵称" :rules="/^\w+$/" msg="请输入昵称" v-model="users.nickname"></hminput>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/login" class>去登陆</a>
      </p>
      <!-- <div data-v-4bc01e24 class="button">登录按钮</div> -->
      <!-- 使用自己封装的hmbutton按钮 -->
      <!-- 监听子组件的click事件 -->
      <hmbutton @click="register">注册</hmbutton>
    </div>
  </div>
</template>

<script>
// 引入自己封装的按钮
import hmbutton from "@/components/hmbutton.vue";
// 引入自己封装的文本框
import hminput from "@/components/hminput.vue";
// 引入实现用户注册的方法
import { usersRegister } from "@/apis/user.js";
export default {
  data() {
    return {
      users: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  // 注册
  components: {
    hmbutton,
    hminput
  },
  methods: {
    async register() {
      let res = await usersRegister(this.users);
      console.log(res);
      if(res.data.message==='注册成功'){
        this.$toast.success(res.data.message)
        this.$router.push({name: 'Login'})
      }else{
        this.$toast.fail(res.data.message)
      }
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>