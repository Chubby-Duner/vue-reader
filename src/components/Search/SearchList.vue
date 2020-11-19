<template>
  <div class="search-list">
    <ul>
      <li class="book-list-li" v-for="item in bookList" :key="item._id">
        <router-link
          :to="{ name: 'book', params: { bookId: item._id } }"
          tag="div"
          class="clearfix"
        >
          <div class="book-list-book-cover fl">
            <img class="auto-img" :src="item.cover | setCover" />
          </div>
          <div class="book-info fl">
            <h3 class="bool-title">{{ item.title }}</h3>
            <p class="book-author">{{ item.author }}</p>
            <p class="book-introduce">{{ item.shortIntro }}</p>
            <p class="book-sort">
              <span>{{ item.majorCate }}</span>
              <span>{{ item.minorCate }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    bookList: {
      type: Array,
    }
  },
  filters: {
    setCover(cover) {
      let staticPath = "http://statics.zhuishushenqi.com";
      if (cover.indexOf(staticPath) > -1) {
        return cover;
      }
      return staticPath + cover;
    }
  }
}
</script>

<style lang="scss" scoped>
.book-list-li {
  margin-bottom: 20px;
  > div {
    overflow: hidden;
  }

  .book-list-book-cover {
    width: 66px;
    height: 88px;
    margin-right: 10px;
    border-radius: 8px;
    overflow: hidden;
  }

  .book-info {
    width: calc(100% - 76px);
    float: left;

    .bool-title {
      color: #333;
      line-height: 1;
      margin-bottom: 8px;
      font-size: 15px;
      font-weight: 600;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .book-author {
      color: #333;
      margin-bottom: 12px;
    }

    .book-sort {
      height: 20px;

      span {
        display: inline-block;
        box-sizing: border-box;
        margin-right: 10px;
        padding: 2px;
        border: 1px solid #f06e78;
        color: #f06e78;
      }
    }

    .book-introduce {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 10px;
      color: #8e8e8e;
    }
  }
}
</style>