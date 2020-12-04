
import { createStore } from 'vuex'
const Store = require('electron-store')

const store = createStore({
  state() {
    return {
      config: {},
      user: {}
    }
  },
  mutations: {
    setConfig(state, payload) {
      state.config = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  }
})

const persistentSotrage = new Store();

export { 
  store,
  persistentSotrage
};