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
          redirect: '/catgallery'
        },
        {
          path: 'catgallery',
          name: 'CatGallery',
          component: () => import('@/views/CatGallery.vue')
        },
        {
          path: 'dashboard',
          name: 'Dashboard', 
          component: () => import('@/views/Dashboard.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    }
  ]
})

export default router