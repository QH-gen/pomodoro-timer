<script setup lang="ts">
</script>

<template>
  <div class="stats-page">
    <h2 class="page-title">统计分析</h2>
    <div class="placeholder">
      <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="placeholder-text">图表功能即将上线...</p>
    </div>
  </div>
</template>

<style scoped>
.stats-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.page-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-text);
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 24px;
  background: var(--color-surface);
  border-radius: 20px;
  border: 1px dashed var(--color-border-strong);
}

.placeholder-icon {
  width: 48px;
  height: 48px;
  color: var(--color-text-muted);
}

.placeholder-text {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
</style>
