import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: null // 当前登录用户状态
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    // 修改容器属性必须要用 mutation 函数
    setUser(state, payload) {
      state.user = JSON.parse(payload)

      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
