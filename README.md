# shiguang-reader

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 遇到问题
+ 分类页面的数据渲染做了本地存储，两个小时之后会过期，再请求数据

   expire: Date.now() + 2 * 60 * 60 * 1000,  // 2小时

+ 对于分类下的子分类,要根据是男生还是女生进行判断,有些是没有数据的，要进行筛选

  解决：Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组,构造男女生分类的对象，props传递，再进行请求数据渲染

+ 按钮切换男女分类，一开始是写在同一个页面，发现可以切换但是数据没有发生改变

  解决：按钮写了一个组件，用$emit事件解决, changeSex(性别) male female 判断性别请求数据, 

+ 排行榜单的数据请求，默认请求第一个榜单(每个榜单有唯一的rankid)，通过watch监听rankid,当rankid发生改变之后，再请求对应的数据

+ 记录上次看的章节，通过记录书籍的bookid,link,index在本地存储

    解决：beforeRouteLeave实现, 路由组件离开之前执行, next()控制路由是否允许通过

   （1）当进入看书页面的时候判断是否存在recordChapter(记录书籍的数组)，存在就取对应的书籍数据请求，不存在就请求第一次进入的数据
        1.当一本书籍已经存储过了，下一次看了之后就把下一次离开之后的数据对象替换上一次的数据
   （2）如果根本不存在recordChapter(记录书籍的数组)，直接请求第一次进入的数据

### 管理
+  部分组件使用vant框架，对组件进行管理 vant.config.js , main.js 引入

+  接口api的管理, 设置axios.defaults.baseURL基础路径, api.js进行接口管理, vue-axios请求数据

