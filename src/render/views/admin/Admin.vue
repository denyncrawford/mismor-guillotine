<template>
  <page description="Panel de control" title="Modo admin">
    <div class="mb-5">
      <h1 class="text-lg text-white mb-5">Acciones rapidas</h1>
      <div class="flex">
        <el-button
        @click="newUser"
        round 
        size="mini" 
        class="bg-back inline text-red hover:bg-main-color group flex items-center justify-center hover:border-main-color hover:text-back">
          <i data-feather="user" class="w-5 mr-2 inline text-sm group-hover:text-back text-gray-400"></i>
          Nuevo Colaborador
        </el-button>
        <el-button 
          round 
          size="mini" 
          class="bg-back inline text-red hover:bg-main-color group flex items-center justify-center hover:border-main-color hover:text-back">
            <i data-feather="calendar" class="w-5 mr-2 inline text-sm group-hover:text-back text-gray-400"></i>
            Filtrar por fechas
        </el-button>
        <el-button 
          round 
          size="mini" 
          class="bg-back inline text-red hover:bg-main-color group flex items-center justify-center hover:border-main-color hover:text-back">
            <i data-feather="printer" class="w-5 mr-2 inline text-sm group-hover:text-back text-gray-400"></i>
            Imprimir resumen mensual 
        </el-button>
      </div>
    </div>
    <div>
      <h1 class="text-lg text-white mb-5">Colaboradores</h1>
      <div class="container">
        <div class="rounded-lg border overflow-hidden border-gray-400">
          <div class="items-center border-b border-gray-400 flex px-5 py-2">
            <h1 class="text-md text-white">Base de datos</h1>
            <input type="text" placeholder="Buscar usuario" class="ml-auto ml-5 text-sm text-white py-1 px-5 bg-transparent rounded-full border outline-none border-1 border-gray-400">
          </div>
          <table class="w-full">
            <thead class="px-5 py-2">
              <tr class="px-5 py-2 border-b border-gray-400">
                <th class="py-2 text-xs px-5">Nombre</th>
                <th class="py-2 text-xs px-5">ID</th>
                <th class="py-2 text-xs px-5">Email</th>
                <th class="py-2 text-xs px-5">Puesto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.entries" :key="user._id" class="cursor-pointer group hover:bg-main-color px-5 py-2 border-b last:border-b-0 border-gray-400">
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user.username || user.name}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user._id.toString()}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user.email}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user.position || user.admin ? "admin" : "-"}}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '../../components/structure/Page.vue'
import { connect } from '../../store/index.js'
import { replace } from 'feather-icons'
export default {
  data() {
    return {
      users: {
        entries: [],
        page: 0,
        limit: 10
      }
    }
  },
  components: {
    Page
  },
  async mounted() {
    replace();
    const database = this.$store.state.config.database;
    const db = await connect(database);
    const users = db.collection("users");
    this.users.entries = await users.find(this.users.page * this.users.limit).limit(this.users.limit).toArray();
  },
  methods: {
    newUser() {
      this.$router.push('/newUser')
    }
  }
}
</script>

<style scoped>
* th {
  text-transform: uppercase;
  text-align: left;
  color: #FFF;
  min-width: 30px;
}
</style>