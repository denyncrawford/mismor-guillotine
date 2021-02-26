<template>
  <page description="Rellena el formulario" title="Editar colaborador">
    <div>
      <h2 class="mb-2 font-bold text-white">Foto</h2>
      <button ref="file" class="bg-center bg-cover bg-no-repeat relative group hover:border-main-color p-10 border border-gray-400 rounded-md mb-5 border-dashed" @click="openFile">
        <div :class="{ file: 'text-transparent' }"><i class="group-hover:text-main-color text-gray-400 stroke-current " data-feather="plus"></i></div>
      </button>
    </div>
    <div>
      <h2 class="mb-2 font-bold text-white">Indentificación</h2>
      <input ref="name" v-model="currentData.name" type="text" placeholder="Nombre" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <input ref="lastName" v-model="currentData.lastName" type="text" placeholder="Apellido" class="mb-5 ml-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <div>
        <input ref="dni" v-model="currentData.dni" type="text" placeholder="DNI" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      </div>
    </div>
    <div>
      <h2 class="mb-2 font-bold text-white">Contacto</h2>
      <input ref="phone" v-model="currentData.phone" type="text" placeholder="Telefono" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <input ref="email" v-model="currentData.email" type="text" placeholder="Email" class="mb-5 ml-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
    </div>
    <div>
      <h2 class="mb-2 font-bold text-white">Cargo en la empresa</h2>
      <input ref="position" type="text" v-model="currentData.position" placeholder="Puesto" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
      <div class="mb-5">
        <el-switch
          v-model="currentData.admin"
          active-text="Es admin"
          inactive-text="No es admin">
        </el-switch>
      </div>
      <transition name="slide3">
        <div v-show="currentData.admin">
          <input v-model="currentData.username" type="text" placeholder="Nombre de usuario" class="mb-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
          <input v-model="currentData.password" type="password" placeholder="Contraseña" class="mb-5 ml-5 text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
        </div>
      </transition>
    </div>
    <div>
      <h2 class="mb-2 font-bold text-white">Fecha de entrada</h2>
      <el-date-picker
        ref="date"
        v-model="currentData.date"
        type="date"
        placeholder="Elije una fecha">
      </el-date-picker>
    </div>
    <div class="mt-10">
      <el-button @click="back" class="bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color">Cancelar</el-button>
      <el-button @click="save" class="bg-main-color text-back hover:text-back" type="primary">Continuar</el-button>
    </div>
  </page>
</template>

<script>
import Page from '../../components/structure/Page.vue'
const { copy } = require('fs-extra');
const { join } = require('path');
import shortid from 'shortid'
import { formatUser, updateObject } from "../../scripts/helpers.js"
const { dialog, app } = require('electron').remote;
import { replace } from 'feather-icons'
import { connect } from '../../store/index.js'
export default {
  data() {
    return {
      currentData: {
        file: "",
        admin: false,
        date: new Date(),
        name: "",
        lastName: "",
        dni: "",
        phone: "",
        email: "",
        position: "",
        password: "",
        username: ""
      },
      users: null
    }
  },
  components: {
    Page
  },
  async mounted() {
    replace();
    const database = this.$store.state.config.database;
    const db = await connect(database);
    this.users = db.collection("users");
    const { id } = this.$route.params;
    const user = await this.users.findOne({id})
    this.currentData = updateObject(this.currentData, user)
    this.$refs.file.style.backgroundImage = `url(${new URL(`file:///${this.currentData.file}`).href})`;
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async openFile() {
      let file = await dialog.showOpenDialog({ 
        properties: ['openFile'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        ]
      });
      this.currentData.file = file.filePaths[0];
      this.$refs.file.style.backgroundImage = `url(${new URL(`file:///${this.currentData.file}`).href})`;
    },
    async save() {
      const appPath = app.getPath('userData');
      let sign = this.currentData;
      const extension = sign.file.split(".").slice(-1)[0];
      let newFileName = shortid.generate() + "." + extension
      let newFile = join(appPath,"/pictures", newFileName);
      for (let k in sign) {
        if (k == "password" || k == "username" || k == "date" || k == "admin" || k == "_id") {
          continue;
        };
        if (!sign[k].length) {
          if (this.$refs[k]) this.$refs[k].style.borderColor = 'red';
          this.notify("Por favor rellenar el campo "+ k);
          return;
        }
      }
      await copy(sign.file, newFile)
      sign.file = newFile;
      let user = formatUser(sign)
      const { id } = this.$route.params;
      await this.users.updateOne({id}, { $set: user });
      this.$router.push('/admin') 
    },
    notify(message) {
      this.$message.error({
        showClose: true,
        message
      })
    }
  }
}
</script>

<style>
.slide3-enter-active {
   animation: fadeInDown;
   animation-duration: .2s;
  }

  .slide3-leave-active {
    animation: fadeOutUp;
    animation-duration: .2s;
  }

.el-input {
  min-width: 266px;
  min-height: 42px;
}

.el-input__inner {
  background-color: transparent!important;
  border-color: #60A5FA;
}

.el-select-dropdown {
  background-color: transparent!important;
  border: none;
}
.el-picker__popper.el-popper {
  background: #0e111f!important
}

.el-month-table td .cell {
  color: white;
}

.el-popper__arrow::before {
  color:  #0e111f;
  background-color:  #0e111f!important;
  fill:  #0e111f;
}

.el-picker-panel {
  background: #0e111f;
  color: white;
}

.el-date-table th, .el-year-table td .cell {
  color: white;
}

.el-date-table td.current:not(.disabled) span {
  background-color: #00eeff;
  color: #0e111f!important;
}

.el-date-table td.today span, .el-month-table td.today .cell, .el-year-table td.today .cell{
  color: #00eeff!important;
}

.el-date-picker__header-label {
  color: #00eeff;
}

.el-picker-panel__icon-btn {
  color: #00eeff
}
</style>