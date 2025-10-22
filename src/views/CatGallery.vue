<template>
  <div class="container">
    <div class="toolbar">
      <el-button type="primary" @click="fetchCats(10)" class="!rounded-button whitespace-nowrap">加载猫咪</el-button>
      <el-button @click="resetFilters" class="!rounded-button whitespace-nowrap">重置</el-button>
      <el-button-group class="ml-2 presets">
        <el-button @click="applyPreset('none')" class="!rounded-button whitespace-nowrap">原图</el-button>
        <el-button @click="applyPreset('noir')" class="!rounded-button whitespace-nowrap">黑白</el-button>
        <el-button @click="applyPreset('warm')" class="!rounded-button whitespace-nowrap">暖色</el-button>
        <el-button @click="applyPreset('cool')" class="!rounded-button whitespace-nowrap">冷色</el-button>
        <el-button @click="applyPreset('vintage')" class="!rounded-button whitespace-nowrap">复古</el-button>
        <el-button @click="applyPreset('blur')" class="!rounded-button whitespace-nowrap">景深</el-button>
      </el-button-group>
    </div>

    <el-card class="mb-4">
      <el-form label-position="left" label-width="80px" class="filters-grid">
        <el-form-item label="模糊">
          <el-slider v-model="filters.blur" :max="20" :step="1" show-input />
        </el-form-item>
        <el-form-item label="灰度">
          <el-slider v-model="filters.grayscale" :max="100" :step="1" show-input />
        </el-form-item>
        <el-form-item label="褐色">
          <el-slider v-model="filters.sepia" :max="100" :step="1" show-input />
        </el-form-item>
        <el-form-item label="饱和度">
          <el-slider v-model="filters.saturate" :max="300" :min="0" :step="1" show-input />
        </el-form-item>
        <el-form-item label="色相">
          <el-slider v-model="filters.hueRotate" :max="360" :min="0" :step="1" show-input />
        </el-form-item>
        <el-form-item label="反相">
          <el-slider v-model="filters.invert" :max="100" :min="0" :step="1" show-input />
        </el-form-item>
        <el-form-item label="不透明">
          <el-slider v-model="filters.opacity" :max="100" :min="0" :step="1" show-input />
        </el-form-item>
        <el-form-item label="亮度">
          <el-slider v-model="filters.brightness" :max="200" :min="0" :step="1" show-input />
        </el-form-item>
        <el-form-item label="对比度">
          <el-slider v-model="filters.contrast" :max="200" :min="0" :step="1" show-input />
        </el-form-item>
      </el-form>
    </el-card>
    
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
              :style="{ width: '100%', height: '200px', filter: filterStyle }"
              :preview-src-list="data.map(c => c.url)"
            />
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import useCatAPI from '@/hooks/useCatAPI'

const { loading, data, fetchCats } = useCatAPI()

type FilterState = {
  blur: number
  grayscale: number
  sepia: number
  saturate: number
  hueRotate: number
  invert: number
  opacity: number
  brightness: number
  contrast: number
}

const defaultFilters: FilterState = {
  blur: 0,
  grayscale: 0,
  sepia: 0,
  saturate: 100,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  brightness: 100,
  contrast: 100,
}

const filters = reactive<FilterState>({ ...defaultFilters })

const filterStyle = computed(() => {
  const parts = [
    `grayscale(${filters.grayscale}%)`,
    `sepia(${filters.sepia}%)`,
    `saturate(${filters.saturate}%)`,
    `hue-rotate(${filters.hueRotate}deg)`,
    `invert(${filters.invert}%)`,
    `opacity(${filters.opacity}%)`,
    `brightness(${filters.brightness}%)`,
    `contrast(${filters.contrast}%)`,
    `blur(${filters.blur}px)`,
  ]
  return parts.join(' ')
})

function resetFilters() {
  Object.assign(filters, defaultFilters)
}

type PresetKey = 'none' | 'noir' | 'warm' | 'cool' | 'vintage' | 'blur'

const presets: Record<PresetKey, Partial<FilterState>> = {
  none: { ...defaultFilters },
  noir: { grayscale: 100, contrast: 120, brightness: 95, saturate: 100, sepia: 0, blur: 0 },
  warm: { sepia: 20, saturate: 120, brightness: 105, contrast: 105 },
  cool: { hueRotate: 180, saturate: 110, brightness: 105, contrast: 95 },
  vintage: { sepia: 35, saturate: 110, contrast: 105, brightness: 95 },
  blur: { blur: 3, brightness: 110, contrast: 90 },
}

function applyPreset(key: PresetKey) {
  resetFilters()
  Object.assign(filters, presets[key])
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px 24px;
}

@media (min-width: 768px) {
  .filters-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>