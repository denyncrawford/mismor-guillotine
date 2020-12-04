<template>
  <div class="bg-indigo min-h-screen">
    <page 
      title="Crear super usuario"
      description="Rellena los datos necesarios"
    >
      <div class="flex flex-col w-96 max-w-md">
        <div class="grid">
          <input v-model="sign.name" ref="name" type="text" placeholder="Nombre de usuario" class="mb-5 text-back py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        </div>
        <div class="grid grid-cols-2 gap-5">
          <input v-model="sign.psw" ref="psw" type="password" placeholder="Contraseña" class="mb-5 text-back py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
          <input v-model="sign.rpsw" ref="rpsw" type="password" placeholder="Repetir contraseña" class="mb-5 text-back py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        </div>
        <div class="grid">
          <input v-model="sign.email" ref="email" type="text" placeholder="Correo electronico" class="mb-5 text-back py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        </div>
        <el-button @click="init" class="bg-transparent text-back hover:text-back" type="primary">Continuar</el-button>
      </div>
    </page>
  </div>
</template>

<script>
import Page from '../../components/structure/PageCenter.vue'
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
  methods: {
    init() {
      const router = this.$router;
      let { sign } = this;
      for (let k in sign) {
        if (!sign[k]) {
          this.$refs[k].style.borderColor = 'red';
          return this.notify({title:"Campo vacio",message: "Por favor rellenar el campo "+k});
        }
      }
      if (sign.psw !== sign.rpsw) return this.notify({title:"La contraseña no coincide", message: "Por favor verificar"})
      router.push('/init/configure')
    },
    notify({title, message}) {
        this.$notify.error({
          title,
          message,
          position: 'bottom-right'
        });
      },
  }
}
</script>