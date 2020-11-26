<template>
  <div class="history-box">
    <BackBar :title="title" @clear="clear" />
    <div class="book-content" v-if="detailList.length > 0">
      <div
        class="book-list clearfix"
        v-for="(item, index) in detailList"
        :key="index"
        @click="goBook(item.bookId)"
      >
        <div class="imgBox-bg fl">
          <div class="line fl"></div>
          <div class="imgBox fl">
            <img class="auto-img" :src="item.cover | setCover" alt="" />
          </div>
        </div>
        <div class="book-info fl">
          <p class="title">{{ item.title }}</p>
          <p class="chapter">阅读到: {{ item.chapter }}</p>
          <p class="time">上次阅读时间: {{ item.time }}</p>
        </div>
      </div>
    </div>
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无阅读历史"
      v-else
    />
  </div>
</template>

<script>
import '@/assets/scss/historyread.scss'

import * as api from '@/api/api'
import BackBar from "@/components/Common/BackBar";

export default {
  data() {
    return {
      title: '阅读历史',
      historyBook: [], // 历史书籍
      detailList: [],  // 筛选处理后的书籍信息
    }
  },
  created() {
    // 获取书籍信息
    if (window.localStorage.getItem("recordHistory")) {
      this.historyBook = JSON.parse(window.localStorage.getItem("recordHistory"));
      // console.log(this.historyBook);
    }
    this.getBook()
  },
  methods: {
    // 获取历史阅读书籍
    getBook() {
      this.historyBook.map((v => {
        api.getBookDetail(v.bookId).then((res) => {
          // console.log(res)
          // console.log(res.data.title)
          this.detailList.push({ bookId: v.bookId, title: res.data.title, cover: res.data.cover, chapter: v.chapter, time: v.time })
          // console.log(this.detailList);
          // 按时间排序 
          // 按照字符编码的顺序进行排序。
          // 要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较

          // 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
          // 若 a 等于 b，则返回 0。
          // 若 a 大于 b，则返回一个大于 0 的值。
          this.detailList.sort((prev, next) => {
            return next.time < prev.time ? 1 : -1
          })
        }).catch((error) => {
          this.$toast.clear();
          this.$toast(error);
        });
      }))

    },
    // 前往书籍详情页
    goBook(bookId) {
      this.$router.push({ name: 'book', params: { bookId } })
    },
    // 清空历史书籍记录
    clear() {
      if (this.historyBook.length <= 0) {
        this.$toast.fail({
          message: '没有历史书籍',
          forbidClick: true,
        });
        return;
      } else {
        this.$dialog
          .confirm({
            message: "是否要清除阅读历史记录?",
            theme: "round-button",
            confirmButtonColor: '#B5331D',
            cancelButtonColor: '#222222'
          })
          .then(() => {
            this.$toast.loading({
              message: '请稍后...',
              forbidClick: true,
              duration: 0,
            });

            setTimeout(() => {
              this.$toast.clear()
              // console.log('被执行了');
              this.detailList = [];
              window.localStorage.removeItem("recordHistory")
            }, 800)
          })
          .catch((error) => {
            // on cancel
            this.$toast.clear();
            this.$toast(error);
          });
      }
    }
  },
  components: {
    BackBar
  }
}
</script>

<style lang="scss" scoped>
body {
  background-color: #f2f2f2 !important;
}

/deep/ .van-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/deep/ .van-empty__description {
  width: 200px;
  text-align: center;
}
</style>