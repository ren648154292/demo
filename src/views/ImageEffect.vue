<template>
  <div class="image-effect-page p-5">
    <el-card shadow="never">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-medium">筛选维度</span>
        </div>
      </template>

      <el-form label-position="left" label-width="110px" class="w-full">
        <!-- 分组：业绩景气度 -->
        <div class="group-row">
          <div class="group-title">业绩景气度</div>
          <div class="group-content">
            <el-checkbox-group v-model="selected.performance">
              <el-checkbox v-for="item in groups.performance" :key="item.value" :label="item.value">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 分组：投研人员行为 -->
        <div class="group-row">
          <div class="group-title">投研人员行为</div>
          <div class="group-content">
            <el-checkbox-group v-model="selected.research">
              <el-checkbox v-for="item in groups.research" :key="item.value" :label="item.value">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 分组：资金行为 -->
        <div class="group-row">
          <div class="group-title">资金行为</div>
          <div class="group-content">
            <el-checkbox-group v-model="selected.capital">
              <el-checkbox v-for="item in groups.capital" :key="item.value" :label="item.value">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 分组：市场信号 -->
        <div class="group-row">
          <div class="group-title">市场信号</div>
          <div class="group-content">
            <el-checkbox-group v-model="selected.market">
              <el-checkbox v-for="item in groups.market" :key="item.value" :label="item.value">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 分组：综合指标 -->
        <div class="group-row">
          <div class="group-title">综合指标</div>
          <div class="group-content">
            <el-checkbox-group v-model="selected.composite">
              <el-checkbox v-for="item in groups.composite" :key="item.value" :label="item.value">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <div class="mt-6 flex gap-3">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">清除筛选条件</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

type OptionItem = { label: string; value: string }

const groups: Record<string, OptionItem[]> = {
  performance: [
    { label: 'EPS 预测值变动', value: 'eps_change' },
    { label: '年度 EPS 增速', value: 'eps_growth_yoy' },
    { label: '季度 EPS 增速', value: 'eps_growth_qoq' },
    { label: '最新 ROE 预测', value: 'roe_latest' },
    { label: 'ROE 预测值变动', value: 'roe_change' },
    { label: 'ROE_TTM(季度)', value: 'roe_ttm_q' },
    { label: '营业 ttm 同比增速', value: 'revenue_ttm_yoy' },
    { label: '毛利率 ttm 同比增速', value: 'gross_margin_ttm_yoy' },
    { label: '存货周转率 ttm 同比增速', value: 'inventory_turnover_ttm_yoy' },
  ],
  research: [
    { label: '最新分析师覆盖数量', value: 'analyst_coverage' },
    { label: '分析师覆盖密度变化', value: 'analyst_density_change' },
    { label: '最新调研数量', value: 'latest_research_visits' },
    { label: '调研数量变化', value: 'research_visits_change' },
  ],
  capital: [
    { label: '资金净流入', value: 'capital_inflow' },
    { label: '主力资金净流入', value: 'main_capital_inflow' },
    { label: '散户资金净流入', value: 'retail_inflow' },
    { label: '融资余额增量', value: 'margin_balance_increase' },
    { label: '券商余额增量', value: 'securities_balance_increase' },
    { label: '机构持股比例', value: 'inst_holding_ratio' },
    { label: '机构持股比例变化', value: 'inst_holding_ratio_change' },
  ],
  market: [
    { label: '拥挤度', value: 'crowding' },
    { label: '短期扩散指数及分位数', value: 'short_diffusion' },
    { label: '长期扩散指数及分位数', value: 'long_diffusion' },
    { label: '赚钱效应及持续天数', value: 'profit_effect' },
    { label: 'forward_PE', value: 'forward_pe' },
    { label: '波动率及分位数', value: 'volatility_quantile' },
  ],
  composite: [
    { label: '业绩景气度', value: 'performance_composite' },
    { label: '资金行为', value: 'capital_composite' },
    { label: '市场信号', value: 'market_composite' },
  ],
}

const defaultSelected = {
  performance: ['eps_change', 'eps_growth_yoy', 'roe_change'],
  research: ['analyst_coverage', 'analyst_density_change'],
  capital: [
    'capital_inflow',
    'main_capital_inflow',
    'retail_inflow',
    'margin_balance_increase',
    'inst_holding_ratio',
    'inst_holding_ratio_change',
  ],
  market: [],
  composite: [],
}

const selected = reactive<Record<keyof typeof defaultSelected, string[]>>({
  performance: [...defaultSelected.performance],
  research: [...defaultSelected.research],
  capital: [...defaultSelected.capital],
  market: [...defaultSelected.market],
  composite: [...defaultSelected.composite],
})

function submit() {
  const total = Object.values(selected).reduce((sum, arr) => sum + arr.length, 0)
  ElMessage.success(`已提交，共选择 ${total} 个筛选项`)
}

function reset() {
  selected.performance = []
  selected.research = []
  selected.capital = []
  selected.market = []
  selected.composite = []
}
</script>

<style scoped>
.image-effect-page :deep(.el-card__header) {
  padding: 12px 16px;
}

.group-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: start;
  padding: 14px 0;
  border-bottom: 1px dashed #ebeef5;
}

.group-row:last-of-type {
  border-bottom: none;
}

.group-title {
  color: #606266;
  line-height: 32px;
}

.group-content {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 22px;
}
</style>
