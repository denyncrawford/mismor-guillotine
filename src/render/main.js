import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/themes/dndb/index.css';
import locale from 'element-plus/lib/locale/lang/es'
import './assets/styles/index.css'
import 'animate.css/animate.min.css'
import './index.css'

import router from './router'
import { store } from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementUI, { locale })
app.mount('#app')
