<template>
  <div
    v-show="visible"
    class="-top-0 -left-0 z-10 h-screen w-screen absolute"
  >
    <div
      class="main flex justify-center items-center bg-back h-full w-full bg-opacity-60"
    >
      <transition name="slideup">
        <div
          v-show="visible"
          ref="cardtake"
          class="userCard bg-gradient-to-b from-teal-400 to-blue-600 p-8 rounded-3xl"
        >
          <div class="flex flex-col items-center justify-center">
            <div
              :style="[
                user?.file
                  ? { background: `url(${image})` }
                  : { background: 'blue' },
              ]"
              class="userimage bg-center bg-cover bg-no-repeat w-44 h-44 bg-indigo-800 rounded-full"
            ></div>
            <div class="text-center mt-5 uppercase text-white font-bold">
              <h1 class="text-3xl">{{ user?.fullName || "John Doe" }}</h1>
              <h1 class="text-xs">{{ user?.id }}</h1>
            </div>
            <div :class="[!type ? 'bg-red-600': 'bg-main-color']" class="mt-5 py-1 px-2 rounded uppercase">
              <h1 v-show="!deny" class="font-bold">{{ type ? 'Entrada' : 'Salida' }}: {{ time }}</h1>
              <h1 v-show="deny" class="font-bold">No puede iniciar otro turno hoy.</h1>
            </div>
            <div v-show="!deny" :class="[!type ? 'bg-red-600': 'bg-main-color']" class="rounded-full mt-5 p-2">
              <i class="text-white stroke-current" data-feather="check"></i>
            </div>
            <div v-show="deny" :class="[!type ? 'bg-red-600': 'bg-main-color']" class="rounded-full mt-5 p-2">
              <i class="text-white stroke-current" data-feather="x"></i>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { replace } from 'feather-icons'
import dayjs from 'dayjs';
export default {
  data() {
    return {
      visible: false,
      user: {},
      timeout: null,
      type: true,
      time: '',
      deny: false
    };
  },
  mounted() {
    replace()
  },
  methods: {
    show(user, type, deny) {
      clearTimeout(this.timeout)
      this.type = typeof type === 'undefined' ? true : type;
      this.user = user;
      this.deny = typeof deny === 'undefined' ? false : deny;
      this.time = dayjs(new Date()).format('hh:mm:ss A')
      this.visible = true;
      this.timeout = setTimeout(() => {
        this.$refs.cardtake.classList.remove('slideup-enter-active');
        this.$refs.cardtake.classList.add('slideup-leave-active');
        setTimeout(() => this.visible = false, 290)
      }, 3000)
    },
  },
  computed: {
    image() {
      return new URL(`file:///${this.user?.file}`).href;
    }
  },
};
</script>

<style scoped>
.main {
  backdrop-filter: blur(2px);
}

.slideup-enter-active {
  animation: zoomIn;
  animation-duration: 0.3s;
}

.slideup-leave-active {
  animation: zoomOut;
  animation-duration: 0.3s;
}

.userimage {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center !important;
}
</style>