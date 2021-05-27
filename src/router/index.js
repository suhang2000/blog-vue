import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import ResetPassword from '../components/user/resetPassword'
import EmailVerify from '../components/user/emailVerify'
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
import Report from '../components/user/common/Report'

import UserInfo from '../components/user/common/UserInfo'

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
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/emailVerify/',
      name: 'EmailVerify',
      component: EmailVerify
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
          component: Index
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
          path: '/home/userinfo',
          name: 'UserInfo',
          component: UserInfo,
          meta: {
            requireAuth: true
          }
        }
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
          component: AddUser,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/Fixadmin',
          name: 'Fixadmin',
          component: Fixadmin,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/Selectreport',
          name: 'Selectreport',
          component: Selectreport,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/Selectarticle',
          name: 'Selectarticle',
          component: Selectarticle,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/Selectreport/detail',
          name: 'Detail',
          component: Detail,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/admin/Fixuser',
      name: 'Fixuser',
      component: Fixuser,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/admin/Fixarticle',
      name: 'Fixarticle',
      component: Fixarticle,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/admin/showarticle',
      name: 'showarticleadmin',
      component: blogshow,
      meta: {
        requireAuth: true
      }
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
    },
    {
      path: '/home/showarticle/Report',
      name: 'Report',
      component: Report,
      meta: {
        requireAuth: true
      }
    }
  ]
})
