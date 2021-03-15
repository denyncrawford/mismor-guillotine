<template>
  <div class="bg-back min-w-screen min-w-screen min-h-screen p-10 px-16">
    <user-card ref="userCard"/>
    <div class="p-5 border border-gray-800 rounded-xl">
      <div class="flex p-5 inline bg-gray-900 rounded-xl">
        <div :style="[user?.file ? { background: `url(${image})` } : {background : 'blue'}]" class="userimage bg-center bg-cover bg-no-repeat w-44 h-44 bg-indigo-800 rounded-full"></div>
        <div class="mx-10">
          <h2 class="mt-2 mb-4 text-3xl max-w-lg text-main-color uppercase font-thin">{{user.fullName}}</h2>
          <h2 class="inline mb-2 bg-main-color px-2 rounded">{{user.position}}</h2>
          <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">Fecha de entrada:</span> {{date}}</h2>
          <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">Telefono:</span> {{user.phone}}</h2>
          <transition name="slide3">
            <div class="mb-5" v-show="see">
              <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">DNI:</span> {{user.dni}}</h2>
              <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">Usuario:</span> {{user.username}}</h2>
              <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">ID:</span> {{user.id}}</h2>
              <div class="-ml-2 z-0">
                <svg id="barcode"></svg>
              </div>
            </div>
          </transition>
          <h2 @click="see = !see" v-show="!see" class="mt-2 text-xs mb-2 font-bold text-main-color cursor-pointer">VER MAS</h2>
          <h2 @click="see = !see" v-show="see" class="mt-2 text-xs mb-2 font-bold text-main-color cursor-pointer">VER MENOS</h2>
        </div>
        <div class="ml-auto">
          <button @click="openCard" class="mr-5 cursor-pointer p-2 rounded-full ml-auto text-main-color hover:bg-main-color hover:border-main-color hover:text-back" type="primary"><i data-feather="credit-card" class="w-5 h-5"></i></button>
          <button @click="editUser($route.params.id)" class="mr-5 cursor-pointer p-2 rounded-full ml-auto text-main-color hover:bg-main-color hover:border-main-color hover:text-back" type="primary"><i data-feather="edit" class="w-5 h-5"></i></button>
          <button @click="$router.go(-1)" class="cursor-pointer p-2 rounded-full ml-auto text-main-color hover:bg-main-color hover:border-main-color hover:text-back" type="primary"><i data-feather="x" class="w-5 h-5"></i></button>
        </div>
      </div>
    </div>
    <div class=" mt-8 mb-5">
      <h1 class="text-lg text-white mb-5">Turnos</h1>
      <div class="rounded-lg border overflow-hidden border-gray-400">
        <div class="flex px-5 py-2 items-center">
          <h1 class="text-md text-white mr-10">Seleccionar fecha:</h1>
          <el-switch
            @change="onDayClick"
            v-model="innings.mode"
            active-text="Dia"
            inactive-text="Mes"
            class="mr-10">
          </el-switch>
          <v-date-picker @dayclick="onDayClick" is-dark v-model="innings.date" mode="date">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="px-2 text-sm text-white py-1 border border-gray-400 bg-back rounded focus:outline-none focus:border-blue-300"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </v-date-picker>
          <button 
          @click="saveCSV"
            class="rounded text-gray-400 ml-5 py-1 px-2 bg-back inline text-red hover:bg-main-color group flex items-center justify-center hover:border-main-color hover:text-back">
              <p class="mr-2 text-sm uppercase" >Bajar en excel</p>
              <i data-feather="download" class="w-5 stroke-current inline text-sm group-hover:text-back"></i>
          </button>
          <!-- <button 
          @click="printPDF"
            class="rounded text-gray-400 ml-5 py-1 px-2 bg-back inline text-red hover:bg-main-color group flex items-center justify-center hover:border-main-color hover:text-back">
              <p class="mr-2 text-sm uppercase" >Imprimir resumen</p>
              <i data-feather="printer" class="w-5 stroke-current inline text-sm group-hover:text-back"></i>
          </button> -->
        </div>
        <div>
          <table ref="table" class="w-full">
            <thead class="px-5 py-2">
              <tr class="px-5 py-2 border-b border-gray-400">
                <th class="py-2 text-xs px-5">Colaborador</th>
                <th class="py-2 text-xs px-5">ID</th>
                <th class="py-2 text-xs px-5">Fecha</th>
                <th class="py-2 text-xs px-5">Entrada</th>
                <th class="py-2 text-xs px-5">Salida</th>
                <th class="py-2 text-xs px-5">Duración</th>
                <th class="py-2 text-xs px-5">Estatus</th>
                <th class="py-2 text-xs px-5">Ver</th>
              </tr>
            </thead>
            <tbody>
              <tr @dblclick="openInning(inning.id)" v-for="inning in innings.entries" :key="inning.id"  class="cursor-pointer group hover:bg-main-color px-5 py-2 border-b last:border-b-0 border-gray-400">
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{inning.owner.fullName}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{inning.id}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{inning.dateString}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{inning.start}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{inning.end || '-'}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{inning.totalTime || '-'}} horas</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{inning.state ? "Abierto" : "Cerrado" }}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">
                  <div class="flex">
                    <button @click="openInning(inning.id)" class="rounded-full px-2 mr-2 text-sm group-hover:text-back text-gray-400 hover:bg-white" v-html="icons.eye"></button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
          <div v-show="!innings.entries.length" class="w-full flex justify-center py-3">
            <h1 class="text-gray-400 text-xs uppercase">No hay resultados</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

const JsBarcode = require('jsbarcode');
import Page from '../../components/structure/Page.vue'
import { connect } from '../../store/index.js'
import dayjs from 'dayjs';
import { replace, icons as fIcons } from 'feather-icons'
import UserCard from '../../components/UserCard.vue'
const fs = require('fs')
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const { dialog } = require('electron').remote;
const { Parser } = require('json2csv')
// const { jsPDF } = require('jspdf');

export default {
  data() {
    return {
      user: {
        file: "",
        admin: false,
        date: "",
        name: "",
        lastName: "",
        dni: "",
        phone: "",
        email: "",
        position: "",
        password: "",
        username: ""
      },
      icons: {
        eye: fIcons.eye.toSvg({width: 14}),
      },
      see: false,
      innings: {
        mode: true,
        date: new Date(),
        entries: []
      }
    }
  },
  computed: {
    image() {
      return new URL(`file:///${this.user?.file}`).href
    },
    date() {
      return dayjs(this.user.date).format('DD-MM-YYYY')
    }
  },
  async mounted() {
    replace()
    const database = this.$store.state.config.database;
    const db = await connect(database);
    this.users = db.collection("users");
    const { id } = this.$route.params;
    this.user = await this.users.findOne({id})
    await this.onDayClick()
    JsBarcode("#barcode", this.user?.id || 'null', {
        background: "transparent",
        height: 50,
        lineColor: "white",
        fontSize: 13,
        width: 1.4
    });
  },
  methods: {
    editUser(id) {
      this.$router.push(`/editUser/${id}`)
    },
    openCard() {
      this.$store.commit("selectUser", this.user);
      this.$store.commit("toggleFullViewStatus");
      this.$emit('setCode', this.user.id);
      this.$refs.userCard.setCode(this.user.id);
    },
    async searchInnings (date) {
      let cond = this.innings.mode ? { $eq: ['$$innings.dateString', date]} : { $and: [
        { $eq: [ "$$innings.date.month", dayjs(date, 'DD/MM/YYYY').format('MM') ] },
        { $eq: [ "$$innings.date.year", dayjs(date, 'DD/MM/YYYY').format('YYYY') ] }
      ] }
      return await this.users.aggregate([
        { $match: { id: this.$route.params.id }},
        { $project: {
            innings: { $filter: {
                input: '$innings',
                as: 'innings',
                cond
            }},
            _id: 0
        }}
      ]).toArray();
    },
    async onDayClick(day) {
      const result = await this.searchInnings(dayjs(this.innings.date).format('DD/MM/YYYY'));
      this.innings.entries = result.map(e => e.innings.map(l => l)).flat().sort((a,b) => dayjs(b.dateString, 'DD/MM/YYYY').toDate().valueOf() - dayjs(a.dateString, 'DD/MM/YYYY').toDate().valueOf())
    },
    openInning(id) {
      this.$router.push(`/inning/${id}`)
    },
    async saveCSV(month) {
      if (month) {
        this.innings.mode = false;
        await this.onDayClick()
      }
      const items = this.innings.entries
      const fields = [
        {
          label: 'Fecha',
          value: 'dateString'
        },
        {
          label: 'Colaborador',
          value: 'owner.fullName'
        },
        {
          label: 'ID Turno',
          value: 'id'
        },
        {
          label: 'Entrada',
          value: 'start'
        },
        {
          label: 'Salida',
          value: 'end'
        },
        {
          label: 'Duración',
          value: 'totalTime'
        },
        {
          label: 'Detalles',
          value: 'details'
        },
      ];
      const parser = new Parser({ fields, delimiter: '\t' });
      const xls = parser.parse(items)//.replace(/["']/g, "").replace(/[,]/g, "\t")
      const savePath = await dialog.showSaveDialog({
          title: "Guardar Turno",
          defaultPath: `turnos-${this.user.name}-${dayjs(this.innings.date).format('DD-MM-YYYY')}`,
          filters: [
            { name: 'XLS FILES', extensions: ['xls'] },
          ]
      });
      await writeFile(savePath.filePath, xls, 'utf-8')
    },
    // async printPDF() {
    //   const doc = new jsPDF();
    //   let lastIndex = 10
    //   let temp = ""
    //   this.innings.entries.forEach((inning, i) => {
    //     temp = ""
    //     Object.keys(inning).forEach((field, j) => {
    //       temp += `${field}: ${inning[field]} - `
    //     })
    //     doc.text(10, lastIndex, temp)
    //     lastIndex += 10
    //   });
    //   const savePath = await dialog.showSaveDialog({
    //       title: "resumen",
    //       defaultPath: this.user.id,
    //       filters: [
    //         { name: 'PDF Files', extensions: ['pdf'] },
    //       ]
    //   });
    //   await doc.save(savePath.filePath, {
    //     returnPromise: true
    //   });
    // }
  },
  components: {
    Page,
    UserCard
  }
}
</script>

<style scoped>
.slide3-enter-active {
   animation: fadeInDown;
   animation-duration: .2s;
  }

.slide3-leave-active {
    animation: fadeOutUp;
    animation-duration: .2s;
}

.userimage {
  background-repeat: no-repeat!important;
  background-size: cover!important;
  background-position: center!important;
}

* th {
  text-transform: uppercase;
  text-align: left;
  color: #FFF;
  min-width: 30px;
}
</style>