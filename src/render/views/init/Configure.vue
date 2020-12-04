<template>
    <page 
      title="Configurar Aplicación"
      description="Esta es la configuración del programa"
    >
    <div>
      <h2 class="mb-2 font-bold text-blue-400">Seleccionar lector</h2>
      <el-select class="text-white mb-5" v-model="selectedDevice" placeholder="Select">
        <el-option
          class="bg-back hover:bg-main-color hover:text-back text-white border-main-color"
          v-for="(device, i) of devices"
          :key="i"
          :label="`${device.manufacturer} - ${device.product}`"
          :value="device.path">
        </el-option>
      </el-select>
    </div>
    <div>
      <h2 class="mb-2 font-bold text-blue-400">Escribe un nombre para la base de datos</h2>
      <input v-model="database" ref="psw" type="text" placeholder="guillotine (default)" class="mb-5 text-gray-500 py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
    </div>
    </page>
</template>

<script>
import Page from '../../components/structure/Page.vue'
const { getDevices } = require('usb-barcode-scanner');
export default {
  data() {
    return {
      selectedDevice : "",
      dataase: ""
    }
  },
  components: {
    Page
  },
  setup() {
    let devices = getDevices();
    return {
      devices
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