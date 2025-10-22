<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="bg-white rounded-lg shadow p-4 mb-4">
      <div class="flex items-center gap-3">
        <el-input v-model="keyword" placeholder="搜索股票代码/名称" clearable class="max-w-xs" />
        <el-select v-model="industry" placeholder="行业" clearable class="w-40">
          <el-option label="全部" value="" />
          <el-option v-for="i in industryOptions" :key="i" :label="i" :value="i" />
        </el-select>
        <el-button type="primary" :icon="Search" @click="refresh">筛选</el-button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <el-table :data="pagedData" border style="width: 100%" :header-cell-style="headerCellStyle">
        <el-table-column prop="code" label="股票代码" width="120" fixed />
        <el-table-column prop="name" label="名称" width="130" fixed />

        <el-table-column label="业绩景气度">
          <el-table-column label="EPS预测值变动" width="140">
            <template #default="{ row }">
              <div class="flex items-center gap-2">
                <div class="w-14 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div class="h-2 rounded-full" :class="row.epsChange >= 0 ? 'bg-green-500' : 'bg-red-500'" :style="{ width: Math.min(100, Math.abs(row.epsChange)) + '%' }" />
                </div>
                <span :class="row.epsChange >= 0 ? 'text-green-600' : 'text-red-500'">{{ toPct(row.epsChange) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="年度EPS增速" width="160">
            <template #default="{ row }">
              <Sparkline :data="row.epsSeries" :width="120" :height="28" />
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="投研人员行为">
          <el-table-column prop="analystCoverage" label="最新分析师覆盖数" width="140" />
          <el-table-column label="分析师覆盖度变化" width="140">
            <template #default="{ row }">
              <span> {{ toPct(row.coverageChange) }} </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="资金净流入">
          <el-table-column prop="capitalInflow" label="资金净流入" width="120">
            <template #default="{ row }">
              <span>{{ toPct(row.capitalInflow) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mainInflow" label="主力资金净流入" width="140">
            <template #default="{ row }">{{ toPct(row.mainInflow) }}</template>
          </el-table-column>
          <el-table-column prop="retailInflow" label="散户资金净流入" width="140">
            <template #default="{ row }">{{ toPct(row.retailInflow) }}</template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="资金行为">
          <el-table-column label="融资余额增量" width="150">
            <template #default="{ row }">
              <Sparkline :data="row.marginSeries" :width="120" :height="28" stroke-color="#06b6d4" />
            </template>
          </el-table-column>
          <el-table-column label="融券余额增量" width="150">
            <template #default="{ row }">
              <Sparkline :data="row.shortSeries" :width="120" :height="28" stroke-color="#8b5cf6" />
            </template>
          </el-table-column>
          <el-table-column prop="instHoldRatio" label="机构持股比例" width="140">
            <template #default="{ row }">{{ toPct(row.instHoldRatio) }}</template>
          </el-table-column>
        </el-table-column>
      </el-table>

      <div class="p-4 flex justify-end">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="filtered.length"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import Sparkline from '@/components/Sparkline.vue'

interface RowData {
  code: string
  name: string
  industry: string
  epsChange: number
  epsSeries: number[]
  analystCoverage: number
  coverageChange: number
  capitalInflow: number
  mainInflow: number
  retailInflow: number
  marginSeries: number[]
  shortSeries: number[]
  instHoldRatio: number
}

const headerCellStyle = {
  background: '#f7f7f7',
  color: '#333',
  fontWeight: 600
}

const keyword = ref('')
const industry = ref('')
const industryOptions = ['建筑装饰', '电子', '医药生物', '食品饮料']

// 构造一点示例数据（可替换为接口）
const baseRow = (i: number): RowData => ({
  code: `561100.SH`,
  name: '建筑装饰品',
  industry: '建筑装饰',
  epsChange: [0.7777, -0.2377, -0.3277, -0.7777, 0.15][i % 5] ?? 0.1,
  epsSeries: Array.from({ length: 20 }, (_, k) => 100 + Math.sin((k + i) / 2) * 10 + Math.random() * 5),
  analystCoverage: 10000,
  coverageChange: 0.35,
  capitalInflow: 0.35,
  mainInflow: 0.35,
  retailInflow: 0.15,
  marginSeries: Array.from({ length: 20 }, (_, k) => 100 + Math.cos((k + i) / 2) * 10 + Math.random() * 5),
  shortSeries: Array.from({ length: 20 }, (_, k) => 100 + Math.sin((k + i) / 3) * 8 + Math.random() * 4),
  instHoldRatio: 0.15,
})

const tableData = ref<RowData[]>(Array.from({ length: 80 }, (_, i) => baseRow(i)))

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  return tableData.value.filter(r => {
    const matchK = !k || r.code.toLowerCase().includes(k) || r.name.toLowerCase().includes(k)
    const matchI = !industry.value || r.industry === industry.value
    return matchK && matchI
  })
})

const page = ref(1)
const pageSize = ref(10)
const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const toPct = (v: number) => `${(v * 100).toFixed(2)}%`
const refresh = () => { page.value = 1 }
</script>

<style scoped>
:deep(.el-table th) {
  white-space: nowrap;
}
:deep(.el-table__body td) {
  white-space: nowrap;
}
</style>
