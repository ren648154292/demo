import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ElMessage, ElLoading, type FormInstance } from 'element-plus';
import { useLoginForm } from '@/stores/login';

export const useLogin = () => {
  const router = useRouter();
  const loginFormRef = ref<FormInstance>();
  const loginStore = useLoginForm();
  const { username, password } = storeToRefs(loginStore);
  
  const loginForm = ref({
    username: username.value,
    password: password.value,
    remember: false
  });

  watch(loginForm.value, (newValue) => {
    username.value = newValue.username;
    password.value = newValue.password;
  });

  watch([username, password], ([newUsername, newPassword]) => {
    loginForm.value.username = newUsername;
    loginForm.value.password = newPassword;
  });

  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  };

  const handleLogin = async () => {
    let loadingInstance: ReturnType<typeof ElLoading.service>;
    try {
      await loginFormRef.value?.validate();
      loadingInstance = ElLoading.service({
        lock: true,
        text: '登录中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      
      const success = await loginStore.login(loginForm.value.username, loginForm.value.password);
      if (success) {
        ElMessage.success('登录成功');
        setTimeout(() => {
          loadingInstance.close();
          router.push('/');
        }, 1000);
      } else {
        loadingInstance.close();
        ElMessage.error('用户名或密码错误');
      }
    } catch (error) {
      if (loadingInstance) {
        loadingInstance.close();
      }
      if (error instanceof Error) {
        ElMessage.error(error.message);
      }
    }
  };

  return {
    loginFormRef,
    loginForm,
    rules,
    handleLogin,
  };
};