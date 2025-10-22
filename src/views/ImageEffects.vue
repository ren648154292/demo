<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">各行业涨跌幅</h2>
      <el-radio-group v-model="mode" size="small">
        <el-radio-button label="weekly">周度</el-radio-button>
        <el-radio-button label="monthly">月度</el-radio-button>
      </el-radio-group>
    </div>

    <el-card shadow="never" class="overflow-x-auto overflow-y-hidden">
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
        <div
          v-for="(row, rowIndex) in current.rows"
          :key="row.rank"
          class="row-fragment"
        >
          <!-- 左侧行头 -->
          <div class="p-3 text-gray-600 border-b border-r bg-white sticky left-0">{{ row.rank }}</div>

          <!-- 单元格 -->
          <template v-for="(cell, colIndex) in row.items" :key="row.rank + cell.name">
            <div
              class="p-3 text-center border-b border-r transition-colors"
              :style="getCellStyleByIndex(rowIndex, colIndex)"
            >
              <div class="text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">{{ cell.name }}</div>
              <div class="overflow-hidden text-ellipsis whitespace-nowrap" :class="valueClass(cell.value)">{{ formatPercent(cell.value) }}</div>
            </div>
          </template>
        </div>
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

// 渐变起始色（终点统一为 #FFFFFF），按顺序循环
const gradientStartColors: string[] = [
  '#FDDC9E', '#F9C8A9', '#F9B6B0', '#F8E69A', '#EBEB84', '#DBC0F1',
  '#9DCCF3', '#BBCFF5', '#AAD0E8', '#FABED9', '#FAEDD3', '#F9E9DD',
  '#FCE8E6', '#F7F3DA', '#F2F3D7', '#F1E7F8', '#DBEAF7', '#E1EBFE',
  '#E9F5FF', '#F7E0EA', '#FFFAF1', '#FFF6EF', '#FFF6F5', '#FFFDF1',
  '#F2F2EB', '#FBF5FF', '#F0F9FF', '#EFF4FF', '#F0F5F8', '#FFF3F8'
]

function getCellStyleByIndex(rowIndex: number, colIndex: number) {
  // 以行优先顺序给格子着色：从左到右、从上到下
  const linearIndex = rowIndex * current.value.dates.length + colIndex
  const color = gradientStartColors[linearIndex % gradientStartColors.length]
  return {
    background: `linear-gradient(180deg, ${color} 0%, #FFFFFF 100%)`
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

/* 容器内将 v-for 的块当作片段，使其子元素继续参与网格布局 */
.row-fragment { 
  display: contents; 
}
</style>
