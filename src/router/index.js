import Vue from 'vue'
import Router from 'vue-router'

import Store from '../store'

Vue.use(Router)

function hasUrl(url) {
  return Store.state.userinfo.menus_url.some(item => item == url)
}

export let homerouter = [
  {
    path: '/menu',
    component: () => import('../components/views/menu/menu'),
    name: '菜单管理',
    beforeEnter(to, from, next) {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('../components/views/role/role'),
    name: '角色管理',
    beforeEnter(to, from, next) {
      hasUrl('/role') ? next() : next('/role')
    }
  },
  {
    path: '/admin',
    component: () => import('../components/views/manger/admin'),
    name: '管理员管理',
    beforeEnter(to, from, next) {
      hasUrl('/admin') ? next() : next('/admin')
    }
  },
  {
    path: '/cate',
    component: () => import('../components/views/cate/cate'),
    name: '商品分类',
    beforeEnter(to, from, next) {
      hasUrl('/cate') ? next() : next('/cate')
    }
  },
  {
    path: '/specs',
    component: () => import('../components/views/specs/specs'),
    name: '商品规格',
    beforeEnter(to, from, next) {
      hasUrl('/specs') ? next() : next('/specs')
    }
  },
  {
    path: '/goods',
    component: () => import('../components/views/goods/goods'),
    name: '商品管理',
    beforeEnter(to, from, next) {
      hasUrl('/goods') ? next() : next('/goods')
    }
  },
  {
    path: '/member',
    component: () => import('../components/views/member/member'),
    name: '会员管理',
    beforeEnter(to, from, next) {
      hasUrl('/member') ? next() : next('/member')
    }
  },
  {
    path: '/banner',
    component: () => import('../components/views/banner/banner'),
    name: '轮播图管理',
    beforeEnter(to, from, next) {
      hasUrl('/banner') ? next() : next('/banner')
    }
  },
  {
    path: '/seck',
    component: () => import('../components/views/seck/seck'),
    name: '活动管理',
    beforeEnter(to, from, next) {
      hasUrl('/seck') ? next() : next('/seck')
    }
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
    },
    {
      //重定向
      path: "*",
      redirect: "/login"
    }
  ]
})
