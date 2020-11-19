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
        <van-tabs @change="getMinor" color="#00bb86" animated>
          <van-tab class="cat-item" title="全部">
            <BookList :bookList="allBookList" />
          </van-tab>
          <van-tab
            class="cat-item"
            v-for="(item, index) in minorList"
            :key="index"
            :title="item"
          >
            <!-- <van-list
              v-model="loading"
              :finished="finished"
              finished-text="哎呀，没有数据可加载了!"
              offset="20"
              @load="loadData"
            > -->
              <!-- 图书列表 -->
              <BookList :bookList="bookList" />
            <!-- </van-list> -->
          </van-tab>
        </van-tabs>
      </ul>
      <div v-else>
          <BookList :bookList="allBookList" />
      </div>
    </div>
    <!-- <ListLoading v-show="isLoading" />
    <div class="no-more">没有更多了</div> -->
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

      // 触发加载
      loading: true,
      //是否全部加载完成数据
      finished: false,
      //所有购物袋数据
      allBookData: [],
      //每次触底懒加载截取8条数据
      dataCount: 8,
      //开始截取购物袋数据位置
      startIndex: 0,
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
          console.log(error)
        });
    },
    // vant框架的点击事件
    getMinor(name, title) {
      this.minor = title;
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
          console.log('分类');

          this.allBookData = res.data.books;

          //根据开始截取位置和截取数据数量设置购物袋显示的数据
          this.bookList = this.allBookData.slice(
            this.startIndex,
            this.startIndex + this.dataCount
          );

          console.log('this.bookList ==> ', this.bookList);

          this.startIndex += this.dataCount;

          //未加载
          this.loading = false;
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
        });
    },
    back() {
      this.$router.back()
    },
    //懒加载书本数据
    loadData() {
      console.log("触发懒加载");

      console.log("this.allBookData ==> ", this.allBookData);

      setTimeout(() => {
        //allBookData
        let data = this.allBookData.slice(
          this.startIndex,
          this.startIndex + this.dataCount
        );

        // console.log('data ==> ', data);

        this.startIndex += this.dataCount;

        this.bookList.push(...data);
        console.log('this.bookList 后 ==> ', this.bookList);

        // console.log('this.bookList ==> ', this.bookList);

        //如果当前截取数据不足8条数据，下次不可能截取的数据
        if (data.length < this.dataCount) {
          //没有数据可加载时，需要finished修改为true，这样可以不再onload事件
          this.finished = true;
        }else { 
          this.loading = false;
        }
      }, 1500);
    },
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
  background-color: #00bb86;
}

/deep/ .van-nav-bar__title {
  color: #fff;
}
</style>