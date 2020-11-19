<template>
  <div>
    <div class="back-bar">
      <span class="back-icon" @click="Back">
        <i class="icon-back icon"></i> 
      </span>
      <h2>{{ bookTitle }}</h2>
      <!-- <span></span> -->
      <span class="sort-icon" @click="reverseChapter">
        {{ sort ? sortText : "降序" }}
        <i class="icon-sort icon"></i>
      </span>
    </div>
    <WhiteSpace />
    <ul class="chapter-list">
      <li
        v-for="(item, index) in ChapterList"
        :key="item._id"
        class="chapter-item"
        :class="{ active: currentIndex === index }"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import '@/assets/scss/catalog.scss'

import * as api from "@/api/api";
import WhiteSpace from "@/components/Common/WhiteSpace";

export default {
  data() {
    return {
      bookTitle: "",
      bookId: "",
      ChapterId: "",
      ChapterList: [],
      currentIndex: 0,
      sortText: "正序",
      sort: true,
    };
  },
  created() {
    this.bookId = this.$route.params.bookId;
    this.bookTitle = this.$route.query.title;
    // console.log(this.$route);
    this.getSource();
  },
  methods: {
    // 获取章节列表 3步
    getSource() {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 1.获取书籍源
      api
        .getBookSources(this.bookId)
        .then((res) => {
          this.ChapterId = res.data[0]._id;
          // 2.获取书籍章节(根据书籍源id获取章节)
          api
            .getBookChapters(this.ChapterId)
            .then((res) => {
              this.$toast.clear();

              // this.$nextTick(() => {

              // })
              // 3.根据获取的章节渲染
              this.ChapterList = res.data.chapters;
              // console.log(this.ChapterList);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    Back() {
      this.$router.back();
    },
    // 切换排序方式 （正序，反序）
    reverseChapter() {
      this.sort = !this.sort;
      this.ChapterList.reverse();
    },
  },
  components: {
    WhiteSpace,
  },
};
</script>