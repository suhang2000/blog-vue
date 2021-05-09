import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import PwdReset from '../components/pwdReset'

import AdminIndex from '../components/admin/AdminIndex'
import AdminDashboard from '../components/admin/function/dashbordIndex'
import OrderManage from '../components/admin/function/OrderManage'
import ProductManage from '../components/admin/function/ProductManage'
import SalerManage from '../components/admin/function/SalerManage'
import UserManage from '../components/admin/function/UserManage'
import AdminManage from '../components/admin/function/AdminManage'
import AdminRegister from '../components/admin/function/AdminRegister'
import AdminPwdReset from '../components/admin/function/AdminPwdReset'

import SalerIndex from '../components/saler/SalerIndex'
import SalerDashboard from '../components/saler/function/dashboardIndex'
import SalerInfo from '../components/saler/function/SalerInfo'
import SalerOrder from '../components/saler/function/SalerOrder'
import SalerProduct from '../components/saler/function/SalerProduct'
import SalerRegister from '../components/saler/SalerRegister'

import UserRegister from '../components/user/UserRegister'
import Home from '../components/user/Home'
import Index from '../components/user/common/Index'
import Cart from '../components/user/common/Cart'
import Order from '../components/user/common/Order'
import UserInfo from '../components/user/common/UserInfo'
import OrderToPay from '../components/user/common/OrderToPay'
import OrderToSend from '../components/user/common/OrderToSend'

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
      path: '/register/saler',
      name: 'SalerRegister',
      component: SalerRegister
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/index',
      children: [
        {
          path: '/home/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/home/cart',
          name: 'Cart',
          component: Cart,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/order',
          name: 'Order',
          component: Order,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/orderToPay',
          name: 'OrderToPay',
          component: OrderToPay,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/orderToSend',
          name: 'OrderToSend',
          component: OrderToSend,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/home/userInfo',
          name: 'UserInfo',
          component: UserInfo,
          meta: {
            requireAuth: true
          }
        }
      ]
    },

    {
      path: '/saler',
      name: 'Saler',
      component: SalerIndex,
      redirect: '/saler/dashboard',
      // meta: {
      //   requireAuth: true
      // },
      children: [
        {
          path: '/saler/dashboard',
          name: 'Dashboard',
          component: SalerDashboard,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/saler/order',
          name: 'SalerOrder',
          component: SalerOrder,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/saler/product',
          name: 'SalerProduct',
          component: SalerProduct,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/saler/salerinfo',
          name: 'SalerInfo',
          component: SalerInfo,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      redirect: '/admin/dashboard',
      // meta: {
      //   requireAuth: true
      // },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: AdminDashboard,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/product',
          name: 'ProductManage',
          component: ProductManage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/user',
          name: 'UserManage',
          component: UserManage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/saler',
          name: 'SalerManage',
          component: SalerManage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/order',
          name: 'OrderManage',
          component: OrderManage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/admininfo',
          name: 'AdminManage',
          component: AdminManage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/register',
          name: 'AdminRegister',
          component: AdminRegister,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/pwdreset',
          name: 'AdminPwdReset',
          component: AdminPwdReset,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
