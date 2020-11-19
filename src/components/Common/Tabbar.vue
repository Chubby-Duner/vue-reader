<template>
  <!-- 底部导航栏 -->
  <div class="tab-bar">
    <router-link to="/bookshelf" class="tab-item">
      <div class="tab-item-icon">
        <!-- icon图标 -->
        <i class="icon-bookshelf icon"></i>
      </div>
      <p class="tab-item-label">书架</p>
    </router-link>
    <router-link to="/" class="tab-item">
      <div class="tab-item-icon"> 
        <!-- icon图标 -->
        <i class="icon-bookstore icon"></i>
      </div>
      <p class="tab-item-label">书城</p>
    </router-link>
    <router-link to="/category" class="tab-item">
      <div class="tab-item-icon">
        <!-- icon图标 -->
        <i class="icon-category icon"></i>
      </div>
      <p class="tab-item-label">分类</p>
    </router-link>
    <router-link to="/rank" class="tab-item">
      <div class="tab-item-icon">
        <!-- icon图标 -->
        <i class="icon-rank icon"></i>
      </div>
      <p class="tab-item-label">排行</p>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  width: 100vw;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  .tab-item {
    display: block;
    flex: 1;
    padding: 10px 0;
    text-align: center;

    &.exact{
      color: #e4393c;
    }

    &.exact .icon::before {
      color: #e4393c;
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