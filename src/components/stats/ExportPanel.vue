<script setup lang="ts">
import type { HistoryRecord, TaskTag } from '../../types/timer'
import { exportJSON, exportCSV } from '../../utils/export'

defineProps<{ records: HistoryRecord[]; tags: TaskTag[] }>()
</script>

<template>
  <div class="export-panel">
    <h3 class="panel-title">数据导出</h3>
    <div class="export-buttons">
      <button class="export-btn" @click="exportJSON({ history: records, tags })">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>导出 JSON</span>
      </button>
      <button class="export-btn" @click="exportCSV(records, tags)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>导出 CSV</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.export-panel {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--color-border);
}

.panel-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}

.export-buttons {
  display: flex;
  gap: 10px;
}

.export-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-card-bg);
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
}

.export-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-btn-bg);
}
</style>
