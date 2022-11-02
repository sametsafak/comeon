import { createStore } from 'vuex'

import memberModule from '@/store/modules/member-module'

export default createStore({
  state: {
    // asideVisible: false,
    sidebarVisible: false,
    sidebarUnfoldable: false,
    theme: localStorage.theme || 'default',
  },
  mutations: {
    TOGGLE_ASIDE(state) {
      state.asideVisible = !state.asideVisible
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    TOGGLE_THEME(state, payload) {
      state.theme = payload.value
      localStorage.theme = payload.value
    },
    TOGGLE_UNFOLDABLE(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    UPDATE_SIDEBAR_VISIBLE(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    memberModule,
  },
})
