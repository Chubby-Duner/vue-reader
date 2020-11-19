<template>
  <div class="main">
    <!-- 二级路由 -->
    <div>
      <router-view></router-view>
    </div>

    <!-- tab切换 -->
    <div class="tab-bar">
      <router-link
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.path"
        class="tab-item"
      >
        <div class="tab-item-icon">
          <!-- icon图标 -->
          <i class="icon" :class="item.icon"></i>
        </div>
        <p class="tab-item-label">{{ item.title }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarData: [
        {
          title: '书架',
          path: '/main/bookshelf',
          icon: 'icon-bookshelf1'
        },
        {
          title: '书城',
          path: '/main/bookstore',
          icon: 'icon-bookstore'
        },
        {
          title: '分类',
          path: '/main/category',
          icon: 'icon-category'
        },
        {
          title: '排行',
          path: '/main/rank',
          icon: 'icon-rank'
        },
        {
          title: '我的',
          path: '/main/my',
          icon: 'icon-my'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  .tab-item {
    display: block;
    flex: 1;
    padding: 10px 0;
    text-align: center;

    &.exact {
      color: #00bb86;
    }

    &.exact .icon::before {
      color: #00bb86;
    }
  }
  .tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 4px;

    .icon {
      font-size: 18px;
      color: red;
    }
  }
  .tab-item-label {
    text-align: center;
    font-size: 12px;
  }
}
</style>