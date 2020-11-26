<template>
  <div class="book-shelf-box">
    <!-- 头部 -->
    <div class="header">
      <h2 class="header-title">我的书架</h2>
      <div class="header-search">
        <router-link to="/search">
          <i class="icon-search"></i>
        </router-link>
        <i class="icon-manage-shelf" @click="showManageBox"></i>
      </div>
    </div>
    <WhiteSpace />
    <!-- 添加书籍 管理书架 -->
    <div class="manage-box" v-if="showManage">
      <div class="manage-item">
        <van-button type="primary" color="#B5331D" @click="showHideCheck"
          >管理书架</van-button
        >
      </div>
      <div class="manage-item">
        <van-button type="primary" color="#B5331D" @click="showPopup"
          >去添加</van-button
        >
      </div>
    </div>
    <!-- 书架不为空时显示 -->
    <div class="shelf-content" v-if="shelfList.length > 0">
      <ul>
        <li class="shelf-item" v-for="item in shelfList" :key="item._id">
          <van-checkbox
            class="check-box"
            v-if="showCheck"
            v-model="item.checked"
            checked-color="#B5331D"
            @click="checkOne"
          ></van-checkbox>
          <div class="imgBox-bg clearfix">
            <div class="line fl"></div>
            <div class="img-box fl" @click="goToBook(item.bookId)">
              <img
                class="auto-img"
                :src="item.cover | setCover"
                :alt="item.title"
              />
            </div>
          </div>
          <p class="title" @click="goToBook(item.bookId)">{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <!-- 书架为空时显示 -->
    <Empty v-else />
    <!-- 全选管理按钮 -->
    <div class="action-box" v-if="showCheck">
      <van-checkbox
        class="check-all fl"
        v-model="AllChecked"
        checked-color="#B5331D"
        @click="allCheck"
        >全选</van-checkbox
      >
      <div class="fr">
        <div class="cancel-btn fl" @click="closeCheck">取消</div>
        <div class="del-btn fr" @click="removeBook">删除</div>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="showPop" closeable close-icon="close" position="bottom">
      <ul>
        <li class="pop-item" @click="goToRank">
          <p class="content">
            <i class="icon-rank"></i>
            <span class="title">榜单找书</span>
          </p>
          <p class="tips">查看各类榜单</p>
        </li>
        <li class="pop-item" @click="goToCategory">
          <p class="content">
            <i class="icon-bookshelf"></i>
            <span class="title">书库找书</span>
          </p>
          <p class="tips">按明细分类找书</p>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import '@/assets/scss/bookshelf.scss'

import Empty from "@/components/BookShelf/Empty";
import WhiteSpace from "@/components/Common/WhiteSpace";


export default {
  data() {
    return {
      shelfList: [],
      AllChecked: false, // 全选的状态
      showCheck: false,  // 控制勾选框的显示隐藏
      check: false,  // 单选的状态
      showPop: false, // 弹出层
      showManage: false // 管理选项
    }
  },
  created() {
    if (window.localStorage.getItem("bookShelf")) {
      this.shelfList = JSON.parse(window.localStorage.getItem("bookShelf"));
    }
  },
  methods: {
    goToBook(id) {
      this.$router.push({ name: 'book', params: { bookId: id } })
    },
    showHideCheck() {
      // 只有书架中有书籍才能进行管理书籍操作
      if (this.shelfList.length > 0) {
        this.showCheck = true;
      } else {
        this.$toast.fail('未拥有书籍');
      }

      this.showManage = false;
    },
    // 显示管理按钮
    showManageBox() {
      this.showManage = !this.showManage;
    },
    // 关闭勾选
    closeCheck() {
      this.showCheck = false;
    },
    // 展示弹出层
    showPopup() {
      this.showPop = true;
      this.showManage = false;
    },
    // 单选
    checkOne() {
      // 1.查找当前书籍的勾选状态
      // 2.判断当前书籍状态是否为false，如果为false，全选就不能勾选
      for (let i = 0; i < this.shelfList.length; i++) {
        if (!this.shelfList[i].checked) {
          this.AllChecked = false;

          // 终止查找 (找到直接拦截，不用往下执行)
          return;
        }
      }
      //如果查找所有书籍都没有找到false状态的书籍，则全选需要勾选
      this.AllChecked = true;
    },
    // 全选 / 反选
    allCheck() {
      // 获取当前的全选状态
      let allCheckStatus = this.AllChecked;

      // 遍历书架的每一项, 修改checked
      this.shelfList.map(ele => {
        ele.checked = allCheckStatus;
      })
    },
    // 移出书架
    removeBook() {
      // 引入vant的消息通知组件 Notify 是一个函数，调用后会直接在页面中弹出相应的消息提示。
      this.shelfList.map(v => {
        // 有勾选书籍，才进行删除 
        if (v.checked) {
          this.$dialog
            .confirm({
              message: "是否要将勾选的书籍移出书架?",
              theme: "round-button",
              confirmButtonColor: '#B5331D',
              cancelButtonColor: '#222222'
            })
            .then(() => {
              // on confirm
              this.$toast.loading({
                message: '删除中...',
                forbidClick: true,
                duration: 0,
              });

              setTimeout(() => {
                this.$toast.clear()

                let arr = [];

                this.shelfList.map(ele => {
                  ele.checked ? 0 : arr.push(ele);
                })
                this.shelfList = arr;
                // 从本地存储删除该本书
                window.localStorage.setItem("bookShelf", JSON.stringify(this.shelfList));
                // 隐藏管理选项(全选/删除)
                this.showCheck = false;
              }, 800)

            })
            .catch((err) => {
              this.$toast(err);
              this.$toast.clear()
              // on cancel
              console.log("取消移出");
            });
        } else {
          this.$toast('你还未勾选书籍！')
          return
        }
      })
    },
    goToRank() {
      this.$router.push({ name: 'rank' })
    },
    goToCategory() {
      this.$router.push({ name: 'category' })
    }
  },
  components: {
    Empty,
    WhiteSpace,
  }
}
</script>