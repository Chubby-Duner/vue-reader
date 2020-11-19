<template>
  <!-- 书籍列表展示页 -->
  <div class="book-list-wrapper">
    <ul class="book-list">
      <router-link
        tag="li"
        class="book-list-li clearfix"
        v-for="item in bookList"
        :to="{ name: 'book', params: { bookId: item._id } }"
        :key="item._id"
      >
        <div class="book-cover fl">
          <img class="auto-img" :src="item.cover | setCover" />
        </div>
        <div class="book-info-content fl">
          <p class="book-title">{{ item.title }}</p>
          <p class="book-intro">{{ item.shortIntro }}</p>
          <div class="book-info">
            <div class="book-info-left fl">
              <span v-if="item.minorCate">{{ item.minorCate }}</span>
              <span class="split-line" v-if="item.minorCate">|</span>
              <span
                ><i class="num">{{ item.latelyFollower | setLatelyFollower }}</i
                >人气</span
              >
            </div>
            <div class="book-info-right fr" v-if="item.majorCate">
              <span>{{ item.majorCate }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    bookList: {
      type: Array,
    }
  }
}
</script> 

<style lang="scss" scoped>
.book-list-wrapper {
  .book-list {
    padding: 10px;
    box-sizing: border-box;

    .book-list-li {
      margin-bottom: 30px;

      &::after {
        content: "";
        display: block;
        clear: both;
      }

      .book-cover {
        width: 66px;
        height: 88px;
        margin-right: 10px;
        border-radius: 8px;
        overflow: hidden;
      }

      .book-info-content {
        box-sizing: border-box;
        width: calc(100% - 76px);
        float: left;

        .book-title {
          margin-bottom: 15px;
          font-size: 14px;
          font-weight: 600;
          color: #3a3c3b;
        }

        .book-intro {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
          color: #9ba6ae;
          line-height: 1.5;
        }

        .book-info {
          &::after {
            content: "";
            display: block;
            clear: both;
          }

          .book-info-left {
            .split-line {
              margin: 0 8px;
            }

            .num {
              color: #a66c56;
              font-weight: 400;
            }
          }

          .book-info-right {
            margin-right: 15px;
            border: 2px solid #fcb477;
            color: #fcb477;
          }
        }
      }
    }
  }
}
</style>