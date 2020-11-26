import {
    setStorage,
    getStorage
    // delStorage
} from '@/assets/js/tool.js';

export const mutations = {
    // 初始化state数据
    InitState(state) {
        state.nightMode = setStorage('NIGHTMODE') === 'true' ? true : false;
        // Number.isInteger() 判断是否为整数
        state.fontSize = Number.isInteger(getStorage('FONTSIZE')) ? parseInt(getStorage('FONTSIZE')) : 14;
        state.skinColor = getStorage('SKINCOLOR');
    },
    // 夜间模式
    SetNightMode(state, isNight) {
        state.nightMode = isNight;
    },
    // 换肤
    SetSkinColor(state, skinColor) {
        state.skinColor = skinColor;
    },
    // 字体大小
    SetFontSize(state, fontSize) {
        state.fontSize = fontSize;
    }
}