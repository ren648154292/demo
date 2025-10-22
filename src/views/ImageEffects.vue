<template>
  <div class="p-6 space-y-6">
    <h2 class="text-2xl font-semibold">图片效果</h2>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- 左侧：操作面板 -->
      <section class="w-full lg:w-80 space-y-4">
        <el-upload
          drag
          :auto-upload="false"
          accept="image/*"
          :show-file-list="false"
          @change="onFileChange"
          class="w-full"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">拖拽图片到此处，或 <em>点击上传</em></div>
        </el-upload>

        <el-card shadow="hover">
          <template #header>
            <div class="font-medium">基础滤镜</div>
          </template>
          <div class="space-y-4">
            <ControlSlider label="亮度" v-model="filters.brightness" :min="0" :max="200" :step="1" suffix="%" />
            <ControlSlider label="对比度" v-model="filters.contrast" :min="0" :max="200" :step="1" suffix="%" />
            <ControlSlider label="饱和度" v-model="filters.saturate" :min="0" :max="200" :step="1" suffix="%" />
            <ControlSlider label="色相" v-model="filters.hueRotate" :min="-180" :max="180" :step="1" suffix="°" />
            <ControlSlider label="模糊" v-model="filters.blur" :min="0" :max="20" :step="0.5" suffix="px" />
            <ControlSlider label="灰度" v-model="filters.grayscale" :min="0" :max="100" :step="1" suffix="%" />
            <ControlSlider label="褐色" v-model="filters.sepia" :min="0" :max="100" :step="1" suffix="%" />
            <ControlSlider label="透明度" v-model="filters.opacity" :min="0" :max="100" :step="1" suffix="%" />
          </div>
        </el-card>

        <el-card shadow="hover">
          <template #header>
            <div class="font-medium">变换</div>
          </template>
          <div class="space-y-4">
            <ControlSlider label="旋转" v-model="transform.rotate" :min="-180" :max="180" :step="1" suffix="°" />
            <ControlSlider label="缩放" v-model="transform.scale" :min="0.1" :max="3" :step="0.1" />
            <div class="flex gap-2">
              <el-button size="small" @click="flipX = !flipX">水平翻转</el-button>
              <el-button size="small" @click="flipY = !flipY">垂直翻转</el-button>
            </div>
          </div>
        </el-card>

        <div class="flex gap-2">
          <el-button type="primary" :disabled="!hasImage" @click="exportPNG">导出 PNG</el-button>
          <el-button :disabled="!hasImage" @click="resetAll">重置</el-button>
        </div>
      </section>

      <!-- 右侧：画布预览 -->
      <section class="flex-1">
        <el-card class="w-full h-[520px] flex items-center justify-center overflow-auto" shadow="never">
          <div v-if="!hasImage" class="text-gray-400">请先上传图片</div>
          <canvas v-else ref="canvasRef" class="max-w-full h-auto" />
        </el-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

// 受控滑块组件（内部仅负责 UI，同步父级 v-model 值）
const ControlSlider = defineComponent<{ label: string; modelValue: number; min?: number; max?: number; step?: number; suffix?: string }>(
  (props, { emit }) => {
    const update = (val: number) => emit('update:modelValue', val)
    return () => (
      <div class="space-y-1">
        <div class="text-sm text-gray-600 flex justify-between">
          <span>{props.label}</span>
          <span>{props.suffix ? `${props.modelValue}${props.suffix}` : props.modelValue}</span>
        </div>
        <el-slider modelValue={props.modelValue} min={props.min ?? 0} max={props.max ?? 100} step={props.step ?? 1} onInput={update} />
      </div>
    )
  }
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const imageEl = new Image()
imageEl.crossOrigin = 'anonymous'

const original = reactive({ width: 0, height: 0 })

const filters = reactive({
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hueRotate: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  opacity: 100
})

const transform = reactive({
  rotate: 0,
  scale: 1
})

const flipX = ref(false)
const flipY = ref(false)

const hasImage = computed(() => original.width > 0 && original.height > 0)

const cssFilter = computed(() =>
  `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) hue-rotate(${filters.hueRotate}deg) blur(${filters.blur}px) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) opacity(${filters.opacity}%)`
)

function applyAndRender() {
  const canvas = canvasRef.value
  if (!canvas || !hasImage.value) return
  const ctx = canvas.getContext('2d')!

  // 以缩放适配画布大小（保持原始尺寸）
  canvas.width = original.width
  canvas.height = original.height

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 应用翻转/旋转/缩放
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(flipX.value ? -1 : 1, flipY.value ? -1 : 1)
  ctx.rotate((transform.rotate * Math.PI) / 180)
  ctx.scale(transform.scale, transform.scale)

  // 应用滤镜
  ;(ctx as any).filter = cssFilter.value

  ctx.drawImage(imageEl, -original.width / 2, -original.height / 2, original.width, original.height)
  ctx.restore()
}

function onFileChange(file: any) {
  const raw = file?.raw as File
  if (!raw) return
  if (!raw.type.startsWith('image/')) {
    ElMessage.error('请上传图片文件')
    return
  }
  const url = URL.createObjectURL(raw)
  imageEl.onload = () => {
    original.width = imageEl.naturalWidth
    original.height = imageEl.naturalHeight
    applyAndRender()
    URL.revokeObjectURL(url)
  }
  imageEl.src = url
}

function resetAll() {
  filters.brightness = 100
  filters.contrast = 100
  filters.saturate = 100
  filters.hueRotate = 0
  filters.blur = 0
  filters.grayscale = 0
  filters.sepia = 0
  filters.opacity = 100
  transform.rotate = 0
  transform.scale = 1
  flipX.value = false
  flipY.value = false
  applyAndRender()
}

function exportPNG() {
  const canvas = canvasRef.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = 'image-effects.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

watch(
  () => ({ ...filters, ...transform, flipX: flipX.value, flipY: flipY.value }),
  () => applyAndRender(),
  { deep: true }
)

onMounted(() => {
  // 初次无图不渲染
})
</script>

<style scoped>
.el-upload-dragger { width: 100%; }
</style>
