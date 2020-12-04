
import { createStore } from 'vuex'
const Store = require('electron-store')

const store = createStore({
  state() {
    return {
      config: {},
      firstLoad: {},
    }
  },
  mutations: {
    setConfig(state, payload) {
      state.config = payload;
    },
    updateFirtsLoad(state, payload) {
      state.firstLoad = payload;
    }
  }
})

const persistentSotrage = new Store();

export { 
  store,
  persistentSotrage
};