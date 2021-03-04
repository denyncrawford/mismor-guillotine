
import { createStore } from 'vuex'
const { MongoClient } = require('mongodb');
const Store = require('electron-store')

const store = createStore({
  state() {
    return {
      config: {},
      firstLoad: {},
      cardFullView: false,
      adminView: {
        selectedUser: {}
      }
    }
  },
  mutations: {
    setConfig(state, payload) {
      state.config = payload;
    },
    updateFirtsLoad(state, payload) {
      state.firstLoad = payload;
    },
    logOut(state) {
      delete state.config.savedSession
    },
    logIn(state, payload) {
      state.config.savedSession = payload;
    },
    toggleFullViewStatus(state) {
      state.cardFullView = !state.cardFullView
    },
    selectUser(state, payload) {
      state.adminView.selectedUser = payload;
    }
  }
})

const persistentSotrage = new Store();

let database;

const connect = async (databaseName) => {
  if (database) return database;
  const client = new MongoClient(store.state.config?.host, { useNewUrlParser: true, useUnifiedTopology: true });
  const connection = await client.connect();
  database = connection.db(databaseName)
  return database;
} 

export { 
  store,
  persistentSotrage,
  connect
};