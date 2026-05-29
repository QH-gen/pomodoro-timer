<script setup lang="ts">
import { computed } from 'vue'
import { useTimer } from '../composables/useTimer'
import TimerDisplay from '../components/TimerDisplay.vue'
import ModeSwitch from '../components/ModeSwitch.vue'
import ControlButtons from '../components/ControlButtons.vue'
import StatsCard from '../components/StatsCard.vue'
import TagSelector from '../components/timer/TagSelector.vue'
import DailyGoal from '../components/timer/DailyGoal.vue'
const { store, countdown, toggleTimer, resetTimer, switchMode } = useTimer()

const nextModeLabel = computed(() => {
  return store.mode === 'work' ? '休息' : '工作'
})

function cycleMod(count: number, interval: number): number {
  const r = count % interval
  return r === 0 ? (count > 0 ? interval : 0) : r
}
</script>

<template>
  <div class="timer-view">
    <!-- 模式切换 -->
    <ModeSwitch :mode="store.mode" :settings="store.settings" @switch="switchMode" />

    <!-- 计时器 -->
    <TimerDisplay
      :time-left="store.timeLeft"
      :progress="store.progress"
      :is-running="store.isRunning"
    />

    <!-- 控制按钮 -->
    <ControlButtons :is-running="store.isRunning" @toggle="toggleTimer" @reset="resetTimer" />

    <!-- 自动切换倒计时 -->
    <div v-if="countdown !== null" class="countdown-banner">
      <span class="countdown-text">{{ countdown }} 秒后自动{{ nextModeLabel }}</span>
      <button class="countdown-cancel" @click="resetTimer">取消</button>
    </div>

    <!-- 标签选择器 -->
    <TagSelector
      :tags="store.tags"
      :current-tag-id="store.currentTagId"
      @select="store.setCurrentTag"
    />

    <!-- 番茄计数 -->
    <div class="pomodoro-count">
      <div class="count-dots">
        <span
          v-for="i in store.settings.longBreakInterval"
          :key="i"
          class="count-dot"
          :class="{ filled: cycleMod(store.pomodoroCount, store.settings.longBreakInterval) >= i }"
        ></span>
      </div>
      <span class="count-text">
        已完成 <strong>{{ store.pomodoroCount }}</strong> 个番茄
      </span>
    </div>

    <!-- 每日目标 -->
    <DailyGoal :current="store.dailyProgress" :target="store.settings.dailyGoal" />

    <!-- 统计卡片 -->
    <StatsCard :record="store.todayRecord" />
  </div>
</template>

<style scoped>
.timer-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 24px 0;
}

/* 番茄计数 */
.pomodoro-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 16px 0 8px;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
}

.count-dots {
  display: flex;
  gap: 8px;
}

.count-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-ring-bg);
  border: 1.5px solid var(--color-border-strong);
  transition: all 0.3s ease;
}

.count-dot.filled {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 0 8px rgba(196, 113, 92, 0.3);
}

.count-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.count-text strong {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  color: var(--color-text);
}

/* 自动切换倒计时 */
.countdown-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  animation: fadeInUp 0.3s ease;
}

.countdown-text {
  font-size: 0.85rem;
  color: var(--color-text);
  font-weight: 500;
}

.countdown-text strong {
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-primary);
}

.countdown-cancel {
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-btn-bg);
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.countdown-cancel:hover {
  background: var(--color-btn-hover);
  border-color: var(--color-border-strong);
}
</style>
