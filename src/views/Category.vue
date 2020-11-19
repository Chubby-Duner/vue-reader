<template>
  <div class="cate-wrapper">
    <!-- 头部 -->
    <van-nav-bar
      title="分类"
      fixed
    >
     <template #right>
        <i class="icon-search" @click="$router.push({name: 'search'})"></i>
      </template>
    </van-nav-bar>
    <WhiteSpace />
    <!-- 分类内容 -->
    <div class="cate-list" ref="cateList">
      <ul>
        <li>
          <!-- 男生女生分类 -->
          <CateItem
            v-for="category in categories"
            :category="category"
            :key="category.title"
          />
        </li>
      </ul>
    </div>
    <!-- <div class="white-space1"></div> -->
  </div>
</template>

<script>
import '@/assets/scss/category.scss'

import * as api from "@/api/api";
import CateItem from "@/components/Cate/CateItem";
import WhiteSpace from "@/components/Common/WhiteSpace";

import BScroll from "better-scroll";

export default {
  data() {
    return {
      female: [],
      male: [],
      picture: [],
      press: [], // 出版
      isLoading: true,
      cateList: [],
      categories: [],
    };
  },
  created() {
    // 先本地读取
    let cateListFromLocal = window.localStorage.getItem("cateList");
    // // 本地有数据并且 没有过期
    if (cateListFromLocal && JSON.parse(cateListFromLocal).expire > Date.now()) {
        this.categories = JSON.parse(cateListFromLocal).data;
        // this.$toast.clear();
        // this.initalBScoller();
    }else{
      this.getDateFromServer();
    }
  }, 
  methods: {
    getDateFromServer() {
      // 开始网络请求 弹出加载轻提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      }); 

      api.getCategories()
        .then((res) => {
          // 关闭轻提示
          this.$toast.clear();

          // Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
          for (let [key, value] of Object.entries(res.data)) {
            let obj = null;
            switch (key) {
              case "male":
                  obj = {
                    title: "男生",
                    gender: "male",
                    catList: value,
                  };
                break;
              case "female":
                  obj = {
                    title: "女生",
                    gender: "female",
                    catList: value,
                  };
               break;
            }
            if (obj !== null) {
              this.categories.push(obj);
            }
            // 把数据存入本地存储
            window.localStorage.setItem(
              "cateList",
              JSON.stringify({
                  data: this.categories,
                  expire: Date.now() + 2 * 60 * 60 * 1000,  // 2小时
              })
            )
          }
          // console.log(this.categories, "---categories---");
          // 实现页面手势滑动
          // this.initalBScoller();
          this.$nextTick(() => {
            this.isLoading = false;
          });
        })
        .catch((error) => console.log(error));
    },
    initalBScoller() {
      // 当网络请求完毕更新cate之后,实例化better-scroll.让我们的分类菜单实现跟手势滑动
      // 数据更新完毕后,页面需要重新渲染nextTick可以保证页面渲染完毕
      this.$nextTick(() => {
        if (!this.cateListed) {
          this.cateListed = new BScroll(this.$refs.cateList, {
            // 允许BScroll内部元素被点击,默认不允许点击
            click: true,
          });
        } else {
          //刷新自身,重新计算内部元素的高度
          this.cateListed.refresh();
        }
      })
    },
  },
  components: {
    CateItem,
    WhiteSpace,
  }
}
</script>