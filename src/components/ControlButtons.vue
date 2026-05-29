<script setup lang="ts">
defineProps<{ isRunning: boolean }>()
const emit = defineEmits<{ toggle: []; reset: [] }>()
</script>

<template>
  <div class="control-buttons">
    <button class="btn btn-primary" @click="emit('toggle')">
      <span class="btn-content">
        <svg v-if="!isRunning" class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
        <span class="btn-text">{{ isRunning ? '暂停' : '开始专注' }}</span>
      </span>
    </button>

    <button class="btn btn-secondary" @click="emit('reset')">
      <span class="btn-content">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 3v5h5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="btn-text">重置</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.control-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 24px 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

.btn {
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  -webkit-tap-highlight-color: transparent;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.btn-text {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

/* 主按钮 - 开始/暂停 */
.btn-primary {
  background: var(--gradient-primary);
  color: #FFFBF7;
  border-radius: 16px;
  box-shadow:
    0 1px 2px var(--color-shadow),
    0 4px 8px rgba(196, 113, 92, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow:
    0 2px 4px var(--color-shadow),
    0 8px 16px rgba(196, 113, 92, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow:
    0 1px 2px var(--color-shadow),
    inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 次要按钮 - 重置 */
.btn-secondary {
  background: var(--color-btn-bg);
  color: var(--color-text-secondary);
  border-radius: 16px;
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-btn-hover);
  color: var(--color-text);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--color-shadow);
}

.btn-secondary:active {
  transform: translateY(0);
  background: var(--color-bg-warm);
}
</style>
