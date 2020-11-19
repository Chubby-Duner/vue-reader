<template>
  <div class="empty">
    <router-link to="/">
      <div class="empty-icon">
        <i class="icon-add-book"></i>
      </div>
      <p class="empty-tip">快去添加你的小说吧</p>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  a {
    display: block;
    text-align: center;
    margin-top: -50px;
  }

  .empty-icon {
    font-size: 80px;
    color: #ccc;
  }

  .empty-tip {
    margin-top: 10px;
    color: #999;
  }
}
</style>