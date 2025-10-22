<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">各行业涨跌幅</h2>
      <el-radio-group v-model="mode" size="small">
        <el-radio-button label="weekly">周度</el-radio-button>
        <el-radio-button label="monthly">月度</el-radio-button>
      </el-radio-group>
    </div>

    <el-card shadow="never" class="overflow-auto">
      <div
        class="min-w-[760px]"
        :style="{ display: 'grid', gridTemplateColumns: `120px repeat(${current.dates.length}, minmax(120px, 1fr))` }"
      >
        <!-- 顶部表头 -->
        <div class="p-3 bg-gray-50 border-b border-r"></div>
        <div
          v-for="d in current.dates"
          :key="d"
          class="p-3 text-center text-gray-600 bg-gray-50 border-b border-r"
        >
          {{ d }}
        </div>

        <!-- 数据行 -->
        <template v-for="row in current.rows" :key="row.rank">
          <!-- 左侧行头 -->
          <div class="p-3 text-gray-600 border-b border-r bg-white/70 sticky left-0">{{ row.rank }}</div>

          <!-- 单元格 -->
          <template v-for="cell in row.items" :key="row.rank + cell.name">
            <div
              class="p-3 text-center border-b border-r transition-colors"
              :style="getCellStyle(cell.value)"
            >
              <div class="text-sm text-gray-700">{{ cell.name }}</div>
              <div :class="valueClass(cell.value)">{{ formatPercent(cell.value) }}</div>
            </div>
          </template>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type Mode = 'weekly' | 'monthly'

interface CellItem {
  name: string
  value: number // 正负代表涨跌，绝对值用于强度
}

interface DataRow {
  rank: string
  items: CellItem[]
}

interface DataSet {
  dates: string[]
  rows: DataRow[]
}

const mode = ref<Mode>('weekly')

const datasets = reactive<Record<Mode, DataSet>>({
  weekly: {
    dates: ['2025-05-01', '2025-05-08', '2025-05-15', '2025-05-22', '2025-05-29', '2024-06-06', '2025-06-13'],
    rows: [
      {
        rank: '第一名',
        items: [
          { name: '农业', value: -13.86 },
          { name: '畜牧业', value: -3.86 },
          { name: '万科A', value: -8.86 },
          { name: '水利', value: 4.36 },
          { name: '电力', value: 15.36 },
          { name: '建筑业', value: 5.30 },
          { name: '采矿业', value: -15.36 }
        ]
      },
      {
        rank: '第二名',
        items: [
          { name: '计算机行业', value: 15.36 },
          { name: '计算机行业', value: -3.86 },
          { name: '情生指数', value: 4.36 },
          { name: '科技', value: -13.86 },
          { name: '科技', value: 15.36 },
          { name: '科技', value: 15.36 },
          { name: '科技', value: 15.36 }
        ]
      },
      {
        rank: '第三名',
        items: [
          { name: '造纸行业', value: -13.86 },
          { name: '纳斯达克100', value: -3.86 },
          { name: '农业', value: -8.86 },
          { name: '计算机行业', value: 4.36 },
          { name: '造纸业', value: 15.36 },
          { name: '造纸业', value: 15.36 },
          { name: '造纸业', value: 15.36 }
        ]
      },
      {
        rank: '第四名',
        items: [
          { name: '科技', value: 15.36 },
          { name: '信息传输业', value: -3.86 },
          { name: '计算机行业', value: 4.36 },
          { name: '农业', value: -13.86 },
          { name: '农业', value: -13.86 },
          { name: '农业', value: -13.86 },
          { name: '计算机行业', value: 15.36 }
        ]
      },
      {
        rank: '第五名',
        items: [
          { name: '现代物流', value: -13.86 },
          { name: '建筑业', value: 4.36 },
          { name: '建筑业', value: 3.86 },
          { name: '建筑业', value: 4.36 },
          { name: '建筑业', value: 4.36 },
          { name: '万科A', value: -8.86 },
          { name: '交通运输业', value: 4.36 }
        ]
      }
    ]
  },
  monthly: {
    dates: ['2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
    rows: [
      {
        rank: '第一名',
        items: [
          { name: '新能源', value: 11.3 },
          { name: '煤炭', value: -6.2 },
          { name: '银行', value: 3.5 },
          { name: '电力', value: 7.8 },
          { name: '传媒', value: -2.1 }
        ]
      },
      {
        rank: '第二名',
        items: [
          { name: '半导体', value: 6.6 },
          { name: '军工', value: 1.4 },
          { name: '房地产', value: -4.4 },
          { name: '食品饮料', value: 2.2 },
          { name: '白酒', value: 3.1 }
        ]
      },
      {
        rank: '第三名',
        items: [
          { name: '汽车', value: -1.2 },
          { name: '家电', value: 4.7 },
          { name: '有色金属', value: 5.0 },
          { name: '环保', value: -3.8 },
          { name: '电商', value: 1.9 }
        ]
      },
      {
        rank: '第四名',
        items: [
          { name: '人工智能', value: 9.2 },
          { name: '计算机', value: 2.3 },
          { name: '券商', value: -2.8 },
          { name: '游戏', value: 3.4 },
          { name: '化工', value: -1.6 }
        ]
      },
      {
        rank: '第五名',
        items: [
          { name: '旅游', value: 2.0 },
          { name: '航运', value: -0.8 },
          { name: '光伏', value: 4.1 },
          { name: '钢铁', value: -1.1 },
          { name: '基建', value: 0.5 }
        ]
      }
    ]
  }
})

const current = computed(() => datasets[mode.value])

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function getCellStyle(val: number) {
  const intensity = clamp(Math.abs(val) / 16, 0.08, 0.9)
  const color = val >= 0 ? [244, 67, 54] : [22, 163, 74] // 红/绿
  const bg = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${intensity * 0.25})`
  return {
    background: bg
  }
}

function valueClass(val: number) {
  return val >= 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'
}

function formatPercent(val: number) {
  const sign = val > 0 ? '' : '' // 百分比自带正负
  return `${sign}${val.toFixed(2)}%`
}
</script>

<style scoped>
/***** 让左侧行头在横向滚动时固定 *****/
.sticky.left-0 {
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>
