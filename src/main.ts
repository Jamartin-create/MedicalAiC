import { createApp } from 'vue'
import './style.css'
import '@/assets/style/global.css'
import '@/assets/style/preset.css'
import App from './App.vue'

// vuetify - 组件库样式
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// plugins - 插件
import pinia from './plugins/pinia' // 可以理解为全局变量
import vuetify from './plugins/vuetify' // 组件库

// router
import router from './router' // 路由

// global Component
import { NotificationPlugin } from '@/components/Notification' // 全局组件

const app = createApp(App) // 创建 APp

// 加载插件到 APP 中
app.use(router)
app.use(pinia)
app.use(vuetify)
app.use(NotificationPlugin)

// 挂载 APP （生成APP）
app.mount('#app')
