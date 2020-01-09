<template>
  <div class="commentFooter">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment">
        <i class="iconfont iconpinglun-" @click="$router.push({path:`/comment/${post.id}`})"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="starThisArticle" :class="{active:post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span @click="makeComment">发送</span>
        <span @click="cancelReply">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { starArticle, replyComment } from "@/apis/article.js";
export default {
  props: ["post","getCommentData"],
  data() {
    return {
      isFocus: false
    };
  },
  methods: {
    //   获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
      this.$refs.commtext.focus();
    },
    // 收藏文章
    async starThisArticle() {
      let res = await starArticle(this.post.id);
      console.log(res);
      // 修改has_star的值
      this.post.has_star = !this.post.has_star;
      this.$toast.success(res.data.message);
    },
    // 发表评论
    async makeComment() {
      // 获取用户在文本域中输入的数据
      let data = {
        content: this.$refs.commtext.value
      };
      // 回复评论，要在data中添加parent_id属性，告诉我回复的是谁
      if(this.getCommentData){
        data.parent_id=this.getCommentData.id
      }

      let res = await replyComment(this.post.id, data);
      console.log(res);
      if (res.data.message === "评论发布成功") {
        // 把文本域隐藏
        this.isFocus = false;
        // 清空文本域中的内容
        this.$refs.commtext.value = "";
        // 让父组件中的内容刷新
        this.$emit("refresh");
      }
    },
    // 取消评论
    cancelReply(){
      this.isFocus=false
      this.$emit('reset')
    }
  },
  // 监听数据的变化，以改变isFocus的值
  watch:{
    getCommentData(){
      // console.log(123);
      if(this.getCommentData){
        this.isFocus=true
      }
    }
  }
};
</script>

<style lang='less' scoped>
.commentFooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: -5px;
      top: -10px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.active {
  color: #f00;
}
</style>
