<template>
  <div class="header">
      <div>
          <slot name="left"></slot>
      </div>
      <div>{{title}}</div>
      <div>
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:['title']
}
</script>

<style lang='less' scoped>
.header{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > div:nth-of-type(1),div:nth-of-type(3){
        padding: 0 10px;
    }
    > div:nth-of-type(2){
        text-align: center;
        font-weight: bold
    }
}
</style>