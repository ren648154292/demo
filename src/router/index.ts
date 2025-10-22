import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: 'image-effects',
          name: 'ImageEffectsTable',
          component: () => import('@/views/ImageEffectsTable.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'catgallery',
          name: 'CatGallery',
          component: () => import('@/views/CatGallery.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'readdy',
          name: 'Readdy',
          component: () => import('@/views/Readdy.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'daily-briefing',
          name: 'DailyBriefing',
          component: () => import('@/views/DailyBriefing.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/catgallery'
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // 假设使用token验证
  
  // 如果路由需要认证且用户未登录
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } 
  // 如果路由仅限游客且用户已登录
  else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'CatGallery' }) // 重定向到首页
  }
  // 其他情况正常放行
  else {
    next()
  }
})

export default router