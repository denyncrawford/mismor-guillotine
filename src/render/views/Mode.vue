<template>
  <page description="Elige como usar esta instancia" title="Selecciona un modo">
    <div class="grid grid-cols-2 gap-10 w-10/12 mx-auto">
      <div class="cursor-pointer card group hover:bg-main-color text-left bg-transparent p-5 rounded-xl border border-2 border-gray-400">
        <h1 class="text-xl uppercase group-hover:text-back text-main-color mb-2">Modo admin</h1>
        <p class="group-hover:text-back text-gray-400">Utilizar en modo administrador para poder acceder a los recursos de los colaboradores.</p>
      </div>
      <div class="cursor-pointer card group hover:bg-main-color text-left bg-transparent p-5 rounded-xl border border-2 border-gray-400">
        <h1 class="text-xl uppercase group-hover:text-back text-main-color mb-2">Marcador</h1>
        <p class="group-hover:text-back text-gray-400">Utilizar en modo marcador para poder acceder a un nuevo marcado de turnos.</p>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '../components/structure/PageCenter.vue'
export default {
  components: {
    Page
  }
}
</script>