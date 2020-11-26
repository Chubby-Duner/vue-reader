export const actions = {
    // 提交mutations，提交完成之后进行本地存储

    InitState({ commit }, state) {
        commit('InitState', state)
    },

    SetNightMode({ commit }, isNight) {
        commit('SetNightMode', isNight)
    },

    SetSkinColor({ commit }, skinColor) {
        commit('SetSkinColor', skinColor)
    },

    SetFontSize({ commit }, fontSize) {
        commit('SetFontSize', fontSize)
    }
}