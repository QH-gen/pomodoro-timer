<script setup lang="ts">
defineProps<{
  timeLeft: number
  progress: number
  isRunning: boolean
}>()

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
</script>

<template>
  <div class="timer-wrapper">
    <div class="timer-display" :class="{ running: isRunning }">
      <!-- 外环装饰 -->
      <div class="timer-outer-ring"></div>

      <!-- 主计时器圆盘 -->
      <div class="timer-disc">
        <!-- 进度环 SVG -->
        <svg class="progress-ring" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: var(--color-primary-light)" />
              <stop offset="50%" style="stop-color: var(--color-primary)" />
              <stop offset="100%" style="stop-color: var(--color-accent)" />
            </linearGradient>
            <!-- 内发光滤镜 -->
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- 背景轨道 -->
          <circle
            class="ring-track"
            cx="100" cy="100" r="85"
            fill="none"
            stroke-width="6"
          />

          <!-- 进度填充 -->
          <circle
            class="ring-progress"
            cx="100" cy="100" r="85"
            fill="none"
            stroke-width="6"
            stroke-linecap="round"
            :stroke-dasharray="534.07"
            :stroke-dashoffset="534.07 * (1 - progress)"
            stroke="url(#ringGradient)"
            filter="url(#glow)"
          />

          <!-- 刻度标记 -->
          <g class="tick-marks" opacity="0.3">
            <line
              v-for="i in 12"
              :key="i"
              x1="100"
              y1="18"
              x2="100"
              y2="24"
              :transform="`rotate(${i * 30} 100 100)`"
              stroke="var(--color-text-muted)"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </g>
        </svg>

        <!-- 中心内容 -->
        <div class="timer-content">
          <div class="timer-time">
            <span class="time-digits">{{ formatTime(timeLeft) }}</span>
          </div>
          <div class="timer-status">
            <span class="status-dot" :class="{ active: isRunning }"></span>
            <span class="status-text">{{ isRunning ? '专注中' : '准备开始' }}</span>
          </div>
        </div>
      </div>

      <!-- 呼吸光晕（运行时） -->
      <div v-if="isRunning" class="breathing-glow"></div>
    </div>
  </div>
</template>

<style scoped>
.timer-wrapper {
  padding: 8px 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.timer-display {
  position: relative;
  width: 240px;
  height: 240px;
  margin: 0 auto;
}

/* 外环装饰 */
.timer-outer-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  opacity: 0.5;
}

/* 主圆盘 */
.timer-disc {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--color-surface);
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  box-shadow:
    0 2px 4px var(--color-shadow),
    0 8px 16px var(--color-shadow),
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px var(--color-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timer-display.running .timer-disc {
  box-shadow:
    0 2px 4px var(--color-shadow),
    0 8px 16px var(--color-shadow-md),
    0 16px 32px var(--color-shadow),
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px var(--color-shadow);
}

/* 进度环 */
.progress-ring {
  position: absolute;
  inset: 12px;
  transform: rotate(-90deg);
}

.ring-track {
  stroke: var(--color-ring-track);
}

.ring-progress {
  transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.tick-marks {
  transition: opacity 0.3s ease;
}

.timer-display.running .tick-marks {
  opacity: 0.5;
}

/* 中心内容 */
.timer-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.timer-time {
  margin-bottom: 4px;
}

.time-digits {
  font-family: 'JetBrains Mono', monospace;
  font-size: 2.8rem;
  font-weight: 300;
  letter-spacing: 4px;
  color: var(--color-text);
  text-shadow: 0 1px 2px var(--color-shadow);
  transition: color 0.3s ease;
}

.timer-display.running .time-digits {
  color: var(--color-primary-dark);
}

/* 状态指示器 */
.timer-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-muted);
  transition: all 0.3s ease;
}

.status-dot.active {
  background: var(--color-primary);
  box-shadow: 0 0 8px var(--color-primary-light);
  animation: breathe 2s ease-in-out infinite;
}

.status-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* 呼吸光晕 */
.breathing-glow {
  position: absolute;
  inset: -16px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%);
  opacity: 0.15;
  animation: breathe 3s ease-in-out infinite;
  pointer-events: none;
}

/* 运行时动画 */
.timer-display.running .timer-disc {
  animation: gentlePulse 3s ease-in-out infinite;
}
</style>
