<template>
  <div class="book-info-wrapper">
    <!-- <BackBar :title="title" /> -->
    <van-nav-bar
      title="书籍详情"
      left-text="返回"
      left-arrow
      @click-left="back"
      @click-right="goToBookShelf"
      fixed
    >
      <template #right>
        <i class="icon-Shelf"></i>
      </template>
    </van-nav-bar>
    <WhiteSpace />
    <!-- 书籍页面 书籍详情页（bookInfo） 评论（recommend） 阅读/加入书架(bookBar)暂... -->
    <van-skeleton
      avatar
      avatar-size="100px"
      avatar-shape="square"
      :row="4"
      row-width="100%"
      :loading="loading"
    >
      <div class="book-content">
        <!-- 背景 -->
        <div class="BgBox" :style="`backgroundImage: url(${cover})`"></div>
        <!-- 书籍信息 -->
        <!-- :style="{backgroundImage: `url(${cover})`,backgroundSize: 'cover',backgroundPosition: '0px',filter: `blur(${2}px)`}" -->
        <div class="book-detail">
          <div class="clearfix">
            <div class="book-cover fl">
              <img class="auto-img fl" :src="cover" :alt="book.title" />
            </div>
            <div class="book-desc fl">
              <h2 class="book-title">{{ book.title }}</h2>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-major">
                <span class="count">{{ wordCount }}字</span>
                <span>{{ book.majorCate }}</span>
                <span>{{ book.minorCate }}</span>
                <span v-if="book.isSerial" class="continue">连载中...</span>
                <span v-else class="over">已完结</span>
              </p>
            </div>
          </div>
          <!-- 读书信息 留存率 人气 等 -->
          <div class="book-reader">
            <p class="reader-item">
              <span class="title">追人气</span
              ><span class="content">{{ book.latelyFollower }}</span>
            </p>
            <p class="reader-item">
              <span class="title">读者留存率</span
              ><span class="content">{{ book.retentionRatio }}%</span>
            </p>
            <p class="reader-item">
              <span class="title">日更新字数/天</span
              ><span class="content">{{ serializeWordCount }}</span>
            </p>
          </div>
        </div>

        <!-- <div class="white-space"></div> -->
        <!-- 简介/目录 -->
        <!-- 书籍简介 -->
        <div class="book-intro">
          <h3>简介</h3>
          <!-- tag 类型标签 -->
          <ul class="tag-list">
            <li v-for="(item, index) in book.tags" :key="index">
              {{ item }}
            </li>
          </ul>
          <!-- 书籍介绍 -->
          <div class="book-intro-content" @click="changeShowPart">
            <transition name="fade">
              <p class="book-intro-text" :class="{ part: isShow }">
                {{ book.longIntro }}
                <i class="icon-down-arrow icon" v-show="isShow"></i>
              </p>
            </transition>
          </div>
          <!-- 目录 -->
          <div class="book-catalog" @click="goToCatalog">
            <div class="title fl">
              <span>目录</span>
            </div>
            <div class="text fr">
              <span>{{ book.isSerial ? "连载中..." : "已完结" }}</span>
              <span>{{ book.lastChapter }}</span>
            </div>
          </div>
        </div>

        <!-- 评论 -->
        <Comment :bookid="bookId" />
        <!-- 相关书籍推荐 -->
        <Recommend :bookid="bookId" />
        <!-- action 阅读，加入书架 -->
        <div class="action">
          <div class="add-bookshelf" @click="addToShelf(book)">
            <i class="icon-addShelf" v-if="shelfText === '加入书架'">
              <i class="path2"></i>
            </i>
            <i class="icon-inShelf" v-else></i>
            {{ shelfText }}
          </div>
          <div class="read-book" @click="readBook">立即阅读</div>
        </div>
      </div>
      <WhiteSpace />
    </van-skeleton>
  </div>
</template>

<script>
import '@/assets/scss/book.scss'

import * as api from "@/api/api";
// import BackBar from "@/components/Common/BackBar";
import WhiteSpace from "@/components/Common/WhiteSpace";
import Comment from "@/components/Book/Comment";
import Recommend from "@/components/Book/Recommend";

/* 

  <!-- encodeURIComponent() url编码 -->
  <!-- decodeURIComponent() url解码 -->

*/

export default {
  data() {
    return {
      title: "书籍详情",
      bookId: "",
      book: {},
      loading: true,
      isShow: true,
      bookTitle: "",
      shelfText: '加入书架',
      nowArr: [],
      inShelf: false  // 切换加入书架的图标  ? 
    };
  },
  computed: {
    // 封面
    cover() {
      let staticPath = "http://statics.zhuishushenqi.com";
      return staticPath + this.book.cover;
    },
    // 字数
    wordCount() {
      return this.book.wordCount > 10000
        ? parseInt(this.book.wordCount / 10000) + "万"
        : this.book.wordCount;
    },
    // 日更新字数/天
    serializeWordCount() {
      return this.book.serializeWordCount < 0
        ? 0
        : this.book.serializeWordCount;
    },
  },
  created() {
    this.bookId = this.$route.params.bookId;
    //  console.log(this.bookId,typeof this.bookId);
    this.getData();

    // 判断是否已在书架中
    if (localStorage.getItem("bookShelf")) {
      this.nowArr = JSON.parse(localStorage.getItem("bookShelf"));
      for (let i = 0; i < this.nowArr.length; i++) {
        if (this.nowArr[i].bookId === this.bookId) {
          this.shelfText = '已加入'
          break;
        }
      }
    }
  },
  methods: {
    getData() {
      this.$toast.loading({
        message: '请稍后...',
        forbidClick: true,
        duration: 0,
      });

      api.getBookDetail(this.bookId).then((res) => {
        this.$toast.clear();
        this.book = res.data;
        // console.log(res);
        // console.log(this.book,'this.book');
        // 页面更新渲染完毕后关闭骨架屏
        this.$nextTick(() => {
          this.loading = false;
        })
      })
    },
    // 控制书籍介绍的展开或收起
    changeShowPart() {
      this.isShow = !this.isShow;
    },
    // 跳转目录页
    goToCatalog() {
      this.$router.push({
        name: "catalog",
        params: { bookId: this.bookId },
        query: { title: this.book.title },
      });
    },
    // 加入书架
    addToShelf(book) {
      let storage = window.localStorage.getItem("bookShelf");
      storage = storage ? JSON.parse(storage) : [];

      let isExist = false;
      // 判断是否加入的是同一本书，是的话就拦截
      for (let shelfBook of Object.values(storage)) {
        if (shelfBook.bookId === book._id) {
          isExist = true;
          this.$toast({
            message: '已在书架中',
            position: 'top',
          });
          break;
        }
      }
      if (!isExist) {
        this.$toast({
          message: '加入书架成功！',
          position: 'top',
        });
        storage.push({ bookId: this.bookId, cover: book.cover, title: book.title, checked: false });
        window.localStorage.setItem("bookShelf", JSON.stringify(storage));

        this.shelfText = '已加入'
      }
    },
    readBook() {
      this.$router.push({ name: 'readbook', params: { bookid: this.bookId }, query: { title: encodeURIComponent(this.book.title) } })
    },
    back() {
      this.$router.back();
    },
    goToBookShelf() {
      this.$router.push({ name: 'bookshelf' })
    },
  },
  components: {
    // BackBar,
    WhiteSpace,
    Comment,
    Recommend,
  },
};
</script>
