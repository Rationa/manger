import {getMemberList} from '../../util/axios'
const state = {
    MemberList: []
}

const getters = {
    getMemberList(state) {
        return state.MemberList
    }
}

const mutations = {
    GETMEMBER(state, payload) {
        state.MemberList = payload
    }
}

const actions = {
    getMemberListAction({ commit }) {
        getMemberList().then(res => {
            if (res.data.code == 200) {
                commit('GETMEMBER', res.data.list)
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
