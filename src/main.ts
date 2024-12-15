import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import websocket from './services/homeassistant-websoket/homeassistant-websoket.plugin'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import deDE from './locales/de-DE.json'

type MessageSchema = typeof deDE
export const i18n = createI18n<[MessageSchema], 'de-DE'>({
  locale: 'de-DE',
  messages: {
    'de-DE': deDE,
  },
})

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(mdiVue, { icons: mdijs })
app.use(createPinia())
app.use(router)
app.use(websocket)
app.use(i18n)

app.mount('#app')
