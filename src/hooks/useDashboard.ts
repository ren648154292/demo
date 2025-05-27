import { ref, onMounted, computed, type Ref } from "vue";
import * as echarts from "echarts";

// 图表相关逻辑
export function useChart(containerRef: Ref<HTMLElement | null>) {
  let chart: echarts.ECharts | null = null;

  const initChart = () => {
    if (!containerRef.value) return;

    chart = echarts.init(containerRef.value);
    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{b}",
      },
      legend: {
        show: false,
      },
      animation: false,
      series: [
        {
          type: "graph",
          layout: "force",
          data: [
            { name: "库存现金", category: 0, symbolSize: 50, value: 9200000 },
            { name: "银行存款", category: 1, symbolSize: 40, value: 5600000 },
            { name: "应收账款", category: 1, symbolSize: 40, value: 3200000 },
            { name: "应付账款", category: 1, symbolSize: 40, value: 2800000 },
            { name: "主营业务收入", category: 1, symbolSize: 40, value: 6500000 },
          ],
          links: [
            {
              source: "库存现金",
              target: "银行存款",
              value: 5600000,
              lineStyle: { color: "#91cc75", width: 3 },
            },
            {
              source: "库存现金",
              target: "应收账款",
              value: 3200000,
              lineStyle: { color: "#ee6666", width: 2 },
            },
            {
              source: "库存现金",
              target: "主营业务收入",
              value: 6500000,
              lineStyle: { color: "#ee6666", width: 4 },
            },
            {
              source: "银行存款",
              target: "应付账款",
              value: 2800000,
              lineStyle: { color: "#91cc75", width: 2 },
            },
          ],
          categories: [{ name: "科目" }, { name: "对方科目" }],
          roam: true,
          label: {
            show: true,
            position: "right",
            formatter: "{b}",
          },
          force: {
            repulsion: 200,
            edgeLength: [80, 200],
          },
          lineStyle: {
            curveness: 0.3,
          },
          itemStyle: {
            color: function (params: any) {
              return params.data.category === 0 ? "#3b82f6" : "#22c55e";
            },
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 6,
            },
          },
        },
      ],
    });

    window.addEventListener("resize", () => {
      chart?.resize();
    });
  };

  onMounted(() => {
    initChart();
  });

  return {
    chart,
  };
}

// 表格相关逻辑
export function useTable() {
  const tableData = ref([
    {
      code: "1001",
      name: "库存现金",
      counterpartyCode: "1002",
      counterpartyName: "银行存款",
      relationStrength: 85,
      lastTransactionDate: "2025-05-26",
    },
    {
      code: "1001",
      name: "库存现金",
      counterpartyCode: "6001",
      counterpartyName: "主营业务收入",
      relationStrength: 65,
      lastTransactionDate: "2025-05-24",
    },
    {
      code: "1002",
      name: "银行存款",
      counterpartyCode: "2202",
      counterpartyName: "应付账款",
      relationStrength: 72,
      lastTransactionDate: "2025-05-25",
    },
    {
      code: "1002",
      name: "银行存款",
      counterpartyCode: "2201",
      counterpartyName: "应付票据",
      relationStrength: 45,
      lastTransactionDate: "2025-05-23",
    },
    {
      code: "1122",
      name: "应收账款",
      counterpartyCode: "6001",
      counterpartyName: "主营业务收入",
      relationStrength: 90,
      lastTransactionDate: "2025-05-26",
    },
    {
      code: "1122",
      name: "应收账款",
      counterpartyCode: "1002",
      counterpartyName: "银行存款",
      relationStrength: 78,
      lastTransactionDate: "2025-05-25",
    },
    {
      code: "2202",
      name: "应付账款",
      counterpartyCode: "1002",
      counterpartyName: "银行存款",
      relationStrength: 82,
      lastTransactionDate: "2025-05-24",
    },
    {
      code: "6001",
      name: "主营业务收入",
      counterpartyCode: "1122",
      counterpartyName: "应收账款",
      relationStrength: 95,
      lastTransactionDate: "2025-05-26",
    },
  ]);

  const currentPage = ref(1);
  const pageSize = ref(10);
  const searchQuery = ref("");

  const filteredTableData = computed(() => {
    if (!searchQuery.value) {
      return tableData.value;
    }

    const query = searchQuery.value.toLowerCase();
    return tableData.value.filter(
      (item) =>
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.counterpartyCode.toLowerCase().includes(query) ||
        item.counterpartyName.toLowerCase().includes(query),
    );
  });

  const tableRowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
    if (rowIndex % 2 === 0) {
      return "bg-gray-50";
    }
    return "";
  };

  const getRelationColor = (strength: number) => {
    if (strength >= 80) return "#67C23A";
    if (strength >= 60) return "#409EFF";
    return "#E6A23C";
  };

  const viewDetail = (row: any) => {
    console.log("查看详情:", row);
    // 这里可以实现查看详情的逻辑，如打开抽屉或对话框
  };

  return {
    tableData,
    currentPage,
    pageSize,
    searchQuery,
    filteredTableData,
    tableRowClassName,
    getRelationColor,
    viewDetail,
  };
}

// 财务数据相关逻辑
export function useFinanceData() {
  const debitAmount = ref("¥9,200,000.00");
  const creditAmount = ref("¥3,500,000.00");

  return {
    debitAmount,
    creditAmount,
  };
}