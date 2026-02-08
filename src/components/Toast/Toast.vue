<template>
  <Transition
    :name="transitionName"
    @after-leave="handleAfterLeave"
  >
    <div
      v-if="visible"
      :class="toastClasses"
      role="alert"
      aria-live="polite"
    >
      <!-- 图标 -->
      <div v-if="showIcon" :class="iconClasses">
        <svg v-if="type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="type === 'warning'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>

      <!-- 内容 -->
      <div class="flex-1 min-w-0">
        <p v-if="title" class="font-medium text-sm">{{ title }}</p>
        <p class="text-sm" :class="title ? 'text-text-secondary' : 'text-text'">{{ message }}</p>
      </div>

      <!-- 关闭按钮 -->
      <button
        v-if="closable"
        @click="handleClose"
        class="flex-shrink-0 ml-4 text-text-light hover:text-text transition-colors focus:outline-none"
        aria-label="关闭"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { ToastProps, ToastEmits } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  duration: 3000,
  closable: true,
  showIcon: true,
  position: 'top-right'
})

const emit = defineEmits<ToastEmits>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const toastClasses = computed(() => {
  const base = 'flex items-start p-4 rounded-lg shadow-medium max-w-sm w-full pointer-events-auto'
  const typeClasses = {
    success: 'bg-green-50 border-l-4 border-success text-green-800',
    error: 'bg-red-50 border-l-4 border-danger text-red-800',
    warning: 'bg-yellow-50 border-l-4 border-warning text-yellow-800',
    info: 'bg-blue-50 border-l-4 border-secondary text-blue-800'
  }
  return [base, typeClasses[props.type]].join(' ')
})

const iconClasses = computed(() => {
  const typeClasses = {
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
    info: 'text-secondary'
  }
  return `flex-shrink-0 mr-3 ${typeClasses[props.type]}`
})

const transitionName = computed(() => {
  const positionMap = {
    'top-right': 'slide-from-right',
    'top-left': 'slide-from-left',
    'top-center': 'slide-from-top',
    'bottom-right': 'slide-from-right',
    'bottom-left': 'slide-from-left',
    'bottom-center': 'slide-from-bottom'
  }
  return positionMap[props.position || 'top-right']
})

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleAfterLeave = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

onMounted(() => {
  // 等待下一帧，确保 Transition 正常工作
  requestAnimationFrame(() => {
    visible.value = true
    startTimer()
  })
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
/* 从右侧滑入 */
.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: all 0.3s ease;
}

.slide-from-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-from-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* 从左侧滑入 */
.slide-from-left-enter-active,
.slide-from-left-leave-active {
  transition: all 0.3s ease;
}

.slide-from-left-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-from-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* 从顶部滑入 */
.slide-from-top-enter-active,
.slide-from-top-leave-active {
  transition: all 0.3s ease;
}

.slide-from-top-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-from-top-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

/* 从底部滑入 */
.slide-from-bottom-enter-active,
.slide-from-bottom-leave-active {
  transition: all 0.3s ease;
}

.slide-from-bottom-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-from-bottom-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
