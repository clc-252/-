<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- <input placeholder="请输入手机号" class="input" /> -->
        <!-- 使用自己封装的hminput文本框 -->
        <hminput
          placeholder="请输入用户名或手机号码"
          :rules="/^(\d{5,6})$|^(1\d{10})$/"
          @input="handleinput"
          msg="用户名或手机号不正确"
          :value="users.username"
        ></hminput>
        <!-- <input placeholder="密码" class="input" type="password" /> -->
        <hminput 
          placeholder="请输入密码" 
          :rules="/^\S{3,16}$/" 
          msg="密码不正确" 
          v-model="users.password"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <!-- <div data-v-4bc01e24 class="button">登录按钮</div> -->
      <!-- 使用自己封装的hmbutton按钮 -->
      <!-- 监听子组件的click事件 -->
      <hmbutton @click="login">登陆</hmbutton>
    </div>
  </div>
</template>

<script>
// 引入自己封装的按钮
import hmbutton from "@/components/hmbutton.vue";
// 引入自己封装的文本框
import hminput from "@/components/hminput.vue";
export default {
  data() {
    return {
      users: {
        username: "",
        password: ""
      }
    };
  },
  // 注册
  components: {
    hmbutton,
    hminput
  },
  methods: {
    login() {
      // console.log("123");
      // 点击登陆按钮时，要获得用户输入的用户名和密码
      console.log(this.users);
    },
    handleinput(data) {
      console.log(data);
      this.users.username = data;
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