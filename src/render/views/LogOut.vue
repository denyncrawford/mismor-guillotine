<template>
  <page :description="`Confirme la salida del sistema`" title="Cerrar sesión">
    <div>
      <p class="mt-8 text-sm text-white">Actualmente la cuenta <span class="text-main-color">{{account?.username}}</span> Está en sesión.</p>
    </div>
    <div class="mt-8">
      <el-button @click="back" class="bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">Regresar</el-button>
      <el-button @click="close" class="bg-main-color text-back hover:text-back" type="primary">Cerrar sesión</el-button>
    </div>
  </page>
</template>

<script>
import Page from '../components/structure/PageCenter.vue'
import { persistentSotrage as state } from '../store/index.js'
export default {
  computed: {
    account() {
      return this.$store.state.config.savedSession
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async close() {
      this.$store.commit('logOut');
      let config = this.$store.state.config;
      await state.set({config});
      this.$router.push('/login')
    },
  },
  components: {
    Page,
  }
}
</script>