<template>
  <div class="commentItem">
    <div class="top">
      <div class="left">
        <span>{{parent.user.nickname}}</span> &nbsp;
        <span>{{parent.create_date|dateFormat}}</span>
      </div>
      <span>回复</span>
    </div>
    <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
// 引入全局过滤器
import { dateFormat } from "@/utils/myfilters.js";
export default {
  props: ["parent"],
  // 注册全局过滤器
  filters: {
    dateFormat
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