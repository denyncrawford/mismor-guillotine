<template>
  <div class="bg-indigo min-h-screen">
    <page 
      title="Crear super usuario"
      description="Rellena los datos necesarios para configurar"
    >
      <div class="w-100 max-w-md">
        <transition :name="sign.name.length <= 1 ? 'slide2' : ''">
          <h2 v-show="sign.name" class="ml-5 mb-2 font-bold text-blue-400">Nombre de usuario</h2>
        </transition>
        <div class="grid">
          <input v-model="sign.name" ref="name" type="text" placeholder="Nombre de usuario" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        </div>
        <transition :name="sign.psw.length <= 1 ? 'slide2' : ''">
          <h2 v-show="sign.psw || sign.rpsw" class="ml-5 mb-2 font-bold text-blue-400">Contraseña</h2>
        </transition>
        <div class="grid grid-cols-2 gap-5">
          <input v-model="sign.psw" ref="psw" type="password" placeholder="Contraseña" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
          <input v-model="sign.rpsw" ref="rpsw" type="password" placeholder="Repetir contraseña" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        </div>
        <div class="grid">
          <input v-model="sign.email" ref="email" type="text" placeholder="Correo electronico" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        </div>
        <el-button @click="init" class="bg-main-color text-back hover:text-back" type="primary">Continuar</el-button>
      </div>
    </page>
  </div>
</template>

<script>
import Page from '../../components/structure/Page.vue'
import { formatUser } from '../../scripts/helpers.js'
export default {
  data() {
    return {
      sign: {
        name: "",
        email: "",
        psw: "",
        rpsw: "" 
      }
    }
  },
  components: {
    Page
  },
  mounted() {
    const state = this.$store.state
    if (state.firstLoad.savedSession) {
      let saved = state.firstLoad.savedSession
      this.sign.name = saved.username
      this.sign.psw = saved.password,
      this.sign.email = saved.email
    }
  },
  methods: {
    init() {
      const router = this.$router;
      let { sign } = this;
      sign = formatUser(sign);
      for (let k in sign) {
        if (!sign[k]) {
          this.$refs[k].style.borderColor = 'red';
          return this.notify({title:"Campo vacio",message: "Por favor rellenar el campo "+ k});
        }
      }
      if (sign.psw !== sign.rpsw) return this.notify({title:"La contraseña no coincide", message: "Por favor verificar"})
      let { psw: password, name: username, email, id } = sign;
      this.$store.commit("updateFirtsLoad", { savedSession: { password, username, email, id } })
      router.push('/configure')
    },
    notify({
      title,
      message
    }) {
      message = `${title}: ${message}`
      this.$message.error({message, showClose: true});
    },
  }
}
</script>

<style scoped>
.slide2-enter-active {
   animation: fadeInUp;
   animation-duration: .2s;
  }

  .slide2-leave-active {
    animation: fadeOutDown;
    animation-duration: .2s;
  }
</style>