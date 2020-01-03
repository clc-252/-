<template>
  <input
    type="text"
    class="hminput"
    :class="{success:statu,error:!statu}"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
export default {
  props: ["rules", "msg"],
  data() {
    return {
      statu: true
    };
  },
  methods: {
    // 监听用户输入的数据，使用正则表达式验证数据是否正确，如果正确添加success的样式，如果错误添加error的样式
    handleInput(event) {
      let value = event.target.value;
      if (this.rules && this.rules.test(value)) {
        this.statu = true;
      } else {
        this.statu = false;
      }
      // 告诉父组件内容发生变化
      this.$emit("input", value);
    },
    // 当文本框失焦的时候再验证一次，如果数据不合格，则提示用户
    handleBlur() {
      let value = event.target.value;
      if (this.rules && !this.rules.test(value)) {
        //   console.log(this.msg || "输入不正确");
        // 在组件中使用---按需引入
        this.$toast.fail(this.msg||'输入不正确');
        // 还可以设置多个属性
        // this.$toast.fail({
        //   message: this.msg || "输入不正确",
        //   duration: 5000
        // });
      }
    }
  }
};
</script>

<style lang='less' scoped>
.hminput {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 1px solid #757575;
  font-size: 22px;
  line-height: 60px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>