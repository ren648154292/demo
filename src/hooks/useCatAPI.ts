import { ref } from 'vue'
import axios from 'axios'

export default function useCatAPI() {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<Array<{ id: string; url: string }>>([])

  const fetchCats = async (limit = 10) => {
    try {
      loading.value = true
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        params: { limit }
      })
      data.value = response.data.map((item: any) => ({
        id: item.id,
        url: item.url
      }))
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    fetchCats
  }
}