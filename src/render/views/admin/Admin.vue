<template>
  <page exit="mode" description="Panel de control" title="Modo admin">
    <user-card ref="userCard"/>
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
      <div>
        <div class="rounded-lg border overflow-hidden border-gray-400">
          <div class="items-center border-b border-gray-400 flex px-5 py-2">
            <h1 class="text-md text-white">Base de datos</h1>
            <input @keydown="searchUsers" @keyup="searchUsers" v-model="users.search" type="text" placeholder="Buscar usuario" class="ml-auto ml-5 text-sm text-white py-1 px-5 bg-transparent rounded-full border outline-none border-1 border-gray-400">
          </div>
          <table class="w-full">
            <thead class="px-5 py-2">
              <tr class="px-5 py-2 border-b border-gray-400">
                <th class="py-2 text-xs px-5">Nombre</th>
                <th class="py-2 text-xs px-5">ID</th>
                <th class="py-2 text-xs px-5">Email</th>
                <th class="py-2 text-xs px-5">Cargo</th>
                <th class="py-2 text-xs px-5">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr @dblclick="openCard(index)" v-for="(user, index) in users.entries" :key="user._id" class="cursor-pointer group hover:bg-main-color px-5 py-2 border-b last:border-b-0 border-gray-400">
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user.username || user.fullName}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user.id || user._id.toString()}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user.email}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">{{user.admin ? "admin" : user.position}}</th>
                <th class="py-2 group-hover:text-back text-xs font-normal px-5">
                  <div class="flex">
                    <button @click="editUser(user.id)" class="rounded-full px-2 mr-2 text-sm group-hover:text-back text-gray-400 hover:bg-white" v-html="icons.edit"></button>
                    <button @click="openUser(user.id)" class="rounded-full px-2 mr-2 text-sm group-hover:text-back text-gray-400 hover:bg-white" v-html="icons.eye"></button>
                    <button class="rounded-full px-2 text-sm group-hover:text-back text-gray-400 hover:bg-white" v-html="icons.trash"></button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center">
          <h3 class="text-md text-gray-400 mt-5 mb-5">Mostrando {{ users.entries.length }} de {{ users.total }} colaboradores.</h3>
          <div class="ml-auto flex items-center">
             <h3 class="text-md text-gray-400 mt-5 mb-5">Pagina {{ users.page }} de {{ users.pages }}</h3>
             <div class="flex mx-6 cursor-pointer">
               <div class="px-2 group hover:bg-main-color rounded-l-md">
                 <i data-feather="chevron-left" class="w-5 inline text-sm group-hover:text-back text-gray-400"></i>
               </div>
               <div class="px-2 group hover:bg-main-color rounded-r-md">
                 <i data-feather="chevron-right" class="w-5 inline text-sm group-hover:text-back text-gray-400"></i>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '../../components/structure/Page.vue'
import UserCard from '../../components/UserCard.vue'
import { connect } from '../../store/index.js'
import { replace, icons as fIcons } from 'feather-icons'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      users: {
        collection: null,
        entries: [],
        page: 0,
        limit: 10,
        selectedUser: {},
        total: 0,
        search: '',
        pages: 0
      },
      icons: {
        edit: fIcons.edit.toSvg({width: 14}),
        eye: fIcons.eye.toSvg({width: 14}),
        trash: fIcons.trash.toSvg({width: 14})
      }
    }
  },
  components: {
    Page,
    UserCard
  },
  async mounted() {
    const database = this.$store.state.config.database;
    const db = await connect(database);
    this.users.collection = db.collection("users");
    this.users.total = await this.users.collection.count()
    this.users.pages = Math.round(this.users.total / 10)
    this.users.entries = await this.users.collection.find(this.users.page * this.users.limit).limit(this.users.limit).toArray();
    replace();
  },
  updated() {
    replace();
  },
  computed: {
    ...mapState(['cardFullView'])
  },
  methods: {
    newUser() {
      this.$router.push('/newUser')
    },
    openCard(i) {
      this.$store.commit("selectUser", this.users.entries[i]);
      this.$store.commit("toggleFullViewStatus");
      this.$emit('setCode', this.users.entries[i].id);
      this.$refs.userCard.setCode(this.users.entries[i].id);
    },
    editUser(id) {
      this.$router.push(`/editUser/${id}`)
    },
    openUser(id) {
      this.$router.push(`/profile/${id}`)
    },
    async searchUsers() {
      this.users.entries = this.users.search.length ? this.users.entries = await this.users.collection.find({
        $or: [
          { fullName: new RegExp(this.users.search, 'i') },
          { id: new RegExp(this.users.search, 'i') },
          { username: new RegExp(this.users.search, 'i') }
        ]
      }).skip(this.users.page * this.users.limit).limit(this.users.limit).toArray() : await this.users.collection.find(this.users.page * this.users.limit).limit(this.users.limit).toArray();
      this.users.total = this.users.search.length ? await this.users.collection.count({
        $or: [
          { fullName: new RegExp(this.users.search, 'i') },
          { id: new RegExp(this.users.search, 'i') },
          { username: new RegExp(this.users.search, 'i') }
        ]
      }) : await this.users.collection.count();
      this.users.pages = Math.round(this.users.total / 10)
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