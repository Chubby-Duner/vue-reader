<template>
  <div>
    <BackBar :title="word" :isResult="1" />
    <WhiteSpace />
    <BookList :bookList="list" />
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