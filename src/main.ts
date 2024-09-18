import 'element-plus/dist/index.css'
import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from '@/router'

import VueCalendarHeatmap from 'vue3-calendar-heatmap'

import DevUI from 'vue-devui'
import 'vue-devui/style.css'
import '@devui-design/icons/icomoon/devui-icon.css'
import { ThemeServiceInit, infinityTheme } from 'devui-theme'

ThemeServiceInit({ infinityTheme }, 'infinityTheme')

import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'

const app = createApp(App)

let pinia = createPinia()
pinia.use(createPersistedState({
  storage: localStorage
}))
app.use(pinia)
app.use(router)
app.use(VueCalendarHeatmap)
app.use(DevUI)
app.use(UndrawUi)

app.mount('#app')
