<template>
  <div class="app-container">
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.app-container {
  display: flex;
  height: 100vh;
}
.side-menu {
  width: 200px;
  height: 100%;
}
.main-content {
  flex: 1;
  overflow: auto;
}
</style>