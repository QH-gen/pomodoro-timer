<script setup lang="ts">
import type { AutoSwitchSettings as AutoSwitchType } from '../../types/timer'

defineProps<{ settings: AutoSwitchType }>()
const emit = defineEmits<{ update: [settings: Partial<AutoSwitchType>] }>()
</script>

<template>
  <div class="settings-section">
    <h3 class="section-title">自动切换</h3>

    <div class="setting-row" @click="emit('update', { autoStartBreak: !settings.autoStartBreak })">
      <div class="setting-info">
        <span class="setting-label">工作后自动休息</span>
        <span class="setting-hint">工作结束自动开始休息</span>
      </div>
      <div class="toggle" :class="{ active: settings.autoStartBreak }">
        <div class="toggle-thumb"></div>
      </div>
    </div>

    <div class="setting-row" @click="emit('update', { autoStartWork: !settings.autoStartWork })">
      <div class="setting-info">
        <span class="setting-label">休息后自动工作</span>
        <span class="setting-hint">休息结束自动开始工作</span>
      </div>
      <div class="toggle" :class="{ active: settings.autoStartWork }">
        <div class="toggle-thumb"></div>
      </div>
    </div>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">倒计时秒数</span>
        <span class="setting-hint">自动切换前等待</span>
      </div>
      <div class="setting-input">
        <input
          type="number"
          :value="settings.countdownSeconds"
          @input="emit('update', { countdownSeconds: +($event.target as HTMLInputElement).value })"
          min="1"
          max="10"
        />
        <span class="unit">秒</span>
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
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
}

.setting-row:last-child {
  border-bottom: none;
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

.setting-input {
  display: flex;
  align-items: center;
  gap: 6px;
}

input {
  width: 56px;
  padding: 6px 8px;
  border: 1px solid var(--color-input-border);
  border-radius: 8px;
  background: var(--color-input-bg);
  color: var(--color-text);
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.unit {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}
</style>
