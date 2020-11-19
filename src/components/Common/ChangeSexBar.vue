<template>
  <!-- 头部 -->
  <div class="header">
    <h2 class="header-title">{{ setTitle }}</h2>
    <!-- 分类导航 -->
    <nav class="nav-group">
      <h3
        class="nav-item male" 
        @click="changeSex('male')"
        :class="{ active: sexType === 'male' }"
      >
        男生
      </h3>
      <h3
        class="nav-item female"
        @click="changeSex('female')"
        :class="{ active: sexType === 'female' }"
      >
        女生
      </h3>
    </nav> 
    <div class="history-read" v-if="title === '时光阅读'" @click="$router.push({name: 'historyRead'})">
        <img class="auto-img" src="../../assets/images/clock.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sex: {
      type: String,
      default: "",
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      sexType: "",
      setTitle: ""
    }
  },
  created() {
    this.sexType = this.sex;  // 判断高亮
    this.setTitle = this.title;
  },
  methods: {
    changeSex(sex) {
      this.sexType = sex;
      this.$emit("change-sex", sex);
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 46px;
  overflow: hidden;
  color: #fff;
  background-color: #15C292;
  box-sizing: border-box;
  z-index: 99;

  .header-title {
    position: absolute;
    top: 14px;
    left: 15px;
    color: #fff;
    line-height: 22px;
    text-align: left;
  }

  .history-read {
    position: absolute;
    top: 12px;
    right: 15px;
    width: 24px;
    height: 24px;
  }

  .nav-group {
    display: flex;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50px);
    height: 25px;
    line-height: 25px;
    border: 1px solid #fff;
    border-radius: 15px;

    .nav-item {
      flex: 1;
      display: table-cell;
      padding: 0 10px;
      color: #fff;
      // border: 1px solid #fff;

      &.active {
        color: #999;
        background-color: #fff;
      }
    }

    .male {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    .female {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  }
}
</style>