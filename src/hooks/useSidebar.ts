import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

interface MenuItem {
  index: string
  title: string
  icon?: string
  children?: MenuItem[]
}

export function useSidebar() {
  // 默认菜单配置
  const menuItems = ref<MenuItem[]>([
    {
      index: '/dashboard',
      title: '首页'
    },
    {
      index: '/catgallery',
      title: '(>^ω^<)喵'
    },
    {
      index: '/readdy',
      title: 'readdy.ai'
    },
    {
      index: '/daily-briefing',
      title: '每日简报'
    },
    {
      index: '/image-effect',
      title: '图片效果'
    }
  ])


  // 添加菜单项
  const addMenuItem = (item: MenuItem) => {
    menuItems.value.push(item)
  }

  return {
    menuItems,
    addMenuItem
  }
}