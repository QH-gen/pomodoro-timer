<script setup lang="ts">
defineProps<{ modelValue: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const options = [
  { label: '7天', value: 7 },
  { label: '30天', value: 30 },
]
</script>

<template>
  <div class="time-range">
    <button
      v-for="opt in options"
      :key="opt.value"
      class="range-btn"
      :class="{ active: modelValue === opt.value }"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.time-range {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.range-btn {
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
}

.range-btn:hover {
  border-color: var(--color-border-strong);
  color: var(--color-text-secondary);
}

.range-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFBF7;
}
</style>
