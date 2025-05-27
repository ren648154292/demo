import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: '/', 
      redirect: '/login'
    },
    { 
      path: '/login', 
      name: 'Login', 
      component: () => import('@/views/Login.vue') 
    },
    { 
      path: '/catgallery', 
      name: 'CatGallery',
      component: () => import('@/views/CatGallery.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      return { name: 'Login' }
    }
  }
})

export default router