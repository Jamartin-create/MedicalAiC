import { createApp } from 'vue'
import './style.css'
import '@/assets/style/global.css'
import '@/assets/style/preset.css'
import App from './App.vue'

// vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// plugins
import pinia from './plugins/pinia'
import vuetify from './plugins/vuetify'

// router
import router from './router'

// global Component
import { NotificationPlugin } from '@/components/Notification'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify)
app.use(NotificationPlugin)
app.mount('#app')
