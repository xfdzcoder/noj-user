import 'element-plus/dist/index.css'
import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from '@/router'

import VueCalendarHeatmap from 'vue3-calendar-heatmap'

const app = createApp(App)

let pinia = createPinia()
pinia.use(createPersistedState({
  storage: localStorage
}))
app.use(pinia)
app.use(router)
app.use(VueCalendarHeatmap)

app.mount('#app')
