<template>
  <transition name="slide">
    <div v-if="visible" class="absolute overscroll-none w-screen z-50 -top-0 -left-0 bg-back flex flex-col h-screen justify-center items-center">
      <div class="img -mt-16"></div>
      <h1 class="text-blue-400 text-3xl font-bold">Por favor espere.</h1>
      <p class="text-gray-400">{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['message','visible']
}
</script>

<style scoped>
.img {
  background-image: url('../assets/loader.gif');
  background-position: center;
  background-size: cover;
  height: 200px;
  width: 500px;
  color: #00eeff
}

.slide-enter-active {
   animation: fadeInRight;
   animation-duration: .2s;
  }

  .slide-leave-active {
    animation: fadeOutLeft;
    animation-duration: .2s;
  }
</style>

