import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/index/index.vue')
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

export default router
