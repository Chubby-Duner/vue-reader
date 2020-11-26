<template>
  <!-- 相关书籍推荐 -->
  <div class="recommend-wrapper">
    <h3>同类书籍推荐</h3>
    <ul class="recommend-list">
      <router-link
        tag="li"
        v-for="item in books"
        :key="item._id" 
        class="recommend-item"
        :to="{ name: 'book', params: { bookId: item._id, isRecom: 1 } }"
      >
        <div class="img-box">
           <img class="auto-img" :src="item.cover | setCover" :alt="item.title" />
        </div>
        <p class="title">{{ item.title }}</p>
        <p class="read">{{ item.otherReadRatio }}%读过</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import * as api from "@/api/api";

export default {
  props: {
    bookid: {
      type: String,
    },
  },
  data() {
    return {
      bookId: "",
      list: [],
      books: [],
    };
  },
  created() {
    this.bookId = this.bookid;
    this.getBook();
    // console.log(this.$route,'this.$route');
  },
  methods: {
    getBook() {
      api
        .getRecommend(this.bookId)
        .then((res) => {
          // console.log(res);
          this.list = res.data.books;
          for (let key in this.list) {
            this.books.push({
              title: this.list[key].title,
              cover: this.list[key].cover,
              otherReadRatio: this.list[key].otherReadRatio,
              _id: this.list[key]._id,
            });
          }
          // console.log(this.books, "this.books", typeof this.books);
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
  }
}
</script>

<style lang="scss" scoped>
.recommend-wrapper {
  h3 {
    font-size: 16px;
    color: #222;
    margin: 20px 0;
  }

  .recommend-list {
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }

    .recommend-item {
      width: 80px;
      margin-right: 10px;
      overflow: hidden;
      display: inline-block;

      .img-box {
        width: 70px;
        height: 90px;
        border-radius: 8px;
        overflow: hidden;
      }

      .title {
        margin: 8px 0;
        width: 100%;
        font-size: 12px;
        color: #484848;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .read {
        font-size: 12px;
        color: #ADADAD;
      }
    }
  }
}
</style>