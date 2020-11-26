import Vue from 'vue';
import Vuex from 'vuex';

//导入readModule
import { readModule } from './read_module/index'

Vue.use(Vuex);

// 存储在项目中被认为是全局变量(公共数据)的数据，状态管理机制

export default new Vuex.Store({

    // 模块化
    modules: {

        // 阅读模块
        readModule,
    }


})