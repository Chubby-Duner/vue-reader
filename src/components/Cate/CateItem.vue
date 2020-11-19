<template>
  <section class="cate-content">
    <h3 class="cate-title clearfix">
      <i class="line fl"></i>
      <span class="title fl">{{ category.title }}</span>
    </h3>
    <div class="flex-box clearfix">
      <router-link tag="div" class="cate-item clearfix fl"  
          :to="{ name: 'cateitemlist', params: { major: encodeURIComponent(cate.name) }, 
          query: { gender: category.gender}  }
          "
          v-for="cate in category.catList" :key="cate.name"
          >
        <div class="text fl">
          <p class="cate-name">{{ cate.name }}</p>
          <p class="cate-count">{{ cate.bookCount }}本</p>
        </div>
        <div class="img-box fr">
          <img
            class="auto-img"
            :src="cate.bookCover[0] | setCover"
            alt=""
          />
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
    },
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    // gotoItemList() {
    //    this.$router.push({name: 'cateitemlist', query: {sex: this.sex}});
    // }
  },
};
</script>

<style lang="scss" scoped>
.cate-content {
  position: relative;
  background: #fff;

  .cate-title {
    margin: 10px 0;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    font-weight: 400;

    .line{
      display: inline-block;
      margin-right: 10px;
      width: 4px;
      height: 100%;
      background-color: #00bb86;
    }

    .title{
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .flex-box {
    padding: 0 15px;
  }

  .cate-item {
    margin-right: 25px;
    margin-bottom: 10px;
    padding: 10px;
    width: 140px;
    border-radius: 8px;
    background-color: #F0F1F3;

    &:nth-child(2n){
    margin-right: 0;
    }

    .text{
      margin-right: 20px;
      margin-top: 18px;
      // margin: auto 10px;
    }

    .cate-name {
      margin-bottom: 8px;
      font-size: 15px;
      font-weight: 600;
      color: #222;
    }
    .cate-count {
      font-size: 12px;
      color: #777;
    }

    .img-box {
      width: 60px;
      height: 70px;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 0 5px #888;
    }
  }
}
</style>