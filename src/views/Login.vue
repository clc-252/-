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
// 引入封装的实现登陆功能的api
import {login} from '@/apis/user.js'
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
    async login() {
      // console.log("123");
      // console.log(this.users);

      // 之前的方法：需要使用回调函数来返回执行的结果
      // login(this.users)
      // .then(res=>{
      //   console.log(res);
      // })
      // .catch(error=>{
      //   console.log(error);
      // })

      // 新方法：async  await --- 可以让我们使用同步的方式来调用异步的方法，也不需要使用很多的回调函数
      // 第一步：验证用户输入的信息是否有效
      if(/^(\d{5,6})$|^(1\d{10})$/.test(this.users.username)&&/^\S{3,16}$/.test(this.users.password)){
        // 第二步，如果验证成功，则发起请求
        /* 
          await：
            1.可以获取当前操作的返回结果
            2.await可以让后续的操作等待，只是执行完当前使用await标记的方法之后才会执行后续的操作
        */
       let res=await login(this.users)
       console.log(res);
       if(res.data.message==='用户不存在'){
        //  如果用户不存在，就提示用户
        this.$toast.fail(res.data.message)
       }else{
        //  如果登陆成功就跳转到相应的页面
       }
      }else{
        // 如果用户输入的信息验证不成功，就提示用户输入的信息有误
        this.$toast.fail('您输入的信息不合法，请输入正确的信息')
      }
    },
    handleinput(data) {
      // console.log(data);
      // 点击登陆按钮时，要获得用户输入的用户名和密码
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