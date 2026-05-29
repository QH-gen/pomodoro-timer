<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'
import type { HistoryRecord } from '../../types/timer'
import { getChartData, chartColors } from '../../utils/charts'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const props = defineProps<{ records: HistoryRecord[]; days: number }>()

const chartData = computed(() => {
  const { dates, counts } = getChartData(props.records, props.days)
  return {
    labels: dates,
    datasets: [{
      label: '完成番茄数',
      data: counts,
      backgroundColor: chartColors.primaryLight,
      borderColor: chartColors.primary,
      borderWidth: 1,
      borderRadius: 6,
    }],
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(30, 24, 20, 0.9)',
      titleColor: '#FFFBF7',
      bodyColor: '#FFFBF7',
      cornerRadius: 8,
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: chartColors.text, font: { size: 11 } },
    },
    y: {
      beginAtZero: true,
      grid: { color: chartColors.grid },
      ticks: {
        color: chartColors.text,
        font: { size: 11 },
        stepSize: 1,
      },
    },
  },
}
</script>

<template>
  <div class="chart-container">
    <h3 class="chart-title">每日番茄</h3>
    <div class="chart-wrapper">
      <Bar :data="chartData" :options="options" />
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
  height: 200px;
}
</style>
