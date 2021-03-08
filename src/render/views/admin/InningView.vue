<template>
  <page exit="admin" :description="'Verificar turno ' + inning.id" title="Vista de turno">
    <div>
          <h2 class="mb-2 font-bold text-blue-400">Colaborador:</h2>
          <h1 class="text-white font-bold text-xl">{{inning.owner.fullName}}</h1>
          <p class="mb-5 group-hover:text-back text-gray-400">Este colaborador creó este turno.</p>    
    </div>  
    <div>
          <h2 class="mb-2 font-bold text-blue-400">ID de turno:</h2>
          <h1 class="text-white font-bold text-xl">{{inning.id}}</h1>
          <p class="mb-5 group-hover:text-back text-gray-400">Con esta ID puedes identificar este turno ya que es unica.</p>    
    </div>  
    <div>
          <h2 class="mb-2 font-bold text-blue-400">Informacón:</h2>
          <div class="flex mb-2">
            <h1 class="text-gray-400 border border-gray-400 rounded py-2 px-3 font-bold text-md">Duración: {{inning.totalTime}} horas</h1>
            <h1 class="text-gray-400 border border-gray-400 rounded py-2 px-3 font-bold text-md ml-5">Estado: {{inning.state ? 'Abierto' : 'Cerrado'}}</h1>
            <h1 class="text-gray-400 border border-gray-400 rounded py-2 px-3 font-bold text-md ml-5">Empezado el dia {{inning.date.day}} del mes {{inning.date.month}} del {{inning.date.year}}</h1>
          </div>
          <p class="mb-5 group-hover:text-back text-gray-400">Información adicional disponible.</p>    
    </div>  
    <div>
      <h2 class="mb-2 font-bold text-blue-400">Hora de entrada:</h2>
      <v-date-picker class="mb-2" is-dark mode="time" v-model="start"/>
      <p class="mb-5 group-hover:text-back text-gray-400">Puedes modificar la hora de entrada siempre que lo necesites.</p>
    </div>
    <div>
      <h2 class="mb-2 font-bold text-blue-400">Hora de salida:</h2>
      <v-date-picker class="mb-2" is-dark mode="time" v-model="end"/>
      <p class="mb-5 group-hover:text-back text-gray-400">Puedes modificar la hora de salida siempre que lo necesites.</p>
    </div>
    <div>
          <h2 class="mb-2 font-bold text-blue-400">Comentarios:</h2>
          <textarea v-model="inning.details" ref="psw" type="text" placeholder="Escribe los detalles de este turno" class="w-full text-gray-500 py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400"></textarea>
          <p class="mb-5 group-hover:text-back text-gray-400">Si existe alguna anotación importante, dejala acá.</p>    
    </div> 
    <div class="mt-10">
      <el-button @click="$router.go(-1)" class="bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">Volver</el-button>
      <el-button @click="updateInning" class="bg-main-color text-back hover:text-back" type="primary">Actualizar</el-button>
    </div>
  </page>
</template>

<script>
import { connect } from '../../store/index.js'
import { replace } from 'feather-icons'
import Page from '../../components/structure/Page.vue'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(duration)
dayjs.extend(customParseFormat)

export default {
  data() {
    return {
      collection: null,
      inning: {
        owner :{
          fullName:"",
          id:""
        },
        date:{},
        dateString:"07/03/2021",
        start:"08:57:46 PM",
        end:"08:57:51 PM",
        totalTime:"0.00",
        state:false,
        details:"",
        id:""
      },
      start: '',
      end: ''
    }
  },
  async mounted() {
    replace()
    const database = this.$store.state.config.database;
    const db = await connect(database);
    this.collection = db.collection("users");
    const inningId = this.$route.params.id;
    const result = await this.collection.aggregate([
        { $match: { 'innings.id': inningId }},
        { $project: {
            innings: { $filter: {
                input: '$innings',
                as: 'innings',
                cond: { $eq: ['$$innings.id', inningId]}
            }},
            _id: 0
        }}
      ]).toArray();
    this.inning = Object.assign(this.inning, result[0].innings[0])
    this.start = dayjs(this.inning.dateString + ' ' + this.inning.start, 'DD/MM/YYYY hh:mm:ss A').toDate();
    this.end = dayjs(this.inning.dateString + ' ' + this.inning.end, 'DD/MM/YYYY hh:mm:ss A').toDate();
  },
  methods: {
    async updateInning() {
      this.inning.start = dayjs(this.start).format('hh:mm:ss A')
      this.inning.end = dayjs(this.end).format('hh:mm:ss A')
      const date1 = dayjs(this.inning.start, 'hh:mm:ss A')
      const date2 = dayjs(this.inning.end, 'hh:mm:ss A')
      this.inning.totalTime = Math.abs(date1.diff(date2, 'hours', true)).toFixed(2);
      await this.collection.updateOne({'innings.id': this.inning.id}, { $set: { 'innings.$':  this.inning } })
      this.notify('Turno actualizado')
    },
    notify(message) {
      this.$message.success({
        showClose: true,
        message
      })
    }
  },
  components: {
    Page
  }
}
</script>