import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 仿照user添加admin和saler的session存储信息，然后在main.js里改认证判断
    username: window.sessionStorage.getItem('username' || '[]') === null ? '' : JSON.parse(window.sessionStorage.getItem('username' || '[]')),
    // username: JSON.parse(window.sessionStorage.getItem('username')),
    // saler: {
    //   name: window.sessionStorage.getItem('saler' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('saler' || '[]')).name
    // },
    adminid: window.sessionStorage.getItem('adminid' || '[]') === null ? '' : JSON.parse(window.sessionStorage.getItem('adminid' || '[]'))
  },
  mutations: {
    loginUser (state, username) {
      state.username = username
      window.sessionStorage.setItem('username', JSON.stringify(username))
    },
    // loginSaler (state, saler) {
    //   state.saler = saler
    //   window.sessionStorage.setItem('saler', JSON.stringify(saler))
    // },
    loginAdmin (state, adminid) {
      state.adminid = adminid
      window.sessionStorage.setItem('adminid', JSON.stringify(adminid))
    },
    logout (state) {
      if (state.username !== []) {
        window.sessionStorage.removeItem('username')
        state.username = []
      }
      // if (state.saler !== []) {
      //   state.saler = ''
      //   window.sessionStorage.removeItem('saler')
      //   state.saler = []
      // }
      if (state.adminid !== []) {
        window.sessionStorage.removeItem('adminid')
        state.adminid = []
      }
    }
  }
})
