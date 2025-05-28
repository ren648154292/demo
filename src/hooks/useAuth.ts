import { useRouter } from 'vue-router'

export default function useAuth() {
  const router = useRouter()
  
  const login = () => {
    console.log('Logging in...')
    router.push('/')
  }

  const logout = () => {
    router.push('/login')
  }

  return {
    login,
    logout
  }
}