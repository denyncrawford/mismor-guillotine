<template>
  <div>
    <user-mark ref="mark"/>
    <page :description="`Introduce la id de usauario o escanea.`" title="Marcar">
      <div>
        <div>
          <h1 class="text-3xl text-white mb-8">{{date}}</h1>
        </div>
        <input type="id" v-model="code" placeholder="ID de usauario" class="text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        <p class="mt-8 text-sm text-white">Necesita verificar la cuenta para poder continuar.</p>
      </div>
      <div class="mt-5">
        <el-button @click="back" class="bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">Regresar</el-button>
        <el-button @click="marcar" class="bg-main-color text-back hover:text-back" type="primary">Marcar</el-button>
      </div>
    </page>
  </div>
</template>

<script>
import Page from '../components/structure/PageCenter.vue'
import Inpt from '../components/structure/Input.vue'
const BarcodeScanner = require("native-barcode-scanner");
import { connect } from '../store/index.js'
import { handleInning } from '../scripts/helpers.js'
import UserMark from '../components/UserMark.vue'
import dayjs from 'dayjs';
let scanner;
export default {
  data() {
    return {
      code: "",
      date: dayjs().format('hh:mm'),
      collection: null
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async marcar(code) {
      // this.$refs.mark.show({"_id":{"$oid":"602bc941ac0f2f1dd0efe5bf"},"file":"C:\\Users\\denyncrawford\\AppData\\Roaming\\guillotine\\pictures\\MZQL0ZLBI.jpg","admin":true,"date":{"$date":"2021-02-16T13:29:45.487Z"},"name":"Miguel","lastName":"Rangel","dni":"96092910","phone":"1122511046","email":"kiquerangelb@gmail.com","position":"Diseñador","password":"denyncrawford","username":"denyn_crawford","fullName":"Miguel Rangel","id":"609gEu2Ag6","innings":[]})
      code = !code || typeof code !== 'string' ? this.code : code;
      if (!code) return this.notify({ message: "Por favor introduzca un usuario valido." });
      const user = await this.collection.findOne({id: code})
      if (!user) return this.notify({ message: "Por favor introduzca un usuario valido." });
      const { innings, id, fullName } = user;
      let inning = innings.find(t => t.dateString == dayjs().format('DD/MM/YYYY'))
      if (!inning) {
        await this.collection.updateOne({id}, { $push: { innings: handleInning({fullName, id}) } })
        return this.$refs.mark.show(user, true)
      }
      if (inning && !inning?.state) {
        // return this.notify({ message: "No puede iniciar otro turno hoy." });
        return this.$refs.mark.show(user, false, true)
      }
      await this.collection.updateOne({'innings.id':inning?.id}, { $set: { 'innings.$': handleInning(null, inning) } })
      return this.$refs.mark.show(user, false)
    },
    notify({
      title,
      message
    }) {
      this.$message.error({message, showClose: true});
    },
  },
  async mounted() {
    const database = this.$store.state.config.database;
    const db = await connect(database);
    this.collection = db.collection('users');
    scanner = new BarcodeScanner({
      endKey: 'Intro'
    });
    scanner.on('code', code => {
      this.marcar(code);
    });
    setInterval(() => {
      this.date = dayjs().format('hh:mm');
    }, 1000)
  },
  beforeUnmount() {
    scanner.off()
  },
  components: {
    Page,
    Inpt,
    UserMark
  }
}
</script>