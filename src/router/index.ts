import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
import { useAuthStore } from '@/store/auth'
import routes from './routes'
import { notify } from '@/components/Notification'

const router = createRouter({
    history:
        import.meta.env.VITE_ROUTER_MODE === 'hash'
            ? createWebHashHistory()
            : createWebHistory(),
    routes,
    // 保存滚动条位置
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

// 路由守卫
router.beforeEach((to, _, next) => {
    const auth = useAuthStore()

    // 需要鉴权的页面非登录状态下不可进入
    if (to.meta?.isAuth && !auth.isLogin) {
        notify('请先登录')
        next({ name: 'Login' })
        return
    }

    // 已登录状态下不可再进入登陆界面
    if (['Login'].includes(to.name as string) && auth.isLogin) {
        next({ name: 'Dashboard' })
        return
    }
    next()
})

export default router
