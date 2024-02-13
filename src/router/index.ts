import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import routes from "./routes";

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

router.beforeEach((_, __, next) => {
//   const auth = useAuthStore();
//   if (to.meta?.isAuth && !auth.isLoggin) {
//     window.alert("请先登录");
//     next({ name: "login" });
//     return;
//   }
//   if (["login"].includes(to.name) && auth.isLoggin) {
//     window.alert("已登录");
//     next(from);
//     return;
//   }
  next();
});

export default router;
