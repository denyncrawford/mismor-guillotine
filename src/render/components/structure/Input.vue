<template>
  <input v-model="model" type="text" :placeholder="placeholder" class="text-white py-2 px-5 bg-transparent rounded border outline-none border-1 border-blue-400">
</template>

<script>
export default {
  props: ['placeholder','model']
}
</script>