/** @description 用户仓库（用于存放用户信息，token、个人信息等） */
import { emailLogin, getInfo, login } from '@/api/auth'
import type { PwdLoginParamsT, EmailLoginParamsT } from '@/api/auth'
import { piniaPersistConfig } from '../plugins/pinia'
import { defineStore } from 'pinia'
import { ResponseT } from '@/utils/request'
import router from '@/router'
import { notify } from '@/components/Notification'

const storeName = 'Auth'

type State = {
    token: string
    userInfo: any
}

export const useAuthStore = defineStore({
    id: storeName,
    state: (): State => ({
        token: '',
        userInfo: {}
    }),
    getters: {
        // 判断用户是否登录
        isLogin(): boolean {
            return !!this.token
        },
        // 获取用户信息
        userInfoGetter(): any {
            if (!this.userInfo) return {}
            return this.userInfo || {}
        }
    },
    actions: {
        // 登录
        async login(params: PwdLoginParamsT | EmailLoginParamsT) {
            let res: null | ResponseT<any> = null
            // 类型收窄
            if ('email' in params) {
                res = await emailLogin(params) // 邮箱登录
            } else {
                res = await login(params) // 普通登录
            }

            const { code, data } = res
            if (code !== 0) return

            this.token = data

            await this.getUserInfo() // 登录成功后获取一次用户信息
            router.push({ name: 'Dashboard' }) // 然后跳转到

            notify('登录成功')
        },
        // 退出登录
        async logout() {
            router.push({ name: 'Login' }) // 跳转到 登录页
            this.$reset() // 清空用户信息
        },
        // 获取用户信息
        async getUserInfo(): Promise<boolean> {
            if (!this.isLogin) return false
            const { code, data } = await getInfo()
            if (code !== 0) return false
            this.userInfo = data
            return true
        }
    },
    persist: piniaPersistConfig(storeName) // 持久化：将用户信息存在浏览器内存中（知识点：LocalStorage）
})
