<template>
  <!-- 评论 -->
  <div class="comment-wrapper">
    <h3>热门书评</h3>
    <transition-group tag="ul" name="slider" class="comment-list">
      <li
        class="comment-item"
        v-for="(item, index) in commentList"
        :key="item._id"
        v-show="currentIndex === index"
      >
        <!-- 评论者信息 -->
        <div class="author">
          <div class="img-box fl">
            <img
              class="auto-img"
              :src="item.author.avatar | setCover"
              :alt="item.author.nickname"
            />
          </div>
          <div class="author-info fl">
            <span class="nickname">{{ item.author.nickname }}</span>
            <span class="leval">
              Lv.{{ item.author.lv }}
            </span>
          </div>
        </div>
        <!-- 评论内容 -->
        <p class="comment-content">{{ item.content }}</p>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    bookid: {
      type: String,
    },
  },
  data() {
    return {
      myData: "",
      commentList: [],
      currentIndex: 0,
    };
  },
  created() {
    this.myData = this.bookid;
    this.getComment();
  },
  methods: {
    getComment() {
      // http://api.zhuishushenqi.com/post/review/best-by-book?book=59ba0dbb017336e411085a4e&limit=10
      let url =
        "http://api.kele8.cn/agent/http://api.zhuishushenqi.com/post/review/best-by-book";
      this.axios
        .get(url, {
          params: {
            book: this.myData, // 书籍id
            limit: 10, // 评论条数
          },
        })
        .then((res) => {
          this.commentList = res.data.reviews;
          // console.log(this.commentList);
          // 等待页面渲染完毕才开启轮播
          this.$nextTick(() => {
            //  清除上一次的轮播图
            if (this.timer) {
              clearInterval(this.timer);
              this.currentIndex = 0;
            }

            this.timer = setInterval(() => {
              this.currentIndex =
                (this.currentIndex + 1) % this.commentList.length;
            }, 2000);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  // 组件被卸载时清理掉计时器
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="scss" scoped>
.comment-wrapper {
  margin-top: 15px;
  border-bottom: 1px solid #ebebeb;

  h3 {
    margin: 10px 0 10px 0;
    font-size: 16px;
    color: #222;
  }

  .comment-list {
    // overflow: hidden;
    position: relative;
    height: 3rem;
    overflow: hidden;

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }

  .comment-item {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;

    &.slider-enter {
      transform: translateY(110%);
    }

    &.slider-enter-active,
    &.slider-leave-active {
      transition: all 0.5s linear;
    }

    &.slider-enter-to,
    &.slider-leave {
      transform: translateY(0);
    }

    &.slider-leave-to {
      transform: translateY(-110%);
    }

    .author {
      margin-bottom: 10px;
      line-height: 50px;

      &::after {
        content: "";
        display: block;
        clear: both;
      }

      .img-box {
        margin-top: 5px;
        width: 40px;
        height: 40px;
      }

      .auto-img {
        width: 100%;
        display: block;
        border-radius: 50%;
      }

      .author-info {
        margin-left: 10px;
        font-size: 14px;
        color: #a4a4a3;

        .nickname {
          margin-right: 5px;
        }

        .leval {
          padding: 2px;
          width: 60px;
          height: 8px;
          line-height: 8px;
          text-align: center;
          font-size: 14px;
          color: #00bb86;
          border-radius: 10px;
          border: 1px solid #00bb86;
        }
      }
    }

    .comment-content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 14px;
      color: #a3a3a4;
      line-height: 1.5;
    }
  }
}
</style>