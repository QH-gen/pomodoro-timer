<script setup lang="ts">
import type { TimerSettings } from '../../types/timer'

defineProps<{ settings: TimerSettings }>()
const emit = defineEmits<{ update: [settings: Partial<TimerSettings>] }>()

function updateField(field: keyof TimerSettings, value: number) {
  emit('update', { [field]: value })
}
</script>

<template>
  <div class="settings-section">
    <h3 class="section-title">计时器设置</h3>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">工作时长</span>
        <span class="setting-hint">专注时间</span>
      </div>
      <div class="setting-input">
        <input
          type="number"
          :value="settings.workDuration"
          @input="updateField('workDuration', +($event.target as HTMLInputElement).value)"
          min="1"
          max="120"
        />
        <span class="unit">分钟</span>
      </div>
    </div>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">短休息</span>
        <span class="setting-hint">番茄间隔</span>
      </div>
      <div class="setting-input">
        <input
          type="number"
          :value="settings.shortBreakDuration"
          @input="updateField('shortBreakDuration', +($event.target as HTMLInputElement).value)"
          min="1"
          max="30"
        />
        <span class="unit">分钟</span>
      </div>
    </div>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">长休息</span>
        <span class="setting-hint">深度放松</span>
      </div>
      <div class="setting-input">
        <input
          type="number"
          :value="settings.longBreakDuration"
          @input="updateField('longBreakDuration', +($event.target as HTMLInputElement).value)"
          min="1"
          max="60"
        />
        <span class="unit">分钟</span>
      </div>
    </div>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">长休息间隔</span>
        <span class="setting-hint">每 N 个番茄</span>
      </div>
      <div class="setting-input">
        <input
          type="number"
          :value="settings.longBreakInterval"
          @input="updateField('longBreakInterval', +($event.target as HTMLInputElement).value)"
          min="2"
          max="10"
        />
        <span class="unit">个</span>
      </div>
    </div>

    <div class="setting-row">
      <div class="setting-info">
        <span class="setting-label">每日目标</span>
        <span class="setting-hint">番茄数量</span>
      </div>
      <div class="setting-input">
        <input
          type="number"
          :value="settings.dailyGoal"
          @input="updateField('dailyGoal', +($event.target as HTMLInputElement).value)"
          min="1"
          max="20"
        />
        <span class="unit">个</span>
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
  box-shadow: 0 0 0 3px rgba(196, 113, 92, 0.15);
}

.unit {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  min-width: 24px;
}
</style>
