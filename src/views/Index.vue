<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>&nbsp;
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- 标签栏 -->
    <div class="nav">
      <!-- 通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
      <van-tabs v-model="active" swipeable>
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo {
    padding: 0 10px;
  }
  .iconnew {
    font-size: 60px;
  }
  .search {
    flex: 1;
    height: 36px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.5);
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    .icon_search {
      font-size: 18px;
    }
  }
  .user {
    font-size: 26px;
    padding: 0 10px 0 20px;
  }
}
</style>