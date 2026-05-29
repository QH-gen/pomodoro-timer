<script setup lang="ts">
import type { HistoryRecord } from '../types/timer'

defineProps<{ record: HistoryRecord }>()
</script>

<template>
  <div class="stats-card">
    <div class="stats-header">
      <span class="stats-title">今日记录</span>
      <span class="stats-date">{{ new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) }}</span>
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value-wrapper">
          <span class="stat-value">{{ record.completedPomodoros }}</span>
        </div>
        <span class="stat-label">完成番茄</span>
        <div class="stat-bar">
          <div class="stat-bar-fill" :style="{ width: `${Math.min(100, record.completedPomodoros * 25)}%` }"></div>
        </div>
      </div>

      <div class="stat-divider"></div>

      <div class="stat-item">
        <div class="stat-value-wrapper">
          <span class="stat-value">{{ record.totalWorkMinutes }}</span>
          <span class="stat-unit">分钟</span>
        </div>
        <span class="stat-label">专注时长</span>
        <div class="stat-bar">
          <div class="stat-bar-fill accent" :style="{ width: `${Math.min(100, record.totalWorkMinutes / 2)}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: var(--color-surface);
  border-radius: 20px;
  padding: 20px 24px;
  margin-top: 20px;
  border: 1px solid var(--color-border);
  box-shadow:
    0 1px 2px var(--color-shadow),
    0 4px 8px var(--color-shadow);
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.stats-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.stats-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 300;
}

.stats-grid {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 4px;
}

.stat-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1;
}

.stat-unit {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
}

.stat-bar {
  height: 3px;
  background: var(--color-ring-bg);
  border-radius: 2px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.stat-bar-fill.accent {
  background: var(--color-accent);
}

.stat-divider {
  width: 1px;
  height: 48px;
  background: var(--color-border);
  flex-shrink: 0;
}
</style>
