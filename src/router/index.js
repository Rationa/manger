import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export let homerouter = [
  {
    path: '/menu',
    component: () => import('../components/views/menu/menu'),
    name: '菜单管理'
  },
  {
    path: '/role',
    component: () => import('../components/views/role/role'),
    name: '角色管理'
  },
  {
    path: '/admin',
    component: () => import('../components/views/manger/admin'),
    name: '管理员管理'
  },
  {
    path: '/cate',
    component: () => import('../components/views/cate/cate'),
    name: '商品分类'
  },
  {
    path: '/specs',
    component: () => import('../components/views/specs/specs'),
    name: '商品规格'
  },
  {
    path: '/goods',
    component: () => import('../components/views/goods/goods'),
    name: '商品管理'
  },
  {
    path: '/member',
    component: () => import('../components/views/member/member'),
    name: '会员管理'
  },
  {
    path: '/banner',
    component: () => import('../components/views/banner/banner'),
    name: '轮播图管理'
  },
  {
    path: '/seck',
    component: () => import('../components/views/seck/seck'),
    name: '活动管理'
  }
]

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../components/pages/login')
    },
    {
      path: '/index',
      component: () => import('../components/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('../components/views/home'),
          name: '首页'
        },
        ...homerouter
      ]
    }
  ]
})
