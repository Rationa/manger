import { getGoodsList, getGoodsTotal } from '../../util/axios'
const state = {
    goodsList: [],
    total: 1,
}

const getters = {
    getGoodsList(state) {
        return state.goodsList
    },
    getGoodsTotal(state) {
        return state.total
    }
}

const mutations = {
    GETGOODS(state, payload) {
        state.goodsList = payload
    },
    GETGOODSTOTAL(state, payload) {
        state.total = payload
    }
}

const actions = {
    getGoodsListAction({ commit }, params) {
        getGoodsList(params).then(res => {
            if (res.data.code == 200) {
                commit('GETGOODS', res.data.list)
            }
        })
    },
    // 获取所有的管理员数据
    getGoodsTotalAction({ commit }) {
        getGoodsTotal().then(res => {
            if (res.data.code == 200) {
                commit('GETGOODSTOTAL', res.data.list[0].total)
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
