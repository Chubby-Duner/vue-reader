import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

//收编 state, getters, mutations, actions, 然后统一导出
export const readModule = {
    //命名空间
    namespaced: true,

    state,
    getters,
    mutations,
    actions
}