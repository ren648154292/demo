<template>
  <div class="main-layout">
    <!-- 固定头部 -->
    <header
      class="layout-header flex items-center justify-between bg-white shadow-sm"
    >
      <div class="header-content flex items-center">
        <img src="@/assets/img/logo.png" alt="Logo" class="h-8 mr-4" />
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
    </header>

    <div class="layout-container">
      <!-- 固定侧边栏 -->
      <aside class="layout-sidebar">
        <el-menu
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/dashboard">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <span>(>^ω^<)喵</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 可滚动内容区域 -->
      <main class="layout-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginForm } from '@/stores/login';

const router = useRouter();
const loginStore = useLoginForm();

const logout = () => {
  loginStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.layout-container {
  display: flex;
  margin-top: 60px;
  height: calc(100vh - 60px);
}

.layout-sidebar {
  width: 220px;
  height: 100%;
  background: #545c64;
  position: fixed;
  left: 0;
  overflow-y: auto;
}

.layout-content {
  flex: 1;
  margin-left: 220px;
  overflow-y: auto;
  height: 100%;
}
</style>
