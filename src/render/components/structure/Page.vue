<template>
  <div class="min-w-screen container p-10 px-16">
    <h1 class="text-white text-lg uppercase" >{{ title }}</h1>
    <p class="text-3xl max-w-xl text-blue-400 uppercase font-thin mb-10">{{ description }}</p>
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