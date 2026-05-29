<script setup lang="ts">
defineProps<{ isRunning: boolean }>()
const emit = defineEmits<{ toggle: []; reset: [] }>()
</script>

<template>
  <div class="control-buttons">
    <button class="btn btn-primary" @click="emit('toggle')">{{ isRunning ? '暂停' : '开始' }}</button>
    <button class="btn btn-secondary" @click="emit('reset')">重置</button>
  </div>
</template>

<style scoped>
.control-buttons { display: flex; gap: 12px; justify-content: center; margin: 24px 0; }
.btn { padding: 10px 32px; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; transition: opacity 0.2s ease; }
.btn:hover { opacity: 0.85; }
.btn-primary { background: var(--color-primary); color: #fff; }
.btn-secondary { background: var(--color-btn-bg); color: var(--color-text-secondary); }
</style>
