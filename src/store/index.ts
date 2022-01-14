import Vue from 'vue'
import Vuex from 'vuex'
import { getUserPermissions } from '@/services/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: null // 当前登录用户状态
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    menuList: [],
    resourceList: []
  },
  mutations: {
    // 修改容器属性必须要用 mutation 函数
    setUser(state, payload) {
      state.user = JSON.parse(payload)

      window.localStorage.setItem('user', payload)
    },
    SET_MENU_LIST(state, payload) {
      state.menuList = payload
    },
    SET_RESOURCE_LIST(state, payload) {
      state.resourceList = payload
    }
  },
  actions: {
    async getUserPermissons({ commit }) {
      const { data } = await getUserPermissions()
      commit('SET_MENU_LIST', data.content.menuList)
      commit('SET_RESOURCE_LIST', data.content.resourceList)
      return data.content
    }
  },
  modules: {
  }
})
