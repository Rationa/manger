import {getSeckList} from '../../util/axios'
const state = {
    seckList: []
}

const getters = {
    getSeckList(state) {
        return state.seckList
    }
}

const mutations = {
    GETSECK(state, payload) {
        state.seckList = payload
    }
}

const actions = {
    getSeckListAction({ commit }) {
        getSeckList().then(res => {
            if (res.data.code == 200) {
                commit('GETSECK', res.data.list)
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
