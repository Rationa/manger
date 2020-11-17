import { getAdminList, getAdminListTotal } from '../../util/axios'
const state = {
    adminList: [],
    total: 0,
}

const getters = {
    getAdminList(state) {
        return state.adminList
    },
    getAdminTotal(state) {
        return state.total
    }
}

const mutations = {
    GETADMIN(state, payload) {
        state.adminList = payload
    },
    GETADMINTOTAL(state, payload) {
        state.total = payload
    }
}

const actions = {
    // 获取所有的管理员分页数据
    getAdminListAction({ commit }, params) {
        getAdminList(params).then(res => {
            if (res.data.code == 200) {
                commit('GETADMIN', res.data.list)
            }
        })
    },
    // 获取所有的管理员数据
    getAdminListTotalAction({ commit }) {
        getAdminListTotal().then(res => {
            if (res.data.code == 200) {
                commit('GETADMINTOTAL', res.data.list[0].total)
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
