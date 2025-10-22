<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      v-if="points.length > 1"
      :points="points.map(p => `${p.x},${p.y}`).join(' ')"
      :fill="'none'"
      :stroke="strokeColor"
      :stroke-width="1.5"
      stroke-linejoin="round"
      stroke-linecap="round"
      opacity="0.9"
    />
    <!-- 高亮最大值 -->
    <circle
      v-if="highlightMax && maxPoint"
      :cx="maxPoint.x"
      :cy="maxPoint.y"
      r="2.2"
      fill="#ef4444"
    />
    <!-- 高亮最后一个点 -->
    <circle
      v-if="highlightLast && lastPoint"
      :cx="lastPoint.x"
      :cy="lastPoint.y"
      r="2.2"
      fill="#22c55e"
    />
  </svg>
  
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  data: number[]
  width?: number
  height?: number
  strokeColor?: string
  highlightMax?: boolean
  highlightLast?: boolean
  paddingX?: number
  paddingY?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 100,
  height: 28,
  strokeColor: '#3b82f6',
  highlightMax: true,
  highlightLast: true,
  paddingX: 2,
  paddingY: 2,
})

type Point = { x: number; y: number }

const minValue = computed(() => Math.min(...props.data))
const maxValue = computed(() => Math.max(...props.data))

const scaleY = (value: number): number => {
  const min = minValue.value
  const max = maxValue.value
  if (max === min) return props.height / 2
  const usable = props.height - props.paddingY * 2
  const t = (value - min) / (max - min)
  // y 轴向下为正，需要反转
  return props.paddingY + (1 - t) * usable
}

const points = computed<Point[]>(() => {
  const n = props.data.length
  if (n === 0) return []
  if (n === 1) {
    return [
      { x: props.paddingX, y: scaleY(props.data[0]) },
      { x: props.width - props.paddingX, y: scaleY(props.data[0]) },
    ]
  }
  const usable = props.width - props.paddingX * 2
  const step = usable / (n - 1)
  return props.data.map((v, i) => ({
    x: props.paddingX + i * step,
    y: scaleY(v),
  }))
})

const maxPoint = computed<Point | null>(() => {
  if (points.value.length === 0) return null
  const max = maxValue.value
  const idx = props.data.findIndex(v => v === max)
  return points.value[Math.max(0, idx)]
})

const lastPoint = computed<Point | null>(() => {
  if (points.value.length === 0) return null
  return points.value[points.value.length - 1]
})
</script>

<style scoped>
svg { display: block; }
</style>
