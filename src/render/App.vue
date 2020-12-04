<template>
  <router-view></router-view>
</template>
<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { persistentSotrage as state } from './store';
export default {
  name: 'app',
  setup() {
    const router = useRouter()
    router.push('/loading');
    router.beforeEach((to, from) => {
      document.title = to.meta.title + ' - Guillotine' || 'Guillotine'
    })
  },
  async mounted() {
    const router = this.$router;
    let store = this.$store;
    let config = await state.get("config");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
    }, Math.floor(Math.random() * (10000 - 3000 + 1) + 3000));
    })
    if (config && config?.savedSession) {
      store.commit('setConfig', config);
      router.push('/mode');
    } else if (config && !config?.savedSession) {
      store.commit('setConfig', config)
      router.push('/login')
    } else if (!config) {
      router.push('/init')
    }
  }
}
</script>