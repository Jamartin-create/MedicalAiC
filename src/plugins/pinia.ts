import { createPinia } from 'pinia'
import piniaPluginPre from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPre)

/**
 * @description pinia 持久化参数配置
 * @param key 存储到 Storage 中的 key
 * @returns persist
 */
export function piniaPersistConfig(key: string) {
  return {
    key,
    storage: window.localStorage
  }
}

export default pinia
