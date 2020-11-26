<template>
  <div class="search-box">
    <!-- 搜索框 -->
    <div class="search-tab">
      <div class="back-icon fl" @click="Back"><i class="icon-back"></i></div>
      <div class="search-ipt">
        <van-search
          @search="searchByKeyword"
          v-model="iptValue"
          @input="autoComplete"
          placeholder="请输入搜索关键词"
          class="van-ipt"
          background="#B5331D"
        >
        </van-search>
      </div>
      <div class="search-btn fr" @click="searchByKeyword(iptValue)">搜索</div>
      <!-- 搜索列表内容 -->
      <ul class="content-list" v-show="showAuto">
        <li
          class="list-item"
          v-for="(item, index) in autoCompleteList"
          :key="index"
          @click="searchByKeyword(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 搜索热词 -->
    <!-- <HotWords :hotWord="sliceList"/> -->
    <!-- 搜索历史 -->
    <div class="search-history search-section">
      <h4 class="title">
        历史搜索
        <span class="clear-all" @click="clearHistory"
          ><i class="icon-delete"></i
        ></span>
      </h4>
      <ul class="search-keyword-list" v-if="searchHistory.length > 0">
        <li
          class="search-keyword"
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="searchByKeyword(item.words)"
        >
          {{ item.words }}
        </li>
      </ul>
      <van-empty image="search" description="暂无历史记录" v-else />
    </div>
    <!-- 热门书籍 -->
    <div class="search-history search-section hot-search">
      <h4 class="title">
        热门书籍
        <span class="change-one" @click="getHotBook"
          ><i class="icon-change-another-one"></i
        ></span>
      </h4>
      <ul class="hot-books-list">
        <SearchList :bookList="sliceList" />
      </ul>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/search.scss'

import * as api from "@/api/api";
import SearchList from "@/components/Search/SearchList";
// import HotWords from "@/components/Search/SearchHotWords";

export default {
  data() {
    return {
      hotId: "5a6844f8fc84c2b8efaa8bc5", // 热搜榜id
      bookList: [],
      sliceList: [],
      autoCompleteList: [],
      showAuto: false,
      iptValue: "",
      searchHistory: [], // 历史记录的数组
      hotWords: [],  // 搜索热词
      hotList: []
    };
  },
  created() {
    this.getHotBook();
    this.getHistoryWord();
    // this.getHotWords()
  },
  methods: {
    Back() {
      this.$router.back();
    },
    // 获取随机个数据
    getRandomArray(arr, count) {
      // 24 4
      let RandomArray = arr.slice(0); // 23
      let i = arr.length; // 24
      let min = i - count; // 20
      let temp;
      let index;
      while (i-- > min) {
        // 先用后减
        // 24-20 23-20 22-20 21-20
        // 随机选取一个元素…
        index = Math.floor((i + 1) * Math.random());
        // console.log(index,'index')
        // 与当前元素进行交换
        temp = RandomArray[index];
        RandomArray[index] = RandomArray[i];
        RandomArray[i] = temp;
      }
      // console.log(RandomArray, "RandomArray");
      return (this.sliceList = RandomArray.slice(min));
      // console.log(RandomArray, "RandomArray");
    },
    // 获取热门书籍
    getHotBook() {
      this.$toast.loading({
        message: '请稍后...',
        forbidClick: true,
        duration: 0,
      });

      api.getRankBooks(this.hotId).then((res) => {
        this.$toast.clear();

        this.bookList = res.data.ranking.books;
        // console.log(this.bookList);
        // 随机选取4个数据
        this.getRandomArray(this.bookList, 5);
      }).catch((error) => {
        this.$toast.clear();
        this.$toast(error);
      });
    },
    // 自动补全
    autoComplete() {
      let url =
        "http://api.kele8.cn/agent/http://api.zhuishushenqi.com/book/auto-complete";

      this.$toast.loading({
        message: '搜索中...',
        forbidClick: true,
        duration: 0,
      });

      this.axios
        .get(url, {
          params: {
            query: this.iptValue, // 搜索内容
          },
        })
        .then((res) => {
          // console.log(res);
          this.autoCompleteList = res.data.keywords;
          this.showAuto = true;
          this.$toast.clear();
        })
        .catch((error) => {
          this.$toast.clear();
          this.$toast(error);
        });
    },
    // 获取搜索热词
    // getHotWords() {
    //   let url =
    //     "http://api.kele8.cn/agent/http://api.zhuishushenqi.com/book/search-hotwords"
    //   this.axios.get(url).then((res) => {
    //     // console.log(res, '热词')
    //     this.hotWords = res.data.searchHotWords;
    //     // 随机选取10个数据
    //     // this.getRandomArray1(this.hotWords, 10);
    //     // console.log(this.sliceList,'hot');
    //   })
    // },

    // 搜索自动补充 http://api.zhuishushenqi.com/book/auto-complete?query=凡人
    // 获取搜索结果 http://novel.kele8.cn/search?keyword=遮天
    // 获取搜索热词 http://api.zhuishushenqi.com/book/search-hotwords

    // 获取搜索结果
    searchByKeyword(val) {
      //  1. 添加历史搜索  

      // 如果没输入值直接拦截掉 
      if (!val) return;

      // 判断是否一存在storage字段
      let storage = window.localStorage.getItem("seachWord");
      storage = storage ? JSON.parse(storage) : [];

      let isExist = false;

      for (let value of Object.values(storage)) {
        if (value.words === val) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        storage.push({ words: val });
        window.localStorage.setItem("seachWord", JSON.stringify(storage));
      }

      // this.getHistoryWord();

      // 2. 跳转至搜索结果页面  对传入的值进行编码
      this.$router.push({ name: "searchResult", query: { keyword: encodeURIComponent(val) } });
    },
    // 从本地存储获取搜索历史
    getHistoryWord() {
      if (window.localStorage.getItem("seachWord")) {
        this.searchHistory = JSON.parse(window.localStorage.getItem("seachWord"));
      }
    },
    // 清除历史记录
    clearHistory() {
      if (this.searchHistory.length <= 0) {
        this.$toast.fail({
          message: '没有历史记录',
          forbidClick: true,
        });
        return;
      } else {
        this.$dialog
          .confirm({
            message: "是否要清除历史记录?",
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
              this.searchHistory = [];
              window.localStorage.removeItem("seachWord");
              this.$toast.clear();
            }, 800)
          })
          .catch((error) => {
            this.$toast.clear();
            this.$toast(error);
          });
      }

    }
  },
  components: {
    SearchList,
    // HotWords
  },
};
</script>

<style lang="scss" scoped>
/deep/ .search-history .van-empty {
  padding: 0;
}
</style>