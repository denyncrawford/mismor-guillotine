<template>
    <page 
      title="Configurar Aplicación"
      description="Esta es la configuración del programa"
    >
    
    </page>
</template>

<script>
import Page from '../../components/structure/Page.vue'
const { getDevices } = require('usb-barcode-scanner');
export default {
  components: {
    Page
  },
  setup() {
    let devices = getDevices();
    console.log(devices)
    return {
      devices
    }
  }
}
</script>