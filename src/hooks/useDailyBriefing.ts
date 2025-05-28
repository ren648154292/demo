import { ref } from 'vue'
import axios from 'axios'

export function useDailyBriefing() {
  const newsList = ref<any[]>([])
  const loading = ref(false)
  const error = ref(null)

  const fetchNews = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await axios.post(
        'https://apis.tianapi.com/bulletin/index',
        new URLSearchParams({
          key: '4e57523dd757c77e4e514da51cf694fe'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      if (response.data.code === 200) {
        newsList.value = response.data.result?.list || []
      } else {
        throw new Error(response.data.msg || '获取数据失败')
      }
    } catch (err: any) {
      error.value = err.message
      console.error('获取每日简报失败:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    newsList,
    loading,
    error,
    fetchNews
  }
}