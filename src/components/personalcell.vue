<template>
  <div class="cell">
      <div class="left">{{title}}</div>
      <div class="right">{{desc}}&nbsp;<span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
    props:['title','desc']
}
</script>

<style lang='less' scoped>
.cell{
    display: flex;
    padding: 20px 10px;
    justify-content: space-between;
    border-bottom: 2px solid #e4e4e4;
    > .right{
        font-size: 13px;
        color: #a0a0a0;
    }
}
</style>