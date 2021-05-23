import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import PwdReset from '../components/pwdReset'
import UserRegister from '../components/user/UserRegister'

import AdminIndex from '../components/admin/AdminIndex'
import Fixuser from '../components/admin/Fixuser'
import Selectuser from '../components/admin/Selectuser'

import AddUser from '../components/admin/AddUser'
import Selectarticle from '../components/admin/Selectarticle'
import Fixarticle from '../components/admin/Fixarticle'
import Fixadmin from '../components/admin/Fixadmin'
import Selectreport from '../components/admin/Selectreport'
import Detail from '../components/admin/Detail'

import Home from '../components/user/Home'
import Index from '../components/user/common/Index'
import blogshow from '../components/user/blogshow'
import Cart from '../components/user/common/Cart'

import OrderToSend from '../components/user/common/OrderToSend'
import UserInfo from '../components/user/UserInfo'
import UserInfo1 from '../components/user/UserInfo1'
import UserInfo2 from '../components/user/UserInfo2'
import UserInfo3 from '../components/user/UserInfo3'

import Page404 from '../components/404'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'whitePage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pwdReset',
      name: 'PwdReset',
      component: PwdReset
    },
    {
      path: '/register/user',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/myblog',
      children: [
        {
          path: '/home/myblog',
          name: 'Myblog',
          component: Index,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/blog',
          name: 'Blog',
          component: Index,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/selectarticle',
          name: 'selectarticle',
          component: Selectarticle,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/fixarticle',
          name: 'fixarticle',
          component: Fixarticle,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/showarticle',
          name: 'showarticle',
          component: blogshow,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/UserInfo1',
          name: 'UserInfo1',
          component: UserInfo1,
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminIndex,
      // meta: {
      //   requireAuth: true
      // },
      children: [
        {
          path: '/admin/Selectuser',
          name: 'Selectuser',
          component: Selectuser,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/AddUser',
          name: 'AddUser',
          component: AddUser
        },
        {
          path: '/admin/Fixadmin',
          name: 'Fixadmin',
          component: Fixadmin
        },
        {
          path: '/admin/Selectreport',
          name: 'Selectreport',
          component: Selectreport,
        },
        {
          path: '/admin/Selectarticle',
          name: 'Selectarticle',
          component: Selectarticle
        },
        {
          path: '/admin/Selectreport/detail',
          name: 'Detail',
          component: Detail
        }
      ]
    },
    {
      path: '/admin/Fixuser',
      name: 'Fixuser',
      component: Fixuser
    },
    {
      path: '/admin/Fixarticle',
      name: 'Fixarticle',
      component: Fixarticle
    },
    {
      path: '/admin/showarticle',
      name: 'showarticleadmin',
      component: blogshow
    },
    {
      path: '/404',
      name: '404',
      component: Page404
    },
    {
      path: '*',
      name: '404',
      redirect: '/404'
    }
  ]
})
