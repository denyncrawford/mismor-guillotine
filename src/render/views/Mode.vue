<template>
  <page description="Elige como usar esta instancia" title="Selecciona un modo">
    <div class="grid grid-cols-2 gap-10 w-10/12">
      <router-link :to="{ name: 'auth' , params: { go: 'admin' }}" tag="div" class="cursor-pointer card group hover:bg-main-color text-left bg-transparent p-5 rounded-xl border border-2 border-gray-400">
        <h1 class="text-xl uppercase group-hover:text-back text-main-color mb-2">Modo admin</h1>
        <i class="group-hover:text-back text-gray-400 mb-2" data-feather="user"></i>
        <p class="group-hover:text-back text-gray-400">Utilizar en modo administrador para poder acceder a los recursos de los colaboradores.</p>
      </router-link>
      <router-link :to="{ name: 'scan' }" tag="div" class="cursor-pointer card group hover:bg-main-color text-left bg-transparent p-5 rounded-xl border border-2 border-gray-400">
        <h1 class="text-xl uppercase group-hover:text-back text-main-color mb-2">Marcador</h1>
        <i class="group-hover:text-back text-gray-400 mb-2" data-feather="activity"></i>
        <p class="group-hover:text-back text-gray-400">Utilizar en modo marcador para poder acceder a un nuevo marcado de turnos.</p>
      </router-link>
    </div>
    <div class="grid w-10/12">
     <el-button class="mt-10 bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">Salir</el-button>
    </div>
  </page>
</template>

<script>
import Page from '../components/structure/Page.vue'
import { replace } from 'feather-icons'
export default {
  components: {
    Page
  },
  mounted() {
    replace();
  }
}
</script>