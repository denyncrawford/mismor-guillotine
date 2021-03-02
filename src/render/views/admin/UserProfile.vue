<template>
  <div class="bg-back min-w-screen min-w-screen min-h-screen p-10 px-16">
    <div class="p-5 border border-gray-800 rounded-xl">
      <div class="flex p-5 inline bg-gray-900 rounded-xl">
        <div :style="[user?.file ? { background: `url(${image})` } : {background : 'blue'}]" class="userimage bg-center bg-cover bg-no-repeat w-44 h-44 bg-indigo-800 rounded-full"></div>
        <div class="mx-10">
          <h2 class="mt-2 mb-4 text-3xl max-w-lg text-main-color uppercase font-thin">{{user.fullName}}</h2>
          <h2 class="inline mb-2 bg-main-color px-2 rounded">{{user.position}}</h2>
          <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">Fecha de entrada:</span> {{date}}</h2>
          <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">Telefono:</span>: {{user.phone}}</h2>
          <transition name="slide3">
            <div class="mb-5" v-show="see">
              <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">DNI:</span> {{user.dni}}</h2>
              <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">Usuario:</span> {{user.username}}</h2>
              <h2 class="mb-2 mt-2 text-sm text-white"><span class="font-bold text-gray-400">ID:</span> {{user.id}}</h2>
            </div>
          </transition>
          <h2 @click="see = !see" v-show="!see" class="mt-2 text-xs mb-2 font-bold text-main-color cursor-pointer">VER MAS</h2>
          <h2 @click="see = !see" v-show="see" class="mt-2 text-xs mb-2 font-bold text-main-color cursor-pointer">VER MENOS</h2>
        </div>
        <div class="ml-auto">
          <button @click="editUser($route.params.id)" class="mr-5 cursor-pointer p-2 rounded-full ml-auto text-main-color hover:bg-main-color hover:border-main-color hover:text-back" type="primary"><i data-feather="edit" class="w-5 h-5"></i></button>
          <button @click="$router.go(-1)" class="cursor-pointer p-2 rounded-full ml-auto text-main-color hover:bg-main-color hover:border-main-color hover:text-back" type="primary"><i data-feather="x" class="w-5 h-5"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Page from '../../components/structure/Page.vue'
import { connect } from '../../store/index.js'
import dayjs from 'dayjs';
import { replace, icons as fIcons } from 'feather-icons'
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
      see: false
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
  },
  methods: {
    editUser(id) {
      this.$router.push(`/editUser/${id}`)
    }
  },
  components: {
    Page
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
</style>