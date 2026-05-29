<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTimerStore } from '../../stores/timer'
import TimeRangeSelector from './TimeRangeSelector.vue'
import DailyBarChart from './DailyBarChart.vue'
import TrendLineChart from './TrendLineChart.vue'
import TagPieChart from './TagPieChart.vue'
import ExportPanel from './ExportPanel.vue'

const store = useTimerStore()
const days = ref(7)

const filteredRecords = computed(() => {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days.value)
  const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, '0')}-${String(cutoff.getDate()).padStart(2, '0')}`
  return store.history.filter(r => r.date >= cutoffStr)
})
</script>

<template>
  <div class="stats-page">
    <h2 class="page-title">统计分析</h2>

    <TimeRangeSelector v-model="days" />

    <div class="charts-grid">
      <DailyBarChart :records="filteredRecords" :days="days" />
      <TrendLineChart :records="filteredRecords" :days="days" />
      <TagPieChart :records="filteredRecords" :tags="store.tags" />
    </div>

    <ExportPanel :records="store.history" :tags="store.tags" />
  </div>
</template>

<style scoped>
.stats-page {
  padding-bottom: 40px;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 20px;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.charts-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
</style>
