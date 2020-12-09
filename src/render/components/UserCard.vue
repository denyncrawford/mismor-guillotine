<template>
  <div v-show="cardFullView" class="fixed -top-0 -left-0 bg-back h-screen w-screen bg-opacity-60">
    <div class="relative w-screen h-screen flex flex-col items-center justify-center">
      <transition name="slide5">
        <div v-show="cardFullView" ref="cardtake" class="userCard bg-gradient-to-b from-teal-400 to-blue-600  p-8 rounded-3xl">
          <div class="flex flex-col items-center justify-center">
            <div :style="[user?.file ? { background: `url(${image})` } : {background : 'blue'}]" class="userimage bg-center bg-cover bg-no-repeat w-44 h-44 bg-indigo-800 rounded-full"></div>
            <div class="mt-5 uppercase text-white font-bold">
              <h1 class="text-lg">{{user?.fullName || "John Doe"}}</h1>
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
      </transition>
      <div class="-mt-5">
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
import { toPng, toSvg } from 'html-to-image';
const sharp = require('sharp');
const promisify = require('util').promisify;
import html2canvas from 'html2canvas';
const  { jsPDF } = require('jspdf');
const { dialog } = require('electron').remote;
const fs = require('fs');
const writeFile = promisify(fs.writeFile)
const path = require('path')
export default {
  mounted() {
    replace()
    JsBarcode("#barcode", this.user?.id || 'null', {
        background: "transparent",
        height: 50,
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
      JsBarcode("#barcode", this.user.id, {
        background: "transparent",
        height: 50,
        fontSize: 13,
        width: 1.4
      });
    },
    async print() {
      const node = this.$refs.cardtake;
      let image = await toPng(node);
      const base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      const savePath = await dialog.showSaveDialog({
          title: "identificacion",
          filters: [
            { name: 'PNG Files', extensions: ['png'] },
          ]
      });
      await sharp(new Buffer(base64Data, 'base64'))
      .resize({
        kernel: sharp.kernel.mitchell,
        height: 1000,
      })
      .toFile(savePath.filePath)
      //await writeFile(savePath.filePath, base64Data, 'base64')
    },
  }
}
</script>>

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
  transform: scale(0.8);
  background: rgb(0,73,255);
  background: linear-gradient(to top, rgba(0,73,255,1) 0%, rgba(6,182,218,1) 100%);
}
</style>

<style scoped>
  
</style>