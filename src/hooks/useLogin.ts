import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

export interface LoginForm {
  username: string
  password: string
  remember: boolean
}

export const useLogin = () => {
  const router = useRouter()
  const loginFormRef = ref<FormInstance>()
  const loading = ref(false)

  const loginForm = reactive<LoginForm>({
    username: 'admin',
    password: '1234567',
    remember: false,
  })

  const loginRules: FormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
    ],
  }

  const handleInput = (field: keyof LoginForm) => {
    console.log(`${field} 输入变化:`, loginForm[field])
  }

  const handleLogin = () => {
    if (!loginFormRef.value) return
    
    loginFormRef.value.validate((valid) => {
      if (!valid) {
        ElMessage.warning('请正确填写登录信息')
        return
      }

      loading.value = true

      // 模拟登录请求
      setTimeout(() => {
        loading.value = false
        if (loginForm.username === 'admin' && loginForm.password === '1234567') {
          ElMessage.success('登录成功')

          // 设置认证状态
          localStorage.setItem('isAuthenticated', 'true')

          // 如果勾选记住密码则存储信息
          if (loginForm.remember) {
            localStorage.setItem(
              'loginInfo',
              JSON.stringify({
                username: loginForm.username,
                password: loginForm.password,
              })
            )
          } else {
            localStorage.removeItem('loginInfo')
          }

          // 跳转到首页
          router.push('/catgallery')
        } else {
          ElMessage.error('用户名或密码错误，请重试')
        }
      }, 1500)
    })
  }

  return {
    loginFormRef,
    loading,
    loginForm,
    loginRules,
    handleInput,
    handleLogin,
  }
} 