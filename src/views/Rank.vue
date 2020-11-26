<template>
  <div class="rank-wrapper">
    <ChangeSexBar :sex="sexType" @change-sex="changeSex" :title="title" />
    <!-- 排行分类内容 -->
    <div class="rank-container">
      <!-- 列表分类 -->
      <div class="rank-bar-box" ref="rankList" v-if="sexType === 'male'">
        <ul class="rank-list">
          <li
            :class="['rank-item', { active: item._id === rankId }]"
            v-for="item in maleRankList"
            :key="item._id"
            @click="changeRankId(item._id)"
          >
            {{ item.title }}
            <!-- <span class="rank-list-item-text">  </span> -->
          </li>
        </ul>
      </div>
      <div class="rank-bar-box" ref="rankList" v-if="sexType === 'female'">
        <ul class="rank-list">
          <li
            :class="['rank-item', { active: item._id === rankId }]"
            v-for="item in femaleRankList"
            :key="item._id"
            @click="changeRankId(item._id)"
          >
            {{ item.title }}
            <!-- <span class="rank-list-item-text">  </span> -->
          </li>
        </ul>
      </div>
      <div class="list-content-box">
        <!-- 懒加载组件 -->
        <!-- <van-list
        v-model="loading"
        :finished="finished"
        finished-text="哎呀，人家是有底线哒~!"
        offset="20"
        @load="loadData"
      > -->
        <div class="list-content">
          <router-link
            class="book-list-book-info clearfix"
            v-for="item in bookList"
            :key="item._id"
            :to="{ name: 'book', params: { bookId: item._id } }"
            tag="div"
          >
            <div class="book-list-book-cover fl">
              <div class="imgBox">
                <img class="auto-img" :src="item.cover | setCover" alt="" />
              </div>
            </div>
            <div class="book-box fl">
              <h3 class="book-title">{{ item.title }}</h3>
              <p class="book-summary text-line-comm gray">
                {{ item.shortIntro }}
              </p>
              <div class="book-info">
                <div class="book-info-left fl">
                  <span>{{ item.minorCate }}</span>
                  <span class="split-line">|</span>
                  <span
                    ><i class="num">{{
                      item.latelyFollower | setLatelyFollower
                    }}</i
                    >人气</span
                  >
                </div>
                <div class="book-info-right fr">
                  <span>{{ item.majorCate }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <!-- </van-list> -->
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/rank.scss'

import * as api from "@/api/api";
import ChangeSexBar from "@/components/Common/ChangeSexBar";


export default {
  data() {
    return {
      sexType: "male",
      maleRankList: [],
      femaleRankList: [],
      rankId: "",
      rank: true,

      // 书籍数据
      bookList: [],

      title: '排行',

    };
  },

  created() {
    this.getRankData();
  },

  watch: {
    rankId() {
      // console.log(newValue,oldValue);
      // this.onLoad()
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      api.getRankBooks(this.rankId).then((res) => {
        this.$toast.clear()

        this.bookList = res.data.ranking.books;

      }).catch((error) => {
        this.$toast.clear();
        this.$toast(error);
      });
    },
  },

  methods: {
    // 获取默认id
    getRankData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 提示框不能关闭,直到网络请求成功/失败
      });

      api.getRank().then((res) => {
        this.$toast.clear();

        this.maleRankList = res.data.male;
        this.femaleRankList = res.data.female;
        this.rankId = this.maleRankList[0]._id;
        // console.log(this.rankId, ' this.rankId ');
        // console.log(this.maleRankList);
        // console.log(this.femaleRankList);
      }).catch((error) => {
        this.$toast.clear();
        this.$toast(error);
      });
    },
    changeSex(sex) {
      if (this.sexType === sex) {
        return;
      } else {
        this.sexType = sex;
        this.rankId =
          sex === "male"
            ? this.maleRankList[0]._id
            : this.femaleRankList[0]._id;
      }
    },
    changeRankId(rankId) {
      this.rankId = rankId;
    },
  },
  components: {
    ChangeSexBar
  },
};
</script>