<template>
  <el-container class="h-screen">
    <el-header class="flex items-center justify-between bg-white shadow-sm">
      <div class="flex items-center">
        <img src="@/assets/img/logo.png" alt="Logo" class="h-8 mr-4">
        <h1 class="text-xl font-semibold">Cat Admin</h1>
      </div>
      <div class="flex items-center">
        <el-dropdown>
          <span class="flex items-center">
            <el-avatar :size="32" class="mr-2" />
            <span>Admin</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeMenu"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/catgallery">
            <el-icon><Picture /></el-icon>
            <span>Cat Gallery</span>
          </el-menu-item>
          <el-menu-item index="/dashboard">
            <el-icon><DataBoard /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Picture, DataBoard } from '@element-plus/icons-vue'
import useAuth from '@/hooks/useAuth'
import useMenu from '@/hooks/useMenu'

const { logout } = useAuth()
const { activeMenu } = useMenu()
</script>

<style scoped>
.el-container {
  background-color: #f5f5f5;
}
.el-aside {
  background-color: #545c64;
}
.el-menu {
  border-right: none;
}
.el-header {
  border-bottom: 1px solid #eee;
}
</style>