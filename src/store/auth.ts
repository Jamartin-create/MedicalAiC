/** @description 用户仓库 */
import { emailLogin, login } from '@/api/auth'
import type { PwdLoginParamsT, EmailLoginParamsT } from '@/api/auth'
import { piniaPersistConfig } from '../plugins/pinia'
import { defineStore } from 'pinia'
import { ResponseT } from '@/utils/request'
import router from '@/router'
import { notify } from '@/components/Notification'

const storeName = 'Auth'

export const useAuthStore = defineStore({
    id: storeName,
    state: () => ({
        token: '',
    }),
    getters: {
        isLogin(): boolean {
            return !!this.token
        }
    },
    actions: {
        // 登录
        async login(params: PwdLoginParamsT | EmailLoginParamsT) {
            let res: null | ResponseT = null
            // 类型收窄
            if("email" in params) {
                res = await emailLogin(params)
            } else {
                res = await login(params)
            }

            const { code, data, msg } = res;
            if (code !== 0) {
                // TODO: 提示弹窗
                console.log(msg)
                return
            }
            
            this.token = data
            router.push({ name: 'Dashboard' })

            notify('登录成功')
        }
    },
    persist: piniaPersistConfig(storeName)
})
