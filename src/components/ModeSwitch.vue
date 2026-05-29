<script setup lang="ts">
import type { TimerMode } from '../types/timer'

defineProps<{ mode: TimerMode }>()
const emit = defineEmits<{ switch: [mode: TimerMode] }>()

const modes: { key: TimerMode; label: string }[] = [
  { key: 'work', label: '工作' },
  { key: 'shortBreak', label: '短休息' },
  { key: 'longBreak', label: '长休息' },
]
</script>

<template>
  <div class="mode-switch">
    <button v-for="m in modes" :key="m.key" :class="['mode-btn', { active: mode === m.key }]"
      @click="emit('switch', m.key)">{{ m.label }}</button>
  </div>
</template>

<style scoped>
.mode-switch { display: flex; gap: 8px; justify-content: center; margin-bottom: 24px; }
.mode-btn {
  padding: 8px 20px; border: none; border-radius: 20px;
  background: var(--color-btn-bg); color: var(--color-text-secondary);
  cursor: pointer; font-size: 0.9rem; transition: all 0.2s ease;
}
.mode-btn.active { background: var(--color-primary); color: #fff; }
</style>
