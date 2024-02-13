/** @description 用户仓库 */
import { login } from '@/api/auth'
import { piniaPersistConfig } from '../plugins/pinia'
import { defineStore } from 'pinia'

const storeName = 'Auth'

export const UserStore = defineStore({
    id: storeName,
    state: () => ({
        token: '',
    }),
    getters: {
        isLogin() {
            return this.isLogin
        }
    },
    actions: {
        async login(username: string, pwd: string) {
            const res = await login({username, password: pwd})
            console.log(res)
        }
    },
    persist: piniaPersistConfig(storeName)
})
