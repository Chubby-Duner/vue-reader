<template>
  <div :class="['read-content', skinColor, { night: nightMode }]">
    <!-- 引导页(第一次进入时显示) -->
    <div class="guide-page clearfix" v-if="isShowGuide">
      <div></div>
      <div class="menu-control">
        <div class="text-box">呼出菜单</div>
      </div>
      <div class="right-box">
        <div class="close-guide" @click="closeGuide">关闭引导页</div>
      </div>
    </div>
    <!-- 中心控制区域,控制设置选项的显示隐藏 -->
    <div class="read-action-mid" @click="showOpt"></div>
    <!-- 回到顶部 -->
    <i class="icon-back-top" @click="backtop" v-show="backTopShow"
      ><i class="path1"></i
    ></i>
    <!-- 头部返回栏 -->
    <div class="read-content-header" :class="{ 'read-opt': isshowOpt }">
      <i class="icon-back" @click="$router.back()"></i>
      <i class="icon-listen" @click="showSpeak"></i>
      <i class="icon-options" @click="ShowOpts"></i>
    </div>
    <!-- 文章内容 -->
    <div class="read-article-content">
      <!-- 书名 -->
      <h4 :class="['book-title', skinColor, { night: nightMode }]">
        {{ this.title }}
      </h4>
      <div class="content-list">
        <h3>{{ chapterTitle }}</h3>
        <!-- <div v-if="isCartoon">
          <img
            :src="item"
            alt=""
            v-for="(item, index) in cpContent"
            :key="index"
          />
        </div> -->
        <!-- <div v-else> -->
        <p
          :style="{ fontSize: fontSize + 'px' }"
          v-for="(item, index) in cpContent"
          :key="index"
        >
          {{ item }}
        </p>
        <!-- </div> -->
      </div>
      <!-- 加载下一章按钮 -->
      <button
        class="nextChapter"
        @click="nextChapter"
        v-if="this.cpContent.length > 0"
      >
        加载下一章
      </button>
    </div>
    <!-- 弹出层 字体，换肤  -->
    <div class="read-content-set" :class="{ 'read-opt': isShowSet }">
      <!-- 背景换肤 -->
      <ul class="read-setbg-list">
        <li
          class="setbg-item"
          v-for="(item, index) in skinBgList"
          :key="index"
          @click="changeBgColor(item)"
        >
          <span :class="[item, { active: item === skinColor }]">
            <i class="icon-check icon" v-if="item === skinColor"></i>
          </span>
        </li>
      </ul>
      <!-- 字体设置 -->
      <div class="read-setsize">
        <!-- 减小 -->
        <div class="read-setsize-item">
          <span
            :class="{ nochange: fontSize <= 10 }"
            @click="changeFontSize(false)"
            ><i class="icon-reduce-size"></i
          ></span>
        </div>
        <span class="showSize">{{ fontSize }}</span>
        <!-- 增加 -->
        <div class="read-setsize-item"> 
          <span
            :class="{ nochange: fontSize >= 24 }"
            @click="changeFontSize(true)"
            ><i class="icon-increase-size"></i
          ></span>
        </div>
      </div>
    </div>
    <!-- 语音播放 -->
    <div class="speak-box" :class="{ 'read-opt': isShowSpeak }">
      <!-- <div class="title">语音阅读</div> -->
      <div class="speak-item">
        <div class="start" @click="handleSpeak(speakContent)">开始</div>
        <div class="pause" @click="pauseKeepHandle">
          {{ pauseOrkeep ? "继续" : "暂停" }}
        </div>
        <div class="keepgo" @click="resetSpeak">重置</div>
      </div>
      <div class="time-list">
        <div class="text">定时:</div>
        <div class="five-min">5分</div>
        <div class="fifty-min">15分</div>
        <div class="thirty-min">30分</div>
        <div class="sixty-min">60分</div>
      </div>
      <div class="quit-speak" @click="stopSpeak">关闭朗读模式</div>
    </div>
    <!-- 尾部设置栏 -->
    <div class="read-footer" :class="{ 'read-opt': isshowOpt }">
      <div class="chapters-control">
        <div class="prev-chapter" @click="prevChapter">上一章</div>
        <!-- <van-slider
          v-model="chapterValue"
          bar-height="4px"
          button-size="16px"
          active-color="#B5331D"
          @input="slideHandel"
          class="slider"
        /> -->
        <div class="next-chapter" @click="nextChapter">下一章</div>
      </div>
      <!-- 目录  夜间模式 设置-->
      <ul class="footer-bar">
        <li class="footer-item" @click="ShowCata">
          <span><i class="icon-catalog"></i></span>
          <p class="bar-item">目录</p>
        </li>
        <li class="footer-item" @click="switchMode">
          <template v-if="nightMode">
            <span><i class="icon-sun"></i></span>
            <p class="bar-item">日间模式</p>
          </template> 
          <template v-else>
            <span><i class="icon-moon"></i></span>
            <p class="bar-item">夜间模式</p>
          </template>
        </li>
        <li class="footer-item" @click="ShowSet">
          <span><i class="icon-setting"></i></span>
          <p class="bar-item">设置</p>
        </li>
      </ul>
    </div>
    <!-- 左侧目录弹出层 -->
    <van-popup
      v-model="isShowCata"
      position="left"
      :style="{ width: '80%', height: '100%' }"
    >
      <div class="catelog">
        <div class="catelog-header">
          <h3>{{ this.title }}</h3>
          <div class="action-bar">
            <div class="text fl">目录</div>
            <div class="sort fr">
              <span>{{ isReverse ? "倒序" : "正序" }}</span>
              <span class="icon" @click="reverseChapters">
                <i class="icon-sort"></i>
              </span>
            </div>
          </div>
        </div>
        <ul class="catalog-list">
          <li
            class="catalog-item"
            v-for="(item, index) in Chapters"
            :key="item._id"
            :class="{ active: readIndex === index }"
            @click="getItemContent(item.link, index)"
          >
            {{ item.title }}
            <!-- _id 章节id -->
            <span class="lock-img fr" v-if="item.isVip">
              <img class="auto-img" src="../assets/images/lock.png" alt="VIP" />
            </span>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>

// 网页语音API
// HTML5的Web Speech API

const synth = window.speechSynthesis;
// 创建了一个SpeechSynthesisUtterance对象，该对象的构造可以直接传递要读的内容
const msg = new SpeechSynthesisUtterance();

import '@/assets/scss/readcontent.scss'

import * as api from '@/api/api'

// vuex里导入 mapState mapMutations

// 使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
// import { mapState } from 'vuex';

import {
  setStorage,
  // getStorage
  // delStorage
} from '../assets/js/tool';

export default {
  // 字体大小 , data设置默认字体, 动态绑定style, 本地存储改变后的
  data() {
    return {

      isShowGuide: null,  // 是否显示引导页

      // size: '',

      isshowOpt: false, // 顶部和底部操作栏
      isShowSet: false, // 设置(字体, 换肤)选项
      isShowCata: false,  // 控制目录
      isShowOpts: false, // 控制顶部选项
      titles: '',
      skinBgList: ['skin-default', 'skin-blue',
        'skin-green', 'skin-pink', 'skin-dark', 'skin-light'],
      isAdd: false, // false 减小  true 增加
      data: [], // 章节内容 split字符串切割  。分割

      bookId: '',
      Chapters: [], // 章节列表
      id: '', // 根据书籍源获得id,再获取对应书籍的章节
      link: '', // 获取章节列表中的link字段url进行编码，作为link传入
      readIndex: 0, // 阅读章节的索引,监听索引的变化改变内容
      cpContent: '',  // 章节内容
      readContent: [],  // 存放章节内容和标题的数组
      chapterTitle: '',
      chapterValue: 0,  // 展示章节内容
      chapterId: '',
      isReverse: false, // 是否翻转章节

      // 回到顶部
      //是否显示回到顶部
      backTopShow: false,
      // 返回顶部所需时间
      backSeconds: 30,
      // 往下滑动多少显示返回顶部（单位：px）
      showPx: 200,

      // 用于存放滑块所需的数据
      slideList: [],

      // 记录章节数组(本地存储)
      recordChapterList: [],

      // 语音
      isShowSpeak: false,

      // 合成文字
      speakContent: '',

      // 开始播放 / 继续播放  false 开始  true 继续
      pauseOrkeep: false,

      // 是否是漫画
      isCartoon: false
    }
  },
  computed: {
    // ...mapState([
    //   'nightMode',
    //   'skinColor',
    //   'fontSize'
    // ])

    //访问readModule模块的state
    nightMode() {
      return this.$store.state.readModule.nightMode;
    },
    skinColor() {
      return this.$store.state.readModule.skinColor;
    },
    fontSize() {
      return this.$store.state.readModule.fontSize;
    },
  },
  created() {
    this.bookId = this.$route.params.bookid;
    this.title = decodeURIComponent(this.$route.query.title);

    // 引导页  判断是否存在guideControl
    this.isShowGuide = window.localStorage.getItem('guideControl');

    if (this.isShowGuide) {
      // 存在就下次不显示
      this.isShowGuide = false;
    } else {
      // 不存在就显示, 并存储guideControl, 显示引导页 (第一次进入)
      window.localStorage.setItem('guideControl', 1)
      this.isShowGuide = true;
    }

    // 默认皮肤
    if (!this.skinBgList.includes(this.skinColor)) {
      // this.SET_SKIN_COLOR('skin-default');
      this.$store.dispatch('readModule/SetSkinColor', 'skin-default').then(() => {
        setStorage('SKINCOLOR', 'skin-default');
      })
    }

    // 判断是否要加载上一次离开的章节
    if (window.localStorage.getItem("recordChapter")) {
      this.recordChapterList = JSON.parse(window.localStorage.getItem("recordChapter"));
      // console.log(this.recordChapterList.length, 'this.recordChapterList');

      for (let i = 0; i < this.recordChapterList.length; i++) {
        // console.log(this.recordChapterList[i]);
        if (this.recordChapterList[i].bookId === this.bookId) {
          // 书源
          api.getBookSources(this.recordChapterList[i].bookId).then(res => {
            this.id = res.data[0]._id;
            // 2.根据书籍源id获取章节
            api.getChapterContent(encodeURIComponent(this.recordChapterList[i].link)).then(res => {
              this.cpContent = res.data.chapter.isVip ? ['vip章节，请到正版网站阅读'] : res.data.chapter.codeStatus === 0 ? ['请安装最新版追书以便使用优质资源'] : res.data.chapter.cpContent.split('\n');
              this.chapterTitle = res.data.chapter.title;
              this.speakContent = res.data.chapter.cpContent;
            })
          })

          this.getItemContent(this.recordChapterList[i].link, this.recordChapterList[i].index)
          // break;
        } else {
          // console.log('本书没有记录章节');
          this.getSource()
          // break;
        }
      }
    } else if (!window.localStorage.getItem("recordChapter")) {
      this.getSource()
    }
  },
  mounted() {
    // 滚动条的获取
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    /* 
      <!-- encodeURIComponent() url编码 -->
      <!-- decodeURIComponent() url解码 -->
    */

    //将mutation里的方法映射到该组件内
    //等同于this.$store.commit('SET_NIGHT_MODE') 
    // ...mapMutations([
    //   'SET_NIGHT_MODE',
    //   'SET_SKIN_COLOR',
    //   'SET_FONT_SIZE',
    // ]),

    // 关闭引导页
    closeGuide() {
      this.isShowGuide = false;
    },

    // 控制目录显示隐藏
    ShowCata() {
      this.isShowCata = !this.isShowCata;
    },
    // 控制顶部选项
    ShowOpts() {
      this.isShowOpts = !this.isShowOpts;
    },
    // 显示(字体, 换肤)选项
    ShowSet() {
      this.isShowSet = true;
    },
    // 控制设置选项显示隐藏
    showOpt() {
      if (this.isshowOpt || this.isShowSet || this.isShowSpeak) {
        this.isshowOpt = this.isShowSet = this.isShowSpeak = false;
      } else {
        this.isshowOpt = true;
      }
    },
    //显示语音设置
    showSpeak() {
      this.isShowSpeak = !this.isShowSpeak;
      this.isshowOpt = false;
    },
    // 反转章节
    reverseChapters() {
      this.Chapters.reverse();
      this.isReverse = !this.isReverse;
    },
    // 切换日夜间模式
    switchMode() {
      this.isshowOpt = false;
      this.isShowSet = false;
      //由于上一步已经将mutation映射到组件内，所以组件可以直接调用SET_NIGHT_MODE
      // this.SET_NIGHT_MODE(!this.nightMode);
      this.$store.dispatch('readModule/SetNightMode', !this.nightMode).then(() => {
        //存储当前设置的值
        setStorage('NIGHTMODE', this.nightMode);
      })
    },
    // 切换皮肤
    changeBgColor(skin) {
      // 
      // this.SET_NIGHT_MODE(false);
      // this.SET_SKIN_COLOR(skin);
      // 关闭夜间模式
      this.$store.dispatch('readModule/SetNightMode', false).then(() => {
        setStorage('NIGHTMODE', this.nightMode);
      })
      // 设置背景色
      this.$store.dispatch('readModule/SetSkinColor', skin).then(() => {
        setStorage('SKINCOLOR', skin);
      })

    },
    // 更改字体
    changeFontSize(isAdd) {
      // 最大字体 
      if (this.fontSize >= 30 && isAdd) {
        this.$toast({
          message: '字体已经最大啦~',
          position: 'top',
        });
        return;
      }
      // 最小字体
      if (this.fontSize <= 10 && !isAdd) {
        this.$toast({
          message: '字体已经最小啦~',
          position: 'top',
        });
        return;
      }
      let size = this.fontSize;
      isAdd ? size++ : size--
      // this.SET_FONT_SIZE(size);
      this.$store.dispatch('readModule/SetFontSize', size).then(() => {
        setStorage('FONTSIZE', size);
      })
    },

    // 1. 获取书籍源 
    // 2. 根据书籍源id获取章节
    // 3. 根据章节获取内容

    getSource() {
      // 1.获取书籍源 
      api.getBookSources(this.bookId).then(res => {
        // console.log(res)
        // console.log(this.readIndex, 'readindex');
        this.id = res.data[0]._id;
        // 2.根据书籍源id获取章节
        this.getChapters(this.id)
      }).catch((error) => {
        this.$toast.clear();
        this.$toast(error);
      });
    },
    // 2.根据书籍源id获取章节
    getChapters(id) {
      this.$toast.loading({
        message: '飞速加载...',
        forbidClick: true,
        duration: 0,
      });
      api.getBookChapters(id).then(res => {
        // console.log(res)
        this.Chapters = res.data.chapters;
        // console.log(this.Chapters, '章节列表')
        this.link = this.Chapters[this.readIndex].link;
        // this.chapterId = this.Chapters[this.readIndex]._id;
        // console.log(this.link);

        this.getChapterContent(this.link)
      }).catch((error) => {
        this.$toast.clear();
        this.$toast(error);
      });
    },
    // 3. 根据章节获取内容
    getChapterContent(link) {
      this.$toast.loading({
        message: '飞速加载...',
        forbidClick: true,
        duration: 0,
      });

      api.getChapterContent(encodeURIComponent(link)).then(res => {

        // console.log(res, '章节内容');
        // console.log(res.data.chapter.isVip);
        // cpContent  内容
        // isVip 是否vip
        // console.log(res.data.chapter.cpContent,'****');
        this.cpContent = res.data.chapter.isVip ? ['vip章节，请到正版网站阅读'] : res.data.chapter.codeStatus === 0 ? ['请安装最新版追书以便使用优质资源'] : res.data.chapter.cpContent.split('\n');
        // console.log(this.cpContent,'this.cpContent')

        // this.data = this.cpContent.split('\n');
        this.chapterTitle = res.data.chapter.title;
        // console.log(this.data);
        this.speakContent = res.data.chapter.cpContent;

        this.$nextTick(() => {
          this.$toast.clear()
        })
      }).catch((error) => {
        this.$toast.clear();
        this.$toast(error);
      });
    },
    getItemContent(link, index) {
      this.$toast.loading({
        message: '飞速加载...',
        forbidClick: true,
        duration: 0,
      });

      api.getChapterContent(encodeURIComponent(link)).then(res => {
        this.$toast.clear()
        // cpContent  内容
        // isVip 是否vip
        this.cpContent = res.data.chapter.isVip ? ['vip章节，请到正版网站阅读'] : res.data.chapter.codeStatus === 0 ? ['请安装最新版追书以便使用优质资源'] : res.data.chapter.cpContent.split('\n');

        this.chapterTitle = res.data.chapter.title;

        this.speakContent = res.data.chapter.cpContent;

        this.isShowCata = false;
        this.isshowOpt = false;
        // 重置index
        this.readIndex = index;
        // 重置章节
        this.link = link;
        // console.log(this.readIndex,'目录');

      }).catch((err) => {
        this.$toast.clear()
        this.$toast(err);
      }
      )
    },
    // 加载上一章
    prevChapter() {
      if (this.readIndex === 0) {
        this.$toast('已经是第一章啦！')
        return;
      }
      this.readIndex--;
      // console.log(this.readIndex);
      this.getSource();
      this.stopSpeak();
    },
    // 加载下一章
    nextChapter() {
      if (this.readIndex === this.Chapters.length - 1) {
        this.$toast('已经是最后一章啦！')
        return;
      }
      this.readIndex++;
      // console.log(this.readIndex);
      this.getSource();
      this.stopSpeak();
      // let osTop = document.documentElement.scrollTop || document.body.scrollTop;
    },
    // 滚动事件
    handleScroll() {
      // console.log(document.body.clientHeight,'屏幕高度')
      // let height = document.body.clientHeight;
      //  获取滚动距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // let windowHeight = document.documentElement.clientHeight || document.body.clientHeight; 
      // let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 判断显示隐藏按钮
      if (scrollTop > this.showPx) {
        this.backTopShow = true;
      } else if (scrollTop < this.showPx) {
        this.backTopShow = false;
      }
    },
    //返回顶部
    backtop() {
      var timer = setInterval(() => {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, this.backSeconds)
    },
    // 记录章节
    recordChapter(next) {
      // 记录阅读章节，下次点击加载上一次看的章节
      // 判断是否是同一本书,是的话就覆盖link

      // setItem（）设置新值 ?
      let storage = window.localStorage.getItem("recordChapter");
      storage = storage ? JSON.parse(storage) : [];
      // 判断是否是同一本书
      let isExist = false;
      for (let i = 0; i < storage.length; i++) {
        if (storage[i].bookId === this.bookId) {
          isExist = true;
          // 替换原有数据
          storage[i].link = this.link;
          storage[i] = { bookId: this.bookId, link: storage[i].link, index: this.readIndex };
          // 覆盖
          window.localStorage.setItem("recordChapter", JSON.stringify(storage));
          this.stopSpeak();
          next();
        }
      }
      if (!isExist) {
        // 如果本书没有加入就推新的数据
        storage.push({ bookId: this.bookId, link: this.link, index: this.readIndex });
        window.localStorage.setItem("recordChapter", JSON.stringify(storage));
        this.stopSpeak();
        next();
      }
    },
    // 添加阅读历史
    addHistoryRead(next) {
      let storage = window.localStorage.getItem("recordHistory");
      storage = storage ? JSON.parse(storage) : [];

      // 获取离开的时间
      let nowData = new Date();
      let timeString = nowData.toLocaleDateString() + ' ' + nowData.toTimeString();
      let time = timeString.slice(0, 20);
      console.log('离开时间 --> ', time);

      // 判断是否是同一本书
      let isExist = false;
      for (let i = 0; i < storage.length; i++) {
        if (storage[i].bookId === this.bookId) {
          isExist = true;
          // 替换原有数据
          storage[i].chapter = this.chapterTitle;
          storage[i] = { bookId: this.bookId, chapter: storage[i].chapter, time };
          // 覆盖
          window.localStorage.setItem("recordHistory", JSON.stringify(storage));
          this.stopSpeak();
          next();
        }
      }
      if (!isExist) {

        // 如果本书没有加入就推新的数据
        storage.push({ bookId: this.bookId, chapter: this.chapterTitle, time });
        window.localStorage.setItem("recordHistory", JSON.stringify(storage));
        this.stopSpeak();
        next();
      }
    },
    // 语音合成
    handleSpeak(text) {
      msg.text = text;
      msg.lang = 'zh-CN';
      msg.volume = '1';
      msg.rate = 1;
      msg.pitch = 1;
      synth.speak(msg);
    },
    // 暂停播放 / 继续播放
    pauseKeepHandle(e) {
      msg.text = e;
      msg.lang = 'zh-CN';
      if (!this.pauseOrkeep) {
        // 暂停播放
        synth.pause(msg);
        this.pauseOrkeep = true;
      } else {
        // 继续播放
        synth.resume(msg);
        this.pauseOrkeep = false;
      }
    },
    // 关闭阅读
    stopSpeak(e) {
      msg.text = e;
      msg.lang = 'zh-CN';
      synth.cancel(msg);
      this.pauseOrkeep = false;
      this.isShowSpeak = false;
    },
    // 重置阅读
    resetSpeak(e) {
      this.$toast.loading({
        message: '重置中...',
        forbidClick: true,
        duration: 0,
      });

      msg.text = e;
      msg.lang = 'zh-CN';
      setTimeout(() => {
        synth.cancel(msg);
        this.pauseOrkeep = false;
        this.$toast.clear();
      }, 800);
    }
  },
  beforeRouteLeave(to, from, next) {
    // console.log('to ==>', to);
    // console.log('from ==>', from);
    // console.log(this.link, this.bookId);

    // 记录章节
    this.recordChapter(next);

    // 添加阅读历史
    this.addHistoryRead(next);
  }
}
</script>