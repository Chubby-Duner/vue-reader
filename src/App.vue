<template>
  <div id="app">
    <!-- 当我们的浏览地址改变的时候，这里的key值监听到改变，会自动的刷新页面，
    而且，页面刷新的时间基本没有，特别的流畅 -->
    <router-view :key="$route.fullPath" />
  </div>
</template> 

<style>
html {
  overflow: hidden;
  overflow-y: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* min-height: 100vh; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.auto-img {
  width: 100%;
  height: 100%;
  display: block;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

</style>
