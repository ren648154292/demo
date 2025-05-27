<template>
  <div class="container">
    <el-button type="primary" @click="fetchCats(10)">加载猫咪</el-button>
    
    <el-skeleton :loading="loading" animated :count="10" :throttle="500">
      <template #template>
        <el-row :gutter="12">
          <el-col :span="6" v-for="n in 10" :key="n">
            <el-skeleton-item variant="image" style="width: 100%; height: 200px" />
          </el-col>
        </el-row>
      </template>

      <template #default>
        <el-row :gutter="12">
          <el-col :span="6" v-for="cat in data" :key="cat.id">
            <el-image 
              :src="cat.url" 
              fit="cover" 
              style="width: 100%; height: 200px"
              :preview-src-list="data.map(c => c.url)"
            />
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import useCatAPI from '@/hooks/useCatAPI'

const { loading, data, fetchCats } = useCatAPI()
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>