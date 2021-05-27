// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:5000/api'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

// 这里要根据admin和saler的具体返回值（名字）来改
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    console.log(to.path)
    let flag = false
    const userPathList = ['/home/myblog', '/home/selectarticle', '/home/fixarticle', '/home/showarticle',
      '/home/userinfo']
    const adminPathList = ['/admin/Selectuser', '/admin/AddUser', '/admin/Fixadmin', '/admin/Selectreport',
      '/admin/Selectarticle', '/admin/Selectreport/detail', '/admin/Fixuser', '/admin/Fixarticle', '/admin/showarticle',
      '/home/showarticle/Report']
    console.log(userPathList.indexOf(to.path) !== -1 && store.state.username !== '')
    console.log((to.path).match('Fixarticle') == 'Fixarticle')
    console.log(adminPathList.indexOf(to.path) !== -1 && store.state.adminid !== '')
    if (userPathList.indexOf(to.path) !== -1 && store.state.username !== '') {
      console.log('user')
      flag = true
      next()
    }
    if ((to.path).match('article') == 'article' && store.state.username !== '') {
      console.log('article')
      flag = true
      next()
    }
    if (adminPathList.indexOf(to.path) !== -1 && store.state.adminid !== '') {
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
    // if (store.state.username || store.state.saler.name || store.state.admin.name) {
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
