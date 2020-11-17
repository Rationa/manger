import {getRoleList} from '../../util/axios'
const state = {
    roleList: []
}

const getters = {
    getRoleList(state) {
        return state.roleList
    }
}

const mutations = {
    GETROLE(state, payload) {
        state.roleList = payload
    }
}

const actions = {
    getRoleListAction({ commit }) {
        getRoleList().then(res => {
            if (res.data.code == 200) {
                commit('GETROLE', res.data.list)
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
