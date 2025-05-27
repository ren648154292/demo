<template>
  <div class="dashboard-container">
    <!-- 顶部卡片区域 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- 借方金额卡片 -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">借方金额</p>
            <p class="text-2xl font-bold mt-1">{{ debitAmount }}</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- 贷方金额卡片 -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">贷方金额</p>
            <p class="text-2xl font-bold mt-1">{{ creditAmount }}</p>
          </div>
          <div class="bg-green-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="bg-white rounded-lg shadow p-6">
        <el-input
          v-model="searchQuery"
          placeholder="搜索科目名称或代码"
          :prefix-icon="Search"
          clearable
        />
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">科目关系图</h2>
      <div ref="chartContainer" class="w-full h-96"></div>
    </div>

    <!-- 表格区域 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <el-table
        :data="filteredTableData"
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column prop="code" label="科目代码" width="120" />
        <el-table-column prop="name" label="科目名称" width="180" />
        <el-table-column prop="counterpartyCode" label="对方科目代码" width="140" />
        <el-table-column prop="counterpartyName" label="对方科目名称" width="180" />
        <el-table-column label="关联强度" width="120">
          <template #default="{ row }">
            <div class="flex items-center">
              <div class="w-8 h-2 rounded-full mr-2" :style="{ backgroundColor: getRelationColor(row.relationStrength) }"></div>
              <span>{{ row.relationStrength }}%</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lastTransactionDate" label="最后交易日期" width="140" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="text" @click="viewDetail(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="p-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredTableData.length"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useChart, useTable, useFinanceData } from '../hooks/useDashboard';

// 使用hooks
const chartContainer = ref<HTMLElement | null>(null);
const { chart } = useChart(chartContainer);

const {
  tableData,
  currentPage,
  pageSize,
  searchQuery,
  filteredTableData,
  tableRowClassName,
  getRelationColor,
  viewDetail
} = useTable();

const { debitAmount, creditAmount } = useFinanceData();
</script>

<style scoped>
.dashboard-container {
  @apply p-4 bg-gray-100 min-h-screen;
}
</style>