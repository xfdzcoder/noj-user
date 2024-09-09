import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoaded
} from 'vue-router'
import { useUserStore } from '@/stores/userInfo'
import { ElMessage } from 'element-plus'
import Index from '@/views/index/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/user',
      component: Index,
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
  console.log(! isLogin())
  if (to.meta?.needLogin && ! isLogin()) {
    ElMessage.warning('请先进行登录')
    return { path: '/portal/login' }
  }
  return
})

export default router
