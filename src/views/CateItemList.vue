<template>
  <!-- 子分类 -->
  <div>
    <!-- <BackBar :title="major" /> -->
    <van-nav-bar
      :title="major"
      left-text="返回"
      left-arrow
      @click-left="back"
      fixed
    />
    <WhiteSpace />
    <div class="cate-item" ref="list">
      <ul class="cate-list" v-if="minorList.length > 0">
        <van-tabs @change="getMinor" color="#B5331D" animated :sticky="true" :offset-top="46+'px'">
          <van-tab class="cat-item" title="全部" >
            <BookList :bookList="allBookList" />
          </van-tab>
          <van-tab
            class="cat-item"
            v-for="(item, index) in minorList"
            :key="index"
            :title="item"
          >
            <!-- 图书列表 -->
            <BookList :bookList="bookList" />
          </van-tab>
        </van-tabs>
      </ul>
      <div v-else>
        <BookList :bookList="allBookList" />
      </div>
    </div>
    <!-- <ListLoading v-show="isLoading" />
    <div class="no-more" v-if="isEnding">没有更多了</div> -->
  </div>
</template>

<script>
import * as api from "@/api/api";
// import BackBar from "@/components/Common/BackBar";
import WhiteSpace from "@/components/Common/WhiteSpace";
// import ListLoading from "@/components/Common/ListLoading";
import BookList from "@/components/Book/BookList";
// import { debounce } from "@/assets/js/tool"

export default {
  data() {
    return {
      sex: "", // 性别
      type: "hot", // 热门类型
      major: "", // 书籍分类,主分类
      minor: "", // 子分类
      allMinor: '',
      start: 0, // 
      limit: 20, // 筛选的数量
      minorList: [],
      bookList: [],
      allBookList: [],
      active: "",

      // isLoading: true,
      // isEnding: false,
      // $docElement: null,
      // $body: null,
      // $list: null,
      // clientHeight: 0

    };
  },
  created() {
    this.major = decodeURIComponent(this.$route.params.major); // major 子分类名称 书籍分类
    this.sex = this.$route.query.gender; // 性别
    // console.log(this.sex, this.major);
    this.getSubCategories();
    this.getAllCateBook();
  },
  methods: {
    // 获取子分类
    getSubCategories() {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });

      api
        .getSubCategories()
        .then((res) => {
          this.$toast.clear();

          let obj = res.data;
          // 删除键为ok这一项
          delete obj.ok;

          for (let ele of obj[this.sex].entries()) {
            if (ele[1].major === this.major) {
              this.minorList.push(...ele[1].mins);
            }
          }
          // console.log(this.minorList.length);
        })
        .catch((error) => {
          this.$toast.clear();
          this.$toast(error);
        });
    },
    // vant框架的点击事件
    getMinor(name, title) {
      this.minor = title;
      // console.log(this.minor, '分类');
      // console.log(this.minor);
      this.getCategoriesInfo();
    },
    // 获取子分类下的书籍
    getCategoriesInfo() {
      api
        .getCategoriesInfo(
          this.sex,
          this.type,
          this.major,
          this.minor,
          this.start,
          this.limit
        )
        .then((res) => {
          // console.log(res, "子分类书籍");
          // console.log('分类');

          // this.allBookData = res.data.books;
          this.bookList = res.data.books;

          console.log('this.bookList ==> ', this.bookList);

        }).catch((error) => {
          this.$toast.clear();
          this.$toast(error);
        });
    },
    // 默认展示全部
    getAllCateBook() {
      api
        .getCategoriesInfo(
          this.sex,
          this.type,
          this.major,
          this.allMinor,
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
      this.$router.back()
    }
  },
  components: {
    // BackBar,
    WhiteSpace,
    BookList,
    // ListLoading
  },
}
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar {
  z-index: 999;
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
</style>