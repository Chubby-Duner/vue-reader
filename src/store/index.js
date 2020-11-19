import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

// 存储在项目中被认为是全局变量(公共数据)的数据，状态管理机制

const state = {
    nightMode: false, //是否夜间模式
    skinColor: '', //阅读页面背景色
    fontSize: 14, //设置页面字体大小
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})