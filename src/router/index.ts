import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import routes from "./routes";
import { notify } from "@/components/Notification";

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_MODE === "hash"
      ? createWebHashHistory()
      : createWebHistory(),
    routes,
  // 保存滚动条位置
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();
  if (to.meta?.isAuth && !auth.isLogin) {
    notify('请先登录')
    next({ name: "Login" });
    return;
  }
  if (["Login"].includes(to.name as string) && auth.isLogin) {
    next({ name: 'Dashboard' });
    return;
  }
  next();
});

export default router;
