import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default function useMenu() {
  const route = useRoute()
  const activeMenu = ref('/catgallery')

  watch(
    () => route.path,
    (newPath) => {
      activeMenu.value = newPath
    }
  )

  return {
    activeMenu
  }
}