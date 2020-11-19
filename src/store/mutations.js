import {
    INIT_STATE,
    SET_NIGHT_MODE,
    SET_SKIN_COLOR,
    SET_FONT_SIZE,
} from './mutation-types';
 
import {
    setStorage,
    getStorage
    // delStorage
} from '../assets/js/tool';


export default {
    [INIT_STATE](state) {
        state.nightMode = setStorage('NIGHTMODE') === 'true' ? true : false;
        // Number.isInteger() 判断是否为整数
        state.fontSize = Number.isInteger(getStorage('FONTSIZE')) ? parseInt(getStorage('FONTSIZE')) : 14;
        state.skinColor = getStorage('SKINCOLOR');
    },

    [SET_NIGHT_MODE](state, isNight) {
        state.nightMode = isNight;
        setStorage('NIGHTMODE', state.nightMode);
    },

    [SET_SKIN_COLOR](state, skinColor) {
        state.skinColor = skinColor;
        setStorage('SKINCOLOR', state.skinColor);
    },

    [SET_FONT_SIZE](state, fontSize) {
        state.fontSize = fontSize;
        setStorage('FONTSIZE', state.fontSize);
    },

}