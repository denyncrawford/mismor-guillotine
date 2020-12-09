<template>
  <div class="bg-back min-w-screen min-w-screen min-h-screen p-10 px-16">
    <div class="flex items-center">
      <div>
        <h1 class="w-96 rounded py-1 px-2 inline text-back uppercase mb-5 bg-main-color" >{{ title }}</h1>
      </div>
      <el-button v-show="exit" size="mini" @click="goExit" class="ml-auto bg-back text-red hover:bg-back hover:border-main-color hover:text-main-color" type="primary">Salir</el-button>
    </div>
    <p class="text-3xl mt-5 max-w-lg text-blue-400 uppercase font-thin mb-8">{{ description }}</p>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title','description','exit'],
  methods: {
    goExit() {
      this.$router.push(`/${this.exit}`)
    }
  }
}
</script>