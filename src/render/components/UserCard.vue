<template>
  <div v-show="cardFullView" class="fixed -top-0 -left-0 z-10 bg-back h-screen w-screen bg-opacity-60">
    <div class="relative w-screen h-screen flex flex-col items-center justify-center">
      <transition name="slide5">
        <div v-show="cardFullView" class="flex items-center justify-center">
          <div id="card" ref="cardtake" class="userCard z-10 bg-gradient-to-b from-teal-400 to-blue-600  p-8 rounded-3xl">
            <div class="flex flex-col items-center justify-center">
              <div :style="[user?.file ? { background: `url(${image})` } : {background : 'blue'}]" class="userimage bg-center bg-cover bg-no-repeat w-44 h-44 bg-indigo-800 rounded-full"></div>
              <div class="mt-5 uppercase text-white font-bold">
                <h1 class="whitespace-nowrap text-lg">{{user?.fullName || "John Doe"}}</h1>
              </div>
              <div class="uppercase">
                <h1 class="text-xs">{{user?.position || "doomie"}}</h1>
              </div>
              <div class="mt-10 mb-10">
                <h1 class="text-3xl font-bold">MISMOR</h1>
              </div>
              <div>
                <svg class="max-w-lg" id="barcode"></svg>
              </div>
            </div>
          </div>
          <div v-show="back" ref="backCard" class="z-0 rounded-3xl ml-10 backCard">
            <canvas ref="qr"></canvas>
          </div>
        </div>
      </transition>
      <div class="-mt-5 z-10">
        <el-button @click="close" class="bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">
          Volver
        </el-button>
        <el-button @click="print" class="bg-main-color text-back hover:text-back" type="primary">
          Imprimir
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
const JsBarcode = require('jsbarcode');
import { mapState } from 'vuex';
import { replace } from 'feather-icons';
import { toCanvas } from '@denyncrawford/html-to-image';
const { jsPDF } = require('jspdf');
const { dialog } = require('electron').remote;
const qrcode = require('qrcode');
const ptp =  require("pdf-to-printer")
export default {
  data() {
    return {
      back: false
    }
  },
  mounted() {
    replace()
    let fields = [
      { name: "fullName", rename: "Nombre"},
      { name: "id", rename: "ID"},
      { name: "dni", rename: "DNI"},
      {	name: 'phone', rename: "Telefono"},
      { name: "email", rename: "Email"},
    ]
    
    let result = '';

    fields.forEach(item => {
      result += `${item.rename}: ${this.user[item.name]}\n`
    })

    qrcode.toCanvas(this.$refs.qr, result, {
      color: {
        light: '#0000' // Transparent background
      }
    }),

    JsBarcode("#barcode", this.user?.id || 'null', {
        background: "transparent",
        height: 50,
        lineColor: "white",
        fontSize: 13,
        width: 1.4
    });
  },
  computed: {
    image() {
      return new URL(`file:///${this.user?.file}`).href
    },
    user() {
      return this.$store.state.adminView.selectedUser;
    },
    ...mapState(['cardFullView'])
  },
  methods: {
    close() {
      this.$store.commit('toggleFullViewStatus')
    },
    setCode(id) {
      let fields = [
        { name: "fullName", rename: "Nombre"},
        { name: "id", rename: "ID"},
        { name: "dni", rename: "DNI"},
        {	name: 'phone', rename: "Telefono"},
        { name: "email", rename: "Email"},
      ]
      
      let result = '';

      fields.forEach(item => {
        result += `${item.rename}: ${this.user[item.name]}\n`
      })

      qrcode.toCanvas(this.$refs.qr, result, {
        color: {
          light: '#0000' // Transparent background
        }
      }),
      JsBarcode("#barcode", this.user.id, {
        background: "transparent",
        height: 50,
        lineColor: "white",
        fontSize: 13,
        width: 1.4
      });
    },
    async print() {
      this.back = true
      const node = this.$refs.cardtake;
      const backNode = this.$refs.backCard;
      backNode.style.marginLeft = 0;
      let canvas = await toCanvas(node, {
        pixelRatio: 3
      });
      let canvas2 = await toCanvas(backNode, {
        pixelRatio: 3
      });
      canvas.style.transform = "scale3d(0.5,0.5,0)";
      canvas2.style.transform = "scale3d(0.5,0.5,0)";
      var image = canvas.toDataURL();
      var image2 = canvas2.toDataURL();
      const base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      const base64Data2 = image2.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      const savePath = await dialog.showSaveDialog({
          title: "identificacion",
          defaultPath: this.user.id,
          filters: [
            { name: 'PDF Files', extensions: ['pdf'] },
          ]
      });
      const pdf = new jsPDF();
      pdf.addImage(base64Data, 'png', 10, 10, 64, 113)
      pdf.addImage(base64Data2, 'png', 84, 10, 64, 113)
      await pdf.save(savePath.filePath, {
        returnPromise: true
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.back = false
      await ptp.print(savePath.filePath)
    },
  }
}
</script>

<style scoped>
.slide5-enter-active {
   animation: fadeInUp;
   animation-duration: .2s;
  }

  .slide5-leave-active {
    animation: fadeOutDown;
    animation-duration: .2s;
  }
.userimage {
  background-repeat: no-repeat!important;
  background-size: cover!important;
  background-position: center!important;
}
.userCard {
  transition: .2s;
  background: rgb(0,73,255);
  background: linear-gradient(to top, rgba(0,73,255,1) 0%, rgba(6,182,218,1) 100%);
}

.backCard {
  color: white;
  font-family: sans-serif;
  height: 515px;
  width: 287px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: .2s;
  background: rgb(0,73,255);
  background: linear-gradient(to top, rgba(0,73,255,1) 0%, rgba(6,182,218,1) 100%);
}
</style>