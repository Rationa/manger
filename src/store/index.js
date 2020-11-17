
//引入核心库
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//调用vuex插件
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import admin from './modules/admin'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'

//导出实例化的仓库
export default new Vuex.Store({
    modules:{
        menu,
        role,
        admin,
        specs,
        cate,
        goods,
        member,
        banner,
        seck
    }
})