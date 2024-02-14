import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// plugins
import pinia from './plugins/pinia'
import vuetify from './plugins/vuetify'

// router
import router from './router'

createApp(App)
    .use(router)
    .use(pinia)
    .use(vuetify)
    .mount('#app')
