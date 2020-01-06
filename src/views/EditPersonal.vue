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
      <img :src="currentUser.head_img" />
      <!-- 使用upload -->
      <van-uploader :after-read="afterRead" />
    </div>

    <!-- 用户昵称部分 -->
    <personalcell title="昵称" :desc="currentUser.nickname" @click="nickshow=!nickshow"></personalcell>
    <!-- 使用dialog弹出框(这是修改昵称的弹出框) -->
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <!-- 这里不可以使用v-model双向绑定，因为当用户输入后点击取消后，页面上原本的数据内容也会发生改变 -->
      <van-field :value="currentUser.nickname" required label="昵称" placeholder="请输入昵称" ref="nick" />
    </van-dialog>

    <!-- 用户密码部分 -->
    <personalcell title="密码" desc="******" @click="passwordshow=!passwordshow"></personalcell>
    <!-- 使用dialog弹出框(这是修改密码的弹出框) -->
    <van-dialog
      v-model="passwordshow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :before-close="beforeClose"
    >
      <!-- 这里不可以使用v-model双向绑定，因为当用户输入后点击取消后，页面上原本的数据内容也会发生改变 -->
      <van-field required label="原密码" placeholder="请输入原密码" ref="oldpwd" />
      <van-field required label="新密码" placeholder="请输入新密码" ref="newpwd" />
    </van-dialog>

    <!-- 用户性别 -->
    <personalcell title="性别" :desc="currentUser.gender?'男':'女'" @click="gendershow=!gendershow"></personalcell>
    <!-- 使用dialog弹出框(这是修改性别的弹出框) -->
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <!-- 这里不可以使用v-model双向绑定，因为当用户输入后点击取消后，页面上原本的数据内容也会发生改变 -->
      <!-- columns要先写女再写男，因为这样搞好对应的索引为0和1，方便之后的操作 -->
      <van-picker :columns="['女','男']" :default-index="currentUser.gender" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
// 引入封装好的头部部分
import hmheader from "@/components/hmheader.vue";
// 引入用户资料的列表
import personalcell from "@/components/personalcell.vue";
// 引入封装的获取用户数据的api、修改用户信息的方法
import { getUserById, updataUserById } from "@/apis/user.js";
// 引入封装的实现文件上传的方法
import { uploadFile } from "@/apis/upload.js";
export default {
  components: {
    hmheader,
    personalcell
  },
  data() {
    return {
      // 当前登录的用户数据
      currentUser: {},
      // 设置修改昵称对话框是否可见
      nickshow: false,
      // 设置修改密码框是否可见
      passwordshow: false,
      // 设置修改性别对话框是否可见
      gendershow: false
    };
  },
  async mounted() {
    // 页面一加载就根据id获取用户数据
    let res = await getUserById(this.$route.params.id);
    console.log(res);
    // 如果数据获取成功
    if (res.data.message === "获取成功") {
      this.currentUser = res.data.data;
      if (this.currentUser.head_img) {
        this.currentUser.head_img =
          "http://127.0.0.1:3000" + this.currentUser.head_img;
      } else {
        // 如果没有图片，则给定一张默认图片
        this.currentUser.head_img =
          "http://127.0.0.1:3000/uploads/image/IMG1568705287936.jpeg";
      }
    }
  },
  // 调用方法实现文件的上传
  methods: {
    // 文件上传完毕后会触发after-read回调函数，获取到对应的file对象
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formdata = new FormData();
      // file.file:是当前的文件对象
      formdata.append("file", file.file);
      let res = await uploadFile(formdata);
      console.log(res);
      if (res.data.message === "文件上传成功") {
        // 修改用户头像的路径，实现预览功能，刷新之后变回原来的图像文件
        this.currentUser.head_img = "http://127.0.0.1:3000" + res.data.data.url;
        // 调用updataUserById方法修改用户头像
        let updataRes = await updataUserById(this.currentUser.id, {
          head_img: res.data.data.url
        });
        console.log(updataRes);
        if (updataRes.data.message === "修改成功") {
          // 修改成功提示用户
          this.$toast.success(updataRes.data.message);
        } else {
          // 提示用户修改失败
          this.$toast.fail(updataRes.data.message);
        }
      } else {
        this.$toast.fail("文件上传失败");
      }
    },
    // 修改昵称
    async updateNickname() {
      // 获取用户输入的内容
      // let name=this.$refs.nick  // 这样得到的是当前的文本框组件
      let name = this.$refs.nick.$refs.input.value;
      // console.log(name);
      // 修改昵称
      let res = await updataUserById(this.currentUser.id, { nickname: name });
      if (res.data.message === "修改成功") {
        // 更新页面数据
        this.currentUser.nickname = name;
        this.$toast.success(res.data.message);
      } else {
        this.$toast.fail(res.data.message);
      }
    },
    // 修改密码前的判断：判断原密码否输入正确
    // action:当前的操作类型：cancel:取消   confirm:确认
    // done：是否进行下一步
    beforeClose(action, done) {
      if (
        action === "confirm" &&
        this.$refs.oldpwd.$refs.input.value !== this.currentUser.password
      ) {
        // 当原密码输入不正确，将光标定到原密码输入框并全选输入的内容
        this.$refs.oldpwd.$refs.input.select();
        this.$refs.oldpwd.$refs.input.focus();
        this.$toast.fail("原密码输入不正确，请重新输入");
        done(false);
      } else if (
        action === "confirm" &&
        !/^\S{3,16}$/.test(this.$refs.newpwd.$refs.input.value)
      ) {
        // 验证用户输入的新密码是否符合格式，不符合提示用户
        this.$toast.fail("请输入3~6位的新密码");
        done(false);
      } else {
        done();
      }
    },
    // 修改密码
    async updatePassword() {
      //  点击确认之后获取用户输入的原密码
      let oldpwd = this.$refs.oldpwd.$refs.input.value;
      // console.log(oldpwd);
      if (oldpwd === this.currentUser.password) {
        // 获取输入的新密码
        let newpwd = this.$refs.newpwd.$refs.input.value;
        if (/^\S{3,16}$/.test(newpwd)) {
          // 如果用户输入的新密码符合格式要求，就修改密码
          let res = await updataUserById(this.currentUser.id, {
            password: newpwd
          });
          if (res.data.message === "修改成功") {
            // 修改页面上的密码
            this.currentUser.password = newpwd;
            this.$toast.success(res.data.message);
          } else {
            this.$toast.fail(res.data.message);
          }
        }
      }
    },
    // 修改性别
    async updateGender(){
      // console.log(this.gender);
      let res=await updataUserById(this.currentUser.id,{gender:this.gender})
      // console.log(res);
      if(res.data.message==='修改成功'){
        this.currentUser.gender=this.gender
        this.$toast.success(res.data.message)
      }else{
        this.$toast.fail(res.data.message)
      }
    },
    // 当性别选项发生改变时触发
    onChange(picker, value, index){
      console.log(this.currentUser.gender)
      this.$toast(`当前值：${value}, 当前索引：${index}`);
      // 当性别选项发生改变时，将对应的索引值赋给性别这个属性，再通过这个属性来判断是男还是女
      this.gender = index
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
  /deep/.van-uploader__upload {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>