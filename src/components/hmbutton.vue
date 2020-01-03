<template>
  <div class="btn" @click="handlerclick">
      <!-- 使用匿名插槽 -->
      <slot></slot>
  </div>
</template>

<script>
export default {
    methods:{
        handlerclick(event){
            // 如果按钮被点击了，要告诉父组件用户点击了按钮
            this.$emit('click',event)
        }
    }
}
</script>

<style lang='less' scoped>
.btn {
    width: 318*100/360;
    height: 48px;
    background-color: #cc3300;
    color: #fff;
    border-radius: 24px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
}
</style>