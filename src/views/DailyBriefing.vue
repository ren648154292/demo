<template>
  <div class="min-h-[1024px] bg-gray-50">
    <div class="mx-auto max-w-[1440px] px-8 py-12">
      <!-- 页面标题 -->
      <div class="mb-12">
        <h1 class="text-2xl font-bold text-gray-900">新闻</h1>
        <div class="mt-4 h-[2px] w-12 bg-blue-500"></div>
      </div>

      <!-- 新闻列表 -->
      <div class="space-y-6">
        <template v-if="loading">
          <div
            v-for="i in 5"
            :key="i"
            class="transform cursor-pointer rounded-lg bg-white p-6 shadow-sm"
          >
            <div class="h-7 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div
              class="h-4 bg-gray-200 rounded w-full mb-6 animate-pulse"
            ></div>
            <div class="flex justify-end">
              <div class="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- 新闻列表内容 -->
          <template v-for="news in newsList" :key="news.id">
            <div
              class="transform cursor-pointer rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:translate-y-[-4px] hover:shadow-md"
            >
              <div class="flex flex-col">
                <h2 class="mb-2 text-xl font-semibold text-gray-900">
                  {{ news.title }}
                </h2>
                <div class="mb-3 text-sm text-gray-500">
                  <el-icon class="mr-1"><Clock /></el-icon>
                  {{ news.mtime }}
                </div>
                <p class="mb-4 text-gray-600">{{ news.digest }}</p>
                <div class="flex justify-end">
                  <el-button
                    type="primary"
                    class="!rounded-button whitespace-nowrap"
                  >
                    <el-icon class="mr-1"><View /></el-icon>
                    查看详情
                  </el-button>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useDailyBriefing } from '@/hooks/useDailyBriefing';

const { newsList, loading, error, fetchNews } = useDailyBriefing();

onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.news-card {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-4px);
}
</style>
