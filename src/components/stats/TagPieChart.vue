<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import type { HistoryRecord, TaskTag } from '../../types/timer'
import { getTagChartData } from '../../utils/charts'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{ records: HistoryRecord[]; tags: TaskTag[] }>()

const chartData = computed(() => {
  const { labels, data, colors } = getTagChartData(props.records, props.tags)
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderColor: 'var(--color-surface)',
      borderWidth: 2,
    }],
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: 'rgba(100, 80, 70, 0.8)',
        padding: 12,
        usePointStyle: true,
        pointStyleWidth: 8,
        font: { size: 11 },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(30, 24, 20, 0.9)',
      titleColor: '#FFFBF7',
      bodyColor: '#FFFBF7',
      cornerRadius: 8,
      padding: 10,
    },
  },
}
</script>

<template>
  <div class="chart-container">
    <h3 class="chart-title">标签分布</h3>
    <div class="chart-wrapper">
      <Pie v-if="chartData.labels.length > 0" :data="chartData" :options="options" />
      <p v-else class="empty">暂无数据</p>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--color-border);
}

.chart-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}

.chart-wrapper {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}
</style>
