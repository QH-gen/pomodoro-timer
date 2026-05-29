<script setup lang="ts">
defineProps<{
  current: number
  target: number
}>()
</script>

<template>
  <div class="daily-goal">
    <div class="goal-header">
      <span class="goal-label">每日目标</span>
      <span class="goal-count">{{ current }} / {{ target }}</span>
    </div>
    <div class="goal-bar">
      <div
        class="goal-bar-fill"
        :style="{ width: `${Math.min(100, (current / target) * 100)}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.daily-goal {
  width: 100%;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.goal-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.goal-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.goal-bar {
  height: 6px;
  background: var(--color-ring-bg);
  border-radius: 3px;
  overflow: hidden;
}

.goal-bar-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
