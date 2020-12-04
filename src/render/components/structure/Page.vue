<template>
  <div class="bg-back min-w-screen min-w-screen min-h-screen p-10 px-16">
    <h1 class="w-96 rounded py-1 px-2 inline text-back uppercase mb-5 bg-main-color" >{{ title }}</h1>
    <p class="text-3xl mt-5 max-w-lg text-blue-400 uppercase font-thin mb-8">{{ description }}</p>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title','description']
}
</script>