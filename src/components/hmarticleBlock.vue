<template>
  <!-- 当type值为1，且只有一张照片的时候用这个新闻格式 -->
  <div class="single" v-if="post.type===1&&post.cover.length===1">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" />
  </div>
  <!-- 当type值为2，说明是一个视频，使用这个新闻模板格式 -->
  <div class="single_video" v-else-if="post.type===2">
    <p class="content">{{post.title}}</p>
    <div class="play_video">
      <img :src="post.cover[0].url" />
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
  <!-- 当type值为3，且照片数量大于三张的新闻结构 -->
  <div class="single_three" v-else-if="post.type===1&&post.cover.length>=3">
    <p class="content">{{post.title}}</p>
    <div class="imgs">
      <img :src="item.url" v-for="item in post.cover" :key="item.id"/>
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
// 公共样式部分：不同结构的新闻的共同样式：标题、内容（作者、跟帖...）
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}

.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
.single_video {
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  > .play_video {
    position: relative;
    > img {
      width: 100%;
      margin: 10px 0;
    }
    > .playicon {
      position: absolute;
      width: 60/360 * 100vw;
      height: 60/360 * 100vw;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      text-align: center;
      line-height: 65/360 * 100vw;
      box-shadow: 0 0 10px #fff;
    }
  }
}
.single_three{
    display: flex;
  flex-direction: column;
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;
  > .imgs{
    display: flex;
    justify-content: space-around;
    >img {
      width: 33%;
      margin: 10px 0;
    }
  }
}
</style>