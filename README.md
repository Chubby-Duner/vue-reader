# vue-reader

## 项目运行
```
# 克隆到本地
git clone https://github.com/Aiqizai/vue-reader.git

# 进入文件夹
cd vue-reader

# 安装依赖
npm install 或 yarn(推荐)

# 开启本地服务器localhost:8088
npm run dev

# 发布环境
npm run build
```


### 项目描述
```
这是一款提供海量免费小说的阅读神器，想看什么就搜什么，还有书架,阅读历史等功能。
```

### 实现的功能
```
1、男女生专场小说

2、小说人气，读者留存率，日更新字数，热门书评等书籍详情

3、阅读小说，跳章节阅读，更换皮肤，伸缩字体，听书功能，记录阅读章节和阅读历史

4、追书最热榜，好评榜，热搜榜等榜单

5、玄幻，武侠，现代言情等分类小说，每个分类还有自己的子分类

6、将自己喜欢的书籍加入书架，方便之后阅读，查询阅读历史记录

```
### 主要技术栈 vue-cli + vue-router + axios + vuex + es6 + sass + Vant

### 技术要点
```
1、使用Vue-cli搭建页面，部分组件使用Vant UI框架

2、Vue数据驱动DOM渲染

3、使用Vue-router设置路由，进行页面跳转

4、使用axios发送数据请求 

5、使用Web Speech API 实现听书功能

6、使用Vuex实现小说换肤和伸缩字体功能

7、使用ES6语法和sass进行代码的编写

8、localStorage实现数据持久化

9、使用postcss-pxtorem 和 lib-flexible 进行rem适配
```

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
