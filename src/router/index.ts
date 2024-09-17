import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoaded
} from 'vue-router'
import { useUserStore } from '@/stores/userInfo'
import { ElMessage } from 'element-plus'
import IndexLayout from '@/components/IndexLayout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IndexLayout,
      redirect: '/index',
      meta: {
        needLogin: true
      },
      children: [
        {
          path: 'index',
          name: 'Index',
          component: () => import('@/views/index/index.vue')
        }
      ]
    },
    {
      path: '/user',
      component: IndexLayout,
      children: [
        {
          path: 'dashboard',
          name: 'UserDashboard',
          component: () => import('@/views/user/dashboard/index.vue')
        },
        {
          path: 'info',
          name: 'UserInfo',
          component: () => import('@/views/user/info/index.vue')
        }
      ]
    },
    {
      path: '/question',
      component: IndexLayout,
      children: [
        {
          path: 'code/:infoId',
          component: () => import('@/views/question/code/index.vue')
        },
        {
          path: 'bank/:bankId',
          component: () => import('@/views/question/bank/detail.vue')
        }
      ]
    },
    {
      path: '/community',
      component: IndexLayout,
      children: [
        {
          path: 'info/:infoId',
          component: () => import('@/views/community/info/index.vue')
        }
      ]
    },
    {
      path: '/portal',
      children: [
        {
          path: 'login',
          component: () => import('@/views/portal/login/index.vue')
        }
      ]
    }
  ]
})


router.beforeEach((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => {
  const { isLogin } = useUserStore()
  if (to.meta?.needLogin && ! isLogin()) {
    ElMessage.warning('请先进行登录')
    return { path: '/portal/login' }
  }
  return
})

export default router
