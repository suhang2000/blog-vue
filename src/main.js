// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

// 这里要根据admin和saler的具体返回值（名字）来改
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    console.log(to.path)
    let flag = false
    const userPathList = ['/home/cart', '/home/order', '/home/orderToPay', '/home/orderToSend', '/home/userInfo']
    const salerPathList = ['/saler/dashboard', '/saler/order', '/saler/product', '/saler/salerinfo']
    const adminPathList = ['/admin/dashboard', '/admin/product', '/admin/user', '/admin/saler', '/admin/order', '/admin/admininfo', '/admin/register', '/admin/pwdreset']
    console.log(userPathList.indexOf(to.path) !== -1 && store.state.user.name !== '')
    console.log(salerPathList.indexOf(to.path) !== -1 && store.state.saler.name !== '')
    console.log(adminPathList.indexOf(to.path) !== -1 && store.state.admin.name !== '')
    if (userPathList.indexOf(to.path) !== -1 && store.state.user.name !== '') {
      console.log('user')
      flag = true
      next()
    }
    if (salerPathList.indexOf(to.path) !== -1 && store.state.saler.name !== '') {
      console.log('saler')
      flag = true
      next()
    }
    if (adminPathList.indexOf(to.path) !== -1 && store.state.admin.name !== '') {
      console.log('admin')
      flag = true
      next()
    }
    if (flag === false) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
    // if (store.state.user.name || store.state.saler.name || store.state.admin.name) {
    //   next()
    // } else {
    //   next({
    //     path: '/login',
    //     query: {redirect: to.fullPath}
    //   })
    // }
  } else {
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
