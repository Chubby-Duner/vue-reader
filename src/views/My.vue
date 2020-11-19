<template>
  <div class="my-box">
    <!-- 用户信息 -->
    <div class="info-box">
      <div class="info-desc">
        <div class="info-top clearfix">
          <div class="user-img fl">
            <img class="auto-img" src="../assets/images/timg.jpg" alt="" />
          </div>
          <div class="user-info fl">
            <div class="clearfix">
              <div class="userinfo-left fl">
                <div class="user-name">取个名字真难</div>
                <div class="leavel">Lv.7</div>
              </div>
              <div class="userinfo-right fr">签到有奖</div>
            </div>
          </div>
        </div>
        <div class="info-bottom">
          <div class="item">
            <p class="item-count">19.1</p>
            <p class="item-desc">书豆余额</p>
          </div>
          <div class="item">
            <p class="item-count">235</p>
            <p class="item-desc">豆券</p>
          </div>
          <div class="item">
            <p class="item-count">32</p>
            <p class="item-desc">月票</p>
          </div>
        </div>
        <div class="free-box">
          <div class="tips fl">
            <div class="crown fl">
              <img class="auto-img" src="../assets/images/crown.png" alt="" />
            </div>
            <div class="free-text fl">开通会员万本好书免费读</div>
          </div>
          <div class="begin fr">10元开通</div>
        </div>
      </div>
      <div class="func-box">
        <div class="func-item" v-for="(item,index) in funcOptions" :key="index">
          <div class="f-item">
            <div class="f-icon">
              <img class="auto-img" :src="item.image" />
            </div>
            <div class="f-text">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 操作区 -->
    <div class="cell-list" >
      <ul>
        <li class="cell-item" :title="item.title" is-link 
           v-for="(item,index) in cellData" :key="index"
           @click="goPage(item.name)"
           >
          <i :class="item.icon" class="icon-item"></i>
          <span class="cell-title">{{item.title}}</span>
          <span class="right-icon"><img src="../assets/images/rightArrow.png" alt=""></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/my.scss'

export default {
  data() {
    return {
       funcOptions: [
        {
          title: "我的钱包",
          image: require("../assets/images/wallet.png"),
        },
        {
          title: "消费记录",
          image: require("../assets/images/records.png"),
        },
        {
          title: "购买的书",
          image: require("../assets/images/book.png"),
        },
        {
          title: "绑兑换码",
          image: require("../assets/images/exchange.png"),
        },
      ],
      cellData: [
        {
          title: '我的消息',
          icon: 'icon-msg'
        },
        {
          title: '我的关注',
          icon: 'icon-follow'
        },
        {
          title: '我的收藏',
          icon: 'icon-follow'
        },
        {
          title: '书单',
          icon: 'icon-booklist'
        },
        {
          title: '阅读历史',
          icon: 'icon-borwseHistory',
          name: 'historyRead'
        },
        {
          title: '我的评论',
          icon: 'icon-mycom'
        },
      ]
    }
  },
  methods: {
    goPage(name) {
      this.$router.push({name});
    }
  }
}
</script>

<style lang="scss" scoped>
// body{
//   background-color: #F1F1F1;
// }
</style>