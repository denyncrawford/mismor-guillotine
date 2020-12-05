<template>
  <div class="flex justify-center text-center items-center flex-col min-h-screen min-w-screen p-10 px-16">
    <div>
      <h1 class="w-96 rounded py-1 px-2 inline text-back uppercase mb-5 bg-main-color">{{ title }}</h1>
      <p class="text-3xl mt-5 mx-auto max-w-xs text-blue-400 uppercase font-thin mb-8">{{ description }}</p>
      <div>
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title','description']
}
</script>