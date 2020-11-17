import { getBannerList } from '../../util/axios'
const state = {
    bannerList: [],
}

const getters = {
    getBannerList(state) {
        return state.bannerList
    },
}

const mutations = {
    GETBANNER(state, payload) {
        state.bannerList = payload
    },
}

const actions = {
    // 获取所有的管理员分页数据
    getBannerListAction({ commit }) {
        getBannerList().then(res => {
            if (res.data.code == 200) {
                commit('GETBANNER', res.data.list)
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
