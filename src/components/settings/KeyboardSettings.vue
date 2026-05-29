<script setup lang="ts">
import type { KeyboardSettings as KeyboardType } from '../../types/timer'

defineProps<{ settings: KeyboardType }>()
const emit = defineEmits<{ update: [settings: Partial<KeyboardType>] }>()

const KEY_LABELS: Record<string, string> = {
  'Space': '空格',
  'KeyR': 'R',
  'KeyS': 'S',
  'KeyT': 'T',
  'Digit1': '1',
  'Digit2': '2',
  'Digit3': '3',
}

const shortcuts = [
  { field: 'startPause' as const, label: '开始/暂停', defaultKey: 'Space' },
  { field: 'reset' as const, label: '重置', defaultKey: 'KeyR' },
  { field: 'workMode' as const, label: '工作模式', defaultKey: 'Digit1' },
  { field: 'shortBreak' as const, label: '短休息', defaultKey: 'Digit2' },
  { field: 'longBreak' as const, label: '长休息', defaultKey: 'Digit3' },
]
</script>

<template>
  <div class="settings-section">
    <h3 class="section-title">快捷键</h3>

    <div class="setting-row" @click="emit('update', { enabled: !settings.enabled })">
      <div class="setting-info">
        <span class="setting-label">启用快捷键</span>
        <span class="setting-hint">全局键盘快捷键</span>
      </div>
      <div class="toggle" :class="{ active: settings.enabled }">
        <div class="toggle-thumb"></div>
      </div>
    </div>

    <div v-if="settings.enabled" class="shortcuts-list">
      <div v-for="s in shortcuts" :key="s.field" class="shortcut-row">
        <span class="shortcut-label">{{ s.label }}</span>
        <kbd class="shortcut-key">{{ KEY_LABELS[settings[s.field]] ?? settings[s.field] }}</kbd>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-section {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--color-border);
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 16px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.setting-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
}

.setting-hint {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.toggle {
  width: 44px;
  height: 24px;
  background: var(--color-border-strong);
  border-radius: 12px;
  position: relative;
  transition: background 0.2s;
}

.toggle.active {
  background: var(--color-primary);
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.toggle.active .toggle-thumb {
  transform: translateX(20px);
}

.shortcuts-list {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shortcut-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.shortcut-label {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.shortcut-key {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  padding: 3px 10px;
  background: var(--color-btn-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
}
</style>
