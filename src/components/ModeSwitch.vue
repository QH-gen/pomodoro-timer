<script setup lang="ts">
import type { TimerMode } from '../types/timer'

defineProps<{ mode: TimerMode }>()
const emit = defineEmits<{ switch: [mode: TimerMode] }>()

const modes: { key: TimerMode; label: string; desc: string }[] = [
  { key: 'work', label: '工作', desc: '25分钟' },
  { key: 'shortBreak', label: '小憩', desc: '5分钟' },
  { key: 'longBreak', label: '长休', desc: '15分钟' },
]
</script>

<template>
  <div class="mode-switch">
    <div class="mode-track">
      <button
        v-for="m in modes"
        :key="m.key"
        :class="['mode-btn', { active: mode === m.key }]"
        @click="emit('switch', m.key)"
      >
        <span class="mode-label">{{ m.label }}</span>
        <span class="mode-desc">{{ m.desc }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.mode-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

.mode-track {
  display: flex;
  gap: 2px;
  padding: 4px;
  background: var(--color-bg-warm);
  border-radius: 16px;
  border: 1px solid var(--color-border);
}

.mode-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  min-width: 70px;
}

.mode-btn:hover {
  background: var(--color-surface);
}

.mode-btn.active {
  background: var(--color-card-bg);
  box-shadow:
    0 1px 2px var(--color-shadow),
    0 4px 8px var(--color-shadow);
}

.mode-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
}

.mode-btn.active .mode-label {
  color: var(--color-primary);
}

.mode-desc {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 300;
}

.mode-btn.active .mode-desc {
  color: var(--color-text-secondary);
}
</style>
