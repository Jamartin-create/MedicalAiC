import AuthWrpVue from '@/layout/AuthWrp.vue';
import ContainerWrpVue from '@/layout/ContainerWrp.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: AuthWrpVue,
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () => import('@/pages/auth/Login.vue'),
        meta: { title: 'MC - 登录' },
      },
      {
        path: "/auth/register",
        name: "Register",
        component: () => import('@/pages/auth/Register.vue'),
        meta: { title: 'MC - 注册' },
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/home',
    component: ContainerWrpVue,
    meta: { title: 'MC - 你的生活助手', isAuth: true },
    children: [
      {
        path: "/dashboard/home",
        name: "Home",
        component: () => import('@/pages/dashboard/Home.vue'),
        meta: { title: 'MC - 工作台', isAuth: true }
      },
      {
        path: "/dashboard/chat",
        name: "ChatRoot",
        redirect: '/dashboard/chat/create',
        children: [
          {
            path: "/dashboard/chat/:id",
            name: "Chat",
            component: () => import('@/pages/chat/Detail.vue'),
            meta: { title: 'MC - 问答', isAuth: true }
          },
        ]
      },
      {
        path: "/dashboard/case/list",
        name: "CaseList",
        component: () => import('@/pages/case/List.vue'),
        meta: { title: 'MC - 病例列表', isAuth: true }
      },
      {
        path: "/dashboard/case/create",
        name: "CaseCreate",
        component: () => import('@/pages/case/Create.vue'),
        meta: { title: 'MC - 创建病例', isAuth: true }
      },
      {
        path: "/dashboard/case/detail",
        name: "CaseDetail",
        component: () => import('@/pages/case/Detail.vue'),
        meta: { title: 'MC - 病例详情', isAuth: true }
      },
      {
        path: "/dashboard/plan/list",
        name: "PlanList",
        component: () => import('@/pages/plan/List.vue'),
        meta: { title: 'MC - 计划列表', isAuth: true }
      },
      {
        path: "/dashboard/plan/create",
        name: "PlanCreate",
        component: () => import('@/pages/plan/Create.vue'),
        meta: { title: 'MC - 创建计划', isAuth: true }
      },
      {
        path: "/dashboard/plan/detail",
        name: "PlanDetail",
        component: () => import('@/pages/plan/Detail.vue'),
        meta: { title: 'MC - 计划详情', isAuth: true }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/pages/user/Detail.vue'),
    meta: {title: 'MC - 个人中心', isAuth: true }
  }
]

export default routes