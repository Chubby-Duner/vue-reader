<template>
  <!-- 顶部返回组件 -->
  <div class="back-bar">
    <span class="back-icon" @click="Back">
      <i class="icon-back icon"></i>
    </span>
    <!-- 对已经编码的文字进行解码 -->
    <h2 v-if="isResult">与"{{ decodeURIComponent(title) }}"有关的书籍</h2>
    <h2 v-else>
      {{ title }}
      <i class="icon-Shelf" v-if="title === '书籍详情'" @click="goToBookShelf"></i>
    </h2>
    <span class="clear" v-if="title === '阅读历史'" @click="clear">清除</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    isResult: {
      type: Number
    }
  },
  methods: {
    Back() {
      // if (this.$route.params.isRecom) {
      //   this.$router.back(-2);
      // }
      this.$router.back(); 
    },
    clear() {
      this.$emit('clear')
    }
  },
};
</script>

<style lang="scss" scoped>
.back-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 46px;
  color: #fff;
  background-color: #15C292;
  z-index: 1;

  .back-icon {
    position: absolute;
    top: 13px;
    left: 5px;

    .icon {
      font-size: 18px;
    }
  }

  h2 {
    margin: 0 auto;
    line-height: 46px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .icon-Shelf{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
  }

  .clear{
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    letter-spacing: 2px;
  }
}
</style>