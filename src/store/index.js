import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 仿照user添加admin和saler的session存储信息，然后在main.js里改认证判断
    user: {
      name: window.sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).name
    },
    saler: {
      name: window.sessionStorage.getItem('saler' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('saler' || '[]')).name
    },
    admin: {
      name: window.sessionStorage.getItem('admin' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('admin' || '[]')).name
    }
  },
  mutations: {
    loginUser (state, user) {
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
    loginSaler (state, saler) {
      state.saler = saler
      window.sessionStorage.setItem('saler', JSON.stringify(saler))
    },
    loginAdmin (state, admin) {
      state.admin = admin
      window.sessionStorage.setItem('admin', JSON.stringify(admin))
    },
    logout (state) {
      if (state.user !== []) {
        console.log(state.user)
        state.user = ''
        window.sessionStorage.removeItem('user')
        state.user = []
      }
      if (state.saler !== []) {
        state.saler = ''
        window.sessionStorage.removeItem('saler')
        state.saler = []
      }
      if (state.admin !== []) {
        state.admin = ''
        window.sessionStorage.removeItem('admin')
        state.admin = []
      }
    }
  }
})
