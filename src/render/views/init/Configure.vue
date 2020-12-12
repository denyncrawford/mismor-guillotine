<template>
    <div>
      <loader :visible="isLoading" message="Guardando configuración..." />
      <page 
        title="Configurar Aplicación"
        description="Esta es la configuración del programa"
      >
      <div>
        <h2 class="mb-2 font-bold text-blue-400">Indicar el prefijo del lector</h2>
        <input v-model="selectedDevice" ref="psw" type="text" placeholder="Prefijo" class="mb-5 text-gray-500 py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        <p class="mb-5 group-hover:text-back text-gray-400">Debe configurar el prefijo en el scanner para utilizarlo.</p>    
      </div>
      <div>
        <h2 class="mb-2 font-bold text-blue-400">Escribe un nombre para la base de datos</h2>
        <input v-model="database" ref="psw" type="text" placeholder="guillotine (default)" class="mb-5 text-gray-500 py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">  
      </div>
      <div class="mt-5">
        <el-button @click="back" class="bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">Regresar</el-button>
        <el-button @click="save" class="bg-main-color text-back hover:text-back" type="primary">Continuar</el-button>
      </div>
      </page>
    </div>
</template>

<script>
import Page from '../../components/structure/Page.vue'
import Loader from '../../components/Loader.vue'
import { persistentSotrage as state, connect } from '../../store/index.js'
export default {
  data() {
    return {
      selectedDevice: "",
      database: "",
      defaultDatabase: "guillotine",
      isLoading: false
    }
  },
  components: {
    Page,
    Loader
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async save() {
      let { selectedDevice, database } = this;
      database = database || this.defaultDatabase;
      const db = await connect(database);
      const users = db.collection("users")
      this.isLoading = true;
      let inMemory = this.$store.state.firstLoad;
      inMemory.savedSession.admin = true;
      const config = {
        selectedDevice, 
        database, 
        ...inMemory
      };
      this.$store.commit('setConfig', config);
      await state.set({config});
      this.$store.commit('updateFirtsLoad', {});
      await users.insertOne(inMemory.savedSession)
      setTimeout(() => {
        this.$router.push('/mode')
      }, Math.floor(Math.random() * (10000 - 3000 + 1) + 3000));
    }
  }
}
</script>

<style>

.el-select {
  min-width: 266px;
  min-height: 42px;
}

.el-input__inner {
  background-color: transparent!important;
  border-color: #60A5FA;
}

.el-select-dropdown {
  background-color: transparent;
  border: none;
}
</style>