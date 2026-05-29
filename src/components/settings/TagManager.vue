<script setup lang="ts">
import { ref } from 'vue'
import type { TaskTag } from '../../types/timer'

defineProps<{ tags: TaskTag[] }>()
const emit = defineEmits<{
  add: [tag: Omit<TaskTag, 'isDefault'>]
  remove: [id: string]
}>()

const showAddForm = ref(false)
const newName = ref('')
const newColor = ref('#3B82F6')
const newIcon = ref('📌')

const ICON_OPTIONS = ['💼', '📚', '📖', '🏃', '🧘', '🎨', '🎵', '💻', '📱', '🎮', '✈️', '🍳', '📝', '🔬', '🎯', '📌']
const COLOR_OPTIONS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

function addTag() {
  if (!newName.value.trim()) return
  emit('add', {
    id: Date.now().toString(36),
    name: newName.value.trim(),
    color: newColor.value,
    icon: newIcon.value,
  })
  newName.value = ''
  showAddForm.value = false
}
</script>

<template>
  <div class="settings-section">
    <h3 class="section-title">任务标签</h3>

    <div class="tags-list">
      <div v-for="tag in tags" :key="tag.id" class="tag-item">
        <span class="tag-icon">{{ tag.icon }}</span>
        <span class="tag-name">{{ tag.name }}</span>
        <span v-if="tag.isDefault" class="tag-badge">预设</span>
        <button
          v-if="!tag.isDefault"
          class="tag-remove"
          @click="emit('remove', tag.id)"
        >
          &times;
        </button>
      </div>
    </div>

    <button v-if="!showAddForm" class="add-btn" @click="showAddForm = true">
      + 添加标签
    </button>

    <div v-else class="add-form">
      <input v-model="newName" placeholder="标签名称" class="name-input" maxlength="10" />

      <div class="icon-picker">
        <button
          v-for="icon in ICON_OPTIONS"
          :key="icon"
          class="icon-btn"
          :class="{ active: newIcon === icon }"
          @click="newIcon = icon"
        >
          {{ icon }}
        </button>
      </div>

      <div class="color-picker">
        <button
          v-for="color in COLOR_OPTIONS"
          :key="color"
          class="color-btn"
          :class="{ active: newColor === color }"
          :style="{ background: color }"
          @click="newColor = color"
        ></button>
      </div>

      <div class="form-actions">
        <button class="btn-cancel" @click="showAddForm = false">取消</button>
        <button class="btn-save" @click="addTag">添加</button>
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

.tags-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--color-card-bg);
  border-radius: 10px;
  border: 1px solid var(--color-border);
}

.tag-icon {
  font-size: 1.1rem;
}

.tag-name {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
}

.tag-badge {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  padding: 2px 8px;
  background: var(--color-btn-bg);
  border-radius: 10px;
}

.tag-remove {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 4px;
  transition: color 0.2s;
}

.tag-remove:hover {
  color: #EF4444;
}

.add-btn {
  width: 100%;
  padding: 10px;
  border: 1px dashed var(--color-border-strong);
  border-radius: 10px;
  background: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.add-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--color-card-bg);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.name-input {
  padding: 8px 12px;
  border: 1px solid var(--color-input-border);
  border-radius: 8px;
  background: var(--color-input-bg);
  color: var(--color-text);
  font-size: 0.85rem;
}

.name-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.icon-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.icon-btn.active {
  border-color: var(--color-primary);
  background: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(196, 113, 92, 0.2);
}

.color-picker {
  display: flex;
  gap: 8px;
}

.color-btn {
  width: 28px;
  height: 28px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.color-btn.active {
  border-color: var(--color-text);
  transform: scale(1.15);
}

.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-save {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-cancel {
  background: var(--color-btn-bg);
  color: var(--color-text-secondary);
}

.btn-save {
  background: var(--color-primary);
  color: #FFFBF7;
}
</style>
