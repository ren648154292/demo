import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  const route = useRoute()
  const isAuthenticated = ref(false)

  // 检查认证状态
  const checkAuth = () => {
    isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  }

  // 登录
  const login = () => {
    localStorage.setItem('isAuthenticated', 'true')
    checkAuth()
  }

  // 登出
  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    checkAuth()
    router.push('/login')
  }

  // 初始检查
  checkAuth()

  // 监听路由变化和认证状态
  watchEffect(() => {
    if (!isAuthenticated.value && route?.meta?.requiresAuth) {
      console.log('未认证，重定向到登录页')
      router.push('/login')
    }
  })

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}