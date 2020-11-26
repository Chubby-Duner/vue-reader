<template>
  <div>
    <BackBar :title="word" :isResult="1" />
    <WhiteSpace />
    <BookList :bookList="list" v-if="list.length > 0" />
    <van-empty description="暂无相关书籍" image="error" v-else />
  </div>
</template>

<script>
import * as api from "@/api/api";
import BackBar from '@/components/Common/BackBar'
import BookList from '@/components/Book/BookList'
import WhiteSpace from '@/components/Common/WhiteSpace'

export default {
  data() {
    return {
      word: '',
      list: []
    }
  },
  created() {
    this.word = this.$route.query.keyword;
    this.getResult()
  },
  methods: {
    // 获取搜索结果
    getResult() {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      })

      api.search(this.word).then(res => {
        this.$toast.clear();

        // console.log(res);
        this.list = res.data.books;
      }).catch((error) => {
        this.$toast(error);
      })
    }
  },
  components: {
    BackBar,
    BookList,
    WhiteSpace
  }
}
</script>

<style lang="scss" scoped>
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