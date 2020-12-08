<template>
  <page description="Rellena el formulario" title="Nuevo colaborador">
    <div>
      <h2 class="mb-2 font-bold text-white">Foto</h2>
      <button :style="[file ? {'background': 'url(' + file + ')'} : {'background': 'transparent'}]" class="relative group hover:border-main-color p-10 border border-gray-400 rounded-md mb-5 border-dashed" @click="openFile">
        <i v-if="!file" class="group-hover:text-main-color text-gray-400 stroke-current " data-feather="plus"></i>
      </button>
    </div>
    <div>
      <h2 class="mb-2 font-bold text-white">Indentificación</h2>
      <input ref="name" type="text" placeholder="Nombre" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <input ref="name" type="text" placeholder="Apellido" class="mb-5 ml-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <div>
        <input ref="name" type="text" placeholder="DNI" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      </div>
    </div>
    <div>
      <h2 class="mb-2 font-bold text-white">Contacto</h2>
      <input ref="name" type="text" placeholder="Telefono" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <input ref="name" type="text" placeholder="Email" class="mb-5 ml-2 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
    </div>
  </page>
</template>

<script>
import Page from '../../components/structure/Page.vue'
const url = require('url');
const { dialog } = require('electron').remote
import { replace } from 'feather-icons'
export default {
  data() {
    return {
      file: ""
    }
  },
  components: {
    Page
  },
  mounted() {
    replace();
  },
  methods: {
    async openFile() {
      let file = await dialog.showOpenDialog({ 
        properties: ['openFile'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        ]
      });
      this.file = file.filePaths[0];
      console.log(this.file)
    }
  }
}
</script>