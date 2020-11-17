import { getCateList } from '../../util/axios'
const state = {
    cateList: [],
}

const getters = {
    getCateList(state) {
        return state.cateList
    },
}

const mutations = {
    GETCATELIST(state, payload) {
        state.cateList = payload
    },
}

const actions = {
    // 获取所有的商品分类数据
    getCateListAction({ commit }) {
        getCateList({
            istree: true
        }).then(res => {
            if (res.data.code == 200) {
                commit('GETCATELIST', res.data.list)
            }
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
}
