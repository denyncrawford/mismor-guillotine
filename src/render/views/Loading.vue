<template>
  <div class="bg-back flex flex-col h-screen justify-center items-center">
    <div class="img -mt-16"></div>
    <h1 class="text-blue-400 text-3xl font-bold">Por favor espere.</h1>
    <p class="text-gray-400">En este momento estamos cargando la configuración.</p>
  </div>
</template>

<style scoped>
.img {
  background-image: url('../assets/loader.gif');
  background-position: center;
  background-size: cover;
  height: 200px;
  width: 500px;
  color: #00eeff
}
</style>
