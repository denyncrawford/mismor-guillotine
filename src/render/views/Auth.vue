<template>
  <page :description="`Introduce la contraseña o escanea.`" title="Autenticar">
    <div>
      <input type="password" v-model="password" placeholder="Contraseña" class="text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <p class="mt-8 text-sm text-white">Necesita verificar la cuenta <span class="text-main-color">{{account.username}}</span> para poder continuar.</p>
    </div>
    <div class="mt-5">
      <el-button @click="back" class="bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">Regresar</el-button>
      <el-button @click="go" class="bg-main-color text-back hover:text-back" type="primary">Continuar</el-button>
    </div>
  </page>
</template>

<script>
import Page from '../components/structure/PageCenter.vue'
import Inpt from '../components/structure/Input.vue'
const BarcodeScanner = require("native-barcode-scanner");
let scanner;
export default {
  data() {
    return {
      password: ""
    }
  },
  computed: {
    account() {
      return this.$store.state.config.savedSession
    }
  },
  methods: {
    back() {
      scanner.off()
      this.$router.go(-1)
    },
    go(code) {
      const go = this.$route.params.go
      if (typeof code === "string") {
        let id = this.$store.state.config.savedSession.id || this.$store.state.config.savedSession._id;
        if (code == id) {
          this.$router.push(`/${go}`)
          scanner.off()
          return
        } else if (code && !id) {
            this.notify({message: "Vuelva a iniciar sesión para autenticar con scanner."});
        } else if (code != id) {
            this.notify({message: "Usuario invalido."});
        }
      } else {
        const password = this.$store.state.config.savedSession.password;
        if (this.password !== password) {
          this.notify({title:"Contraseña invalida", message: "Por favor introduzca una contraseña valida"});
          return
        }
        this.$router.push(`/${go}`)
      }
    },
    notify({
      title,
      message
    }) {
      this.$message.error({message, showClose: true,});
    },
  },
  mounted() {
    scanner = new BarcodeScanner({
      endKey: 'Intro'
    });
    scanner.on('code', code => {
      this.go(code);
    });
  },
  components: {
    Page,
    Inpt
  }
}
</script>