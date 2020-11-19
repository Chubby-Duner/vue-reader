<template>
  <div class="hot-words">
    <p>
      搜索热词<span class="more">更多<i class="icon-back"></i></span>
    </p>
    <ul class="hotword-list">
      <li class="search-hotword" v-for="(item,index) in hotWord" :key="index">{{item.word}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hotWord: {
      type: Array
    }
  },
  data() {
    return {
      hotWords: [],
      sliceList: []
    }
  },
}
</script>

<style lang="scss" scoped>
.hot-words {
  position: relative;
  padding: 10px;
  overflow: hidden;
  background-color: #fff;

  p {
    //   font-size: 14px;
    color: #bec2c6;
    line-height: 30px;
    border-bottom: 1px solid rgb(198, 199, 201);

    span.more {
      float: right;
      font-size: 12px;

      .icon-back::before {
        color: #666;
      }
    }
  }

  .hotword-list {
    padding: 10px;

    .search-hotword {
      display: inline-block;
      font-size: 12px;
      margin: 5px;
      padding: 10px;
      color: #565656;
      background-color: #f7f7f7;
      // border: 1px solid rgb(198, 199, 201);
      border-radius: 20px;
    }
  }
}
</style>