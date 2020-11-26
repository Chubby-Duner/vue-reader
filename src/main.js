import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入vant框架
import VantConfig from './vant.config' 

import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 导入rem适配文件
import 'lib-flexible/flexible'
// 原型(new(创建实例) 的时候会继承该属性或者方法)
Vue.prototype.axios = axios;
// 设置基础路径
axios.defaults.baseURL = "http://novel.kele8.cn"

Vue.config.productionTip = false

// 使用vant
Vue.use(VantConfig)

// axios
Vue.use(VueAxios, axios)

// 全局过滤器   
// (人气)
Vue.filter('setLatelyFollower', latelyFollower => {
    return latelyFollower < 10000 ?
        latelyFollower :
        (latelyFollower / 10000).toFixed(1) + "万";
})

// (留存率)
Vue.filter('setRetentionRatio', retentionRatio => {
    return parseFloat(retentionRatio).toFixed(1);
})

// (书籍图片)
Vue.filter('setCover', cover => {
    let staticPath = "http://statics.zhuishushenqi.com";
    if (cover.indexOf(staticPath) > -1) {
        return cover;
    }
    return staticPath + cover;
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')