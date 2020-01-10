<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="lists">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="head">
          <img src="http://127.0.0.1:3000/uploads/image/IMG1568705287936.jpeg" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>{{comment.user.create_date|dateFormat}}</span>
          </div>
          <span @click="sendComment(comment)">回复</span>
        </div>
        <!-- 使用commentItem -->
        <!-- 判断是否有上一层结构 -->
        <commentItem v-if="comment.parent" :parent="comment.parent" @replyComment="sendComment"></commentItem>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <!-- 底部评论块 -->
    <!-- 监听子组件的事件，刷新页面：refresh -->
    <hmCommentFooter :post="article" @refresh="refresh" :getCommentData='commentData' @reset="commentData=''"></hmCommentFooter>
  </div>
</template>

<script>
// 引入头部模块
import myheader from "@/components/hmheader.vue";
// 引入实现获取新闻评论列表的方法
// 引入实现根据新闻id获取新闻详情的方法
import { getCommentList, getArticleById } from "@/apis/article.js";
// 引入封装的评论块
import commentItem from "@/components/hmCommentItem.vue";
// 引入全局过滤器
import { dateFormat } from "@/utils/myfilters.js";
// 引入底部评论块
import hmCommentFooter from "@/components/hmCommentFooter.vue";
export default {
  data() {
    return {
      commentList: [],
      article: {},
    //   这个对象就是当前回复的评论对象
    commentData:''
    };
  },
  components: {
    myheader,
    commentItem,
    hmCommentFooter
  },
  async mounted() {
    //   获取文章评论数据
    this.getArticleComment()
    // 获取文章数据
    let articleData = await getArticleById(this.$route.params.id);
    this.article = articleData.data.data;
  },
  methods: {
    //   将获取文章评论数据的操作封装起来
    async getArticleComment() {
      let res = await getCommentList(this.$route.params.id, {
        pageSize: 10,
        pageIndex: 1
      });
      console.log(res);
      this.commentList = res.data.data.length
        ? res.data.data
        : this.commentList;
      this.commentList = this.commentList.map(value => {
        value.user.head_img = "http://127.0.0.1:3000" + value.user.head_img;
        return value;
      });
    },
    // 刷新页面
    refresh() {
        // 重新刷新页面的内容：调用获取文章评论数据的方法
        this.getArticleComment()
        // 让页面滚动到最顶部
        window.scrollTo(0,0)
    },
    // 回复评论
    sendComment(comment){
        console.log(comment);
        
        this.commentData=comment
    }
  },
  //   注册全局过滤器
  filters: {
    dateFormat
  }
};
</script>

<style lang='less' scoped>
.comments {
  padding-bottom: 50px;
}
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>