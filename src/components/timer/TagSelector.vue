<script setup lang="ts">
import type { TaskTag } from '../../types/timer'

defineProps<{
  tags: TaskTag[]
  currentTagId: string | null
}>()

const emit = defineEmits<{
  select: [tagId: string | null]
}>()
</script>

<template>
  <div class="tag-selector">
    <button
      :class="['tag-chip', { active: currentTagId === null }]"
      @click="emit('select', null)"
    >
      未分类
    </button>
    <button
      v-for="tag in tags"
      :key="tag.id"
      :class="['tag-chip', { active: currentTagId === tag.id }]"
      :style="currentTagId === tag.id ? { background: tag.color, borderColor: tag.color } : {}"
      @click="emit('select', tag.id)"
    >
      <span class="tag-icon">{{ tag.icon }}</span>
      <span class="tag-name">{{ tag.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.tag-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.tag-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.tag-chip:hover {
  background: var(--color-btn-bg);
  border-color: var(--color-border-strong);
}

.tag-chip.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #FFFBF7;
}

.tag-icon {
  font-size: 0.8rem;
  line-height: 1;
}

.tag-name {
  line-height: 1;
}
</style>
