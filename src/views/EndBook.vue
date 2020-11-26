<template>
  <div class="press">
    <van-nav-bar
      title="出版"
      left-text="返回"
      left-arrow
      @click-left="back"
      fixed
    />
    <div class="press-content">
      <ul class="cate-list">
        <van-tabs @change="getMinor" color="#B5331D" animated>
          <van-tab class="cat-item" title="全部">
            <BookList :bookList="allBookList" />
          </van-tab>
          <van-tab
            class="cat-item"
            v-for="(item, index) in pressItem"
            :key="index"
            :title="item.name"
          >
            <!-- 图书列表 -->
            <BookList :bookList="bookList" />
          </van-tab>
        </van-tabs>
      </ul>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/api'
import BookList from '@/components/Book/BookList'

export default {
  data() {
    return {
      sex: "press", // 性别
      type: "hot", // 热门类型
      major: "", // 书籍分类,主分类
      minor: "", // 子分类
      startMajor: '传记名著',
      allMinor: '',
      start: 0, //
      limit: 20, // 筛选的数量
      pressItem: [],
      minorList: [],
      bookList: [],
      allBookList: [],
      active: "",
    }
  },
  created() {
    this.getSubCategories()
    this.getpressBook();
    this.getAllCateBook()
  },
  methods: {
    // 获取子分类
    getSubCategories() {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });

      api
        .getCategories()
        .then((res) => {
          // console.log(res);
          this.pressItem = res.data.press;
        })
        .catch((error) => {
          this.$toast.clear();
          this.$toast(error);
        });
    },
    // vant框架的点击事件
    getMinor(name, title) {
      this.major = title;
      console.log(this.minor);
      this.getpressBook();
    },
    getpressBook() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });
      api.getCategoriesInfo(
        this.sex,
        this.type,
        this.major,
        this.allMinor,
        this.start,
        this.limit
      )
        .then((res) => {
          this.$toast.clear()
          // console.log(res, "子分类书籍");
          this.bookList = res.data.books;
          // console.log(this.bookList, "出版书籍");
        }).catch((error) => {
          this.$toast.clear();
          this.$toast(error);
        });
    },
    getAllCateBook() {
      api
        .getCategoriesInfo(
          this.sex,
          this.type,
          this.startMajor,
          this.minor,
          this.start,
          this.limit
        )
        .then((res) => {
          // console.log(res, "子分类书籍");
          this.allBookList = res.data.books;
          // console.log(this.allBookList, "全部书籍");
        }).catch((error) => {
          this.$toast.clear();
          this.$toast(error);
        });
    },
    back() {
      this.$router.back();
    }
  },
  components: {
    BookList
  }
}
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #b5331d;
}

/deep/ .van-nav-bar__text {
  color: #b5331d;
}

/deep/ .van-nav-bar .van-icon {
  color: #fff;
}

/deep/ .van-nav-bar__text {
  color: #fff;
}

/deep/ .van-nav-bar {
  background-color: #b5331d;
}

/deep/ .van-nav-bar__title {
  color: #fff;
}
.press-content {
  padding-top: 46px;
}
</style>