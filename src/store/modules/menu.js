// 导入获取菜单数据
import { getMenuList } from '../../util/axios'
const state = {
    menuList: []
}

const getters = {
    getMenuList(state) {
        return state.menuList
    }
}

const mutations = {
    GETMENUL(state, payload) {
        state.menuList = payload
    }
}

const actions = {
    getMenuListAction({ commit }) {
        getMenuList({
            istree: true
        }).then(res => {
            if (res.data.code == 200) {
                commit('GETMENUL', res.data.list)
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
}
