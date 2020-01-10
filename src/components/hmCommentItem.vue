<template>
  <div class="commentItem">
      <!-- 组件递归：在组件内部使用组件自身，将嵌套的数据重新赋值给prop设置的属性 -->
    <commentItem v-if="parent.parent" :parent="parent.parent" @replyComment='sendComment'></commentItem>
    <div class="top">
      <div class="left">
        <span>{{parent.user.nickname}}</span> &nbsp;
        <span>{{parent.create_date|dateFormat}}</span>
      </div>
      <span @click="sendComment(parent)">回复</span>
    </div>
    <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
// 引入全局过滤器
import { dateFormat } from "@/utils/myfilters.js";
export default {
  // 在组件中使用name属性，给组件自己定义个名字，这样在组件中就可以自己调用自己了
  name:'commentItem',
  props: ["parent"],
  // 注册全局过滤器
  filters: {
    dateFormat
  },
  methods:{
    sendComment(comment){
      console.log(comment);
      this.$emit('replyComment',comment)
    }
  }
};
</script>

<style lang='less' scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 5px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>