<script setup lang="ts">
import { ref } from 'vue'
import type { TimerSettings } from '../types/timer'

const props = defineProps<{ settings: TimerSettings }>()
const emit = defineEmits<{ update: [settings: Partial<TimerSettings>] }>()

const isOpen = ref(false)
const form = ref({ ...props.settings })

function open() {
  form.value = { ...props.settings }
  isOpen.value = true
}

function save() {
  emit('update', { ...form.value })
  isOpen.value = false
}
</script>

<template>
  <button class="settings-toggle" @click="open">⚙️ 设置</button>

  <Teleport to="body">
    <div v-if="isOpen" class="overlay" @click.self="isOpen = false">
      <div class="panel">
        <h3>设置</h3>
        <label>工作时长（分钟）<input v-model.number="form.workDuration" type="number" min="1" max="120" /></label>
        <label>短休息时长（分钟）<input v-model.number="form.shortBreakDuration" type="number" min="1" max="30" /></label>
        <label>长休息时长（分钟）<input v-model.number="form.longBreakDuration" type="number" min="1" max="60" /></label>
        <label>长休息间隔（番茄数）<input v-model.number="form.longBreakInterval" type="number" min="2" max="10" /></label>
        <div class="panel-actions">
          <button class="btn btn-secondary" @click="isOpen = false">取消</button>
          <button class="btn btn-primary" @click="save">保存</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.settings-toggle { background: none; border: none; color: var(--color-text-secondary); cursor: pointer; font-size: 0.9rem; margin-top: 16px; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
.panel { background: var(--color-card-bg); border-radius: 16px; padding: 24px; width: 300px; }
h3 { margin: 0 0 20px; }
label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.9rem; color: var(--color-text-secondary); }
input { width: 80px; padding: 6px 8px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-input-bg); color: var(--color-text); text-align: center; }
.panel-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }
.btn { padding: 8px 20px; border: none; border-radius: 6px; cursor: pointer; }
.btn-primary { background: var(--color-primary); color: #fff; }
.btn-secondary { background: var(--color-btn-bg); color: var(--color-text-secondary); }
</style>
