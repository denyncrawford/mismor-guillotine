
import { createStore } from 'vuex'
const { MongoClient } = require('mongodb');
const Store = require('electron-store')
const url = 'mongodb://127.0.0.1:27017';

let database;

const connect = async (databaseName) => {
  if (database) return database;
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const connection = await client.connect();
  database = connection.db(databaseName)
  return database;
} 

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
    },
    logOut(state) {
      delete state.config.savedSession
    },
    logIn(state, payload) {
      state.config.savedSession = payload;
    }
  }
})

const persistentSotrage = new Store();

export { 
  store,
  persistentSotrage,
  connect
};