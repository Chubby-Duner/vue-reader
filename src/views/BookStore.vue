<template>  
  <div class="home-page">
    <WhiteSpace />
    <ChangeSexBar :sex="sexType" @change-sex="changeSex" :title="title" />
    <div class="menu-search">
        <van-search placeholder="输入书籍名称" @focus="searchFocus"/>
    </div>
    <div class="swiper-content">
      <van-swipe :autoplay="2000" :indicator-color="'#fff'" @change="onChange">
        <van-swipe-item v-for="image in images" :key="image._id">
          <img class="auto-img" :src="image.img" @click="goToBook(image._id)" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <div
              class="dot"
              :class="{ active: currentIndex === index }"
              v-for="(item, index) in 3"
              :key="index"
            ></div>
          </div>
        </template>
      </van-swipe>
    </div>
    <!-- 功能区 -->
    <div class="function-box">
      <div class="func-item" v-for="(item,index) in funcOptions" :key="index">
        <div class="f-item" @click="goPage(item.name)">
          <div class="f-icon">
            <img class="auto-img" :src="item.image"/>
          </div>
          <div class="f-text">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="article-content">
      <h2 class="hot-title">
        <i class="line"></i>
        {{ this.sexType === "male" ? "男生" : "女生" }}热门
      </h2>
      <BookList :bookList="bookList" />
    </div>
  </div>
</template>
 
<script>
import '@/assets/scss/bookstore.scss'

import * as api from '@/api/api'
import ChangeSexBar from "@/components/Common/ChangeSexBar";
import WhiteSpace from "@/components/Common/WhiteSpace";
import BookList from "@/components/Book/BookList";

export default {
  data() {
    return {
      sexType: "male",  // 默认展示男生类别
      title: '时光阅读',
      images: [
        {
          img: "http://statics.zhuishushenqi.com/recommendPage/15543710092511",
          _id: "5b63cb37fda9d2dd54faae28"
        },
        {
          img: "http://statics.zhuishushenqi.com/recommendPage/156111169844287",
          _id: "5d0cacde2629f9b777527437"
        },
        {
          img: "http://statics.zhuishushenqi.com/recommendPage/156111180957475",
          _id: "5d0cad1a4b4731b177a001c9"
        }
      ],
      hotId: '',  // 默认男生
      maleHotId: '',
      femaleHotId: '',
      bookList: [],
      currentIndex: 0,
      funcOptions: [
        {
          title: "分类",
          image: require("../assets/images/category.png"),
          name: 'category'
        },
        {
          title: "排行",
          image: require("../assets/images/rank.png"),
          name: 'rank'
        },
        {
          title: "出版",
          image: require("../assets/images/press.png"),
          name: 'endBook'
        },
        {
          title: "漫画",
          image: require("../assets/images/cartoon.png"),
          name: 'picture'
        },
      ],
    }
  },
  created() {
    this.getDate()
  },
  watch: {
    hotId() {
      api.getRankBooks(this.hotId).then(res => {
        this.bookList = res.data.ranking.books;
        this.bookList = this.bookList.slice(0, 6);
        // console.log(this.bookList, 'this.bookList');
      })
    }
  },
  methods: {
    // 获取热门书籍
    getDate() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      api.getRank().then((res) => {
        this.$toast.clear();

        this.maleHotId = res.data.male[0]._id;
        this.femaleHotId = res.data.female[0]._id;
        this.hotId = this.maleHotId;
        // console.log(this.maleHotId, 'maleHotId');
        // console.log(this.femaleHotId, 'femaleHotId');
      })
      // 54d42d92321052167dfb75e3 男生
      // 54d43437d47d13ff21cad58b 女生
    },
    changeSex(sex) { // male  female
      if (this.sexType === sex) {
        return;
      } else {
        this.sexType = sex;
        this.hotId =
          sex === "male"
            ? this.maleHotId
            : this.femaleHotId;
        // console.log(this.hotId);
      }
    },
    goToBook(id) {
      this.$router.push({ name: 'book', params: { bookId: id } });
    },
    onChange(index) {
      this.currentIndex = index;
    },
    goPage(name) {
      this.$router.push({name})
    },
    //搜索栏获取焦点
    searchFocus() {
      this.$router.push({ name: 'search' });
    }
  },
  components: {
    ChangeSexBar,
    WhiteSpace,
    BookList
  }
}
</script>
