<script setup lang="ts">
import type { HistoryRecord } from '../types/timer'

defineProps<{ record: HistoryRecord }>()
</script>

<template>
  <div class="stats-card">
    <h3>今日统计</h3>
    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-value">{{ record.completedPomodoros }}</span>
        <span class="stat-label">完成番茄</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ record.totalWorkMinutes }}</span>
        <span class="stat-label">专注分钟</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-card { background: var(--color-card-bg); border-radius: 12px; padding: 16px 20px; margin-top: 24px; }
h3 { margin: 0 0 12px; font-size: 0.9rem; color: var(--color-text-secondary); }
.stats-row { display: flex; gap: 32px; }
.stat-item { display: flex; flex-direction: column; }
.stat-value { font-size: 1.5rem; font-weight: 600; color: var(--color-text); }
.stat-label { font-size: 0.8rem; color: var(--color-text-secondary); }
</style>
