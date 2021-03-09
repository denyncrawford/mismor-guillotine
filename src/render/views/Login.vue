<template>
  <page :description="`Introduce la contraseña y el usuario o escanea.`" title="Iniciar sesión">
    <div>
      <div>
        <input type="text" v-model="username" placeholder="Usuario" class="text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        <input type="password" v-model="password" placeholder="Contraseña" class="ml-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      </div>
      <p class="mt-8 text-sm text-white">Ingresa al sistema con un usuario valido para poder continuar.</p>
    </div>
    <div class="mt-5">
      <el-button @click="login" class="bg-main-color text-back hover:text-back" type="primary">Entrar</el-button>
    </div>
  </page>
</template>

<script>
import Page from '../components/structure/PageCenter.vue'
import { persistentSotrage as state, connect } from '../store/index.js'
const BarcodeScanner = require("native-barcode-scanner");
let scanner;
export default {
  data() {
    return {
      password: "",
      username: ""
    }
  },
  methods: {
    async login() {
      const database = this.$store.state.config.database;
      const {password, username} = this;
      const db = await connect(database);
      const users = db.collection("users")
      let user = await users.findOne({username});
      if (!user || this.password !== user.password || !this.password || !this.username) {
        this.notify("El usuario o la contraseña no coinciden.");
        return
      }
      this.$store.commit('logIn', user)
      state.set('config.savedSession', user);
      this.$router.push('/mode');
    },
    async loginWithScann(id) {
      const database = this.$store.state.config.database;
      const db = await connect(database);
      const users = db.collection("users")
      let user = await users.findOne({id});
      if (!user || !user.admin) {
        this.notify("El usuario no fue encontrado o no es administrador.");
        return
      }
      this.$store.commit('logIn', user)
      state.set('config.savedSession', user);
      this.$router.push('/mode');
      scanner.off();
    },
    notify(message) {
      this.$message.error({message, showClose: true,});
    },
  },
  mounted() {
    scanner = new BarcodeScanner({
      // devicePrefix: this.$store.state.config.selectedDevice
      endKey: 'Intro'
    });
    scanner.on('code', id => {
      this.loginWithScann(id)
    })
  },
  beforeUnmount() {
    scanner.off()
  },
  components: {
    Page,
  }
}
</script>