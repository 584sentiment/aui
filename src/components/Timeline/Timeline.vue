<template>
  <div :class="timelineClasses">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="itemClasses"
    >
      <!-- 时间点图标 -->
      <div :class="dotWrapperClasses">
        <div :class="dotClasses(item.status)">
          <span v-if="item.icon" v-html="item.icon" :class="iconClasses" />
          <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- 时间线内容 -->
      <div :class="contentClasses">
        <div class="flex items-start justify-between gap-2">
          <h4 class="text-base font-semibold text-text font-heading">
            {{ item.title }}
          </h4>
          <span v-if="item.timestamp" class="text-sm text-text-light whitespace-nowrap">
            {{ item.timestamp }}
          </span>
        </div>
        <p v-if="item.description" class="text-sm text-text-secondary mt-1">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TimelineProps, TimelineItem } from './types'

const props = withDefaults(defineProps<TimelineProps>(), {
  direction: 'vertical',
  size: 'md'
})

const timelineClasses = computed(() => {
  return props.direction === 'vertical'
    ? 'relative space-y-4'
    : 'relative flex space-x-4 overflow-x-auto'
})

const itemClasses = computed(() => {
  return props.direction === 'vertical'
    ? 'relative flex gap-4'
    : 'relative flex flex-col min-w-[200px]'
})

const dotWrapperClasses = computed(() => {
  return props.direction === 'vertical'
    ? 'flex flex-col items-center'
    : 'flex items-center'
})

const iconClasses = computed(() => {
  return props.size === 'sm' ? 'w-3 h-3' : props.size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
})

const contentClasses = computed(() => {
  return 'flex-1 pt-1'
})

const dotClasses = (status?: TimelineItem['status']) => {
  const base = 'flex items-center justify-center rounded-full border-2 bg-surface transition-all'
  const sizeClasses = props.size === 'sm' ? 'w-6 h-6' : props.size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'

  const statusColors = {
    success: 'border-success text-success',
    warning: 'border-warning text-warning',
    danger: 'border-danger text-danger',
    info: 'border-primary text-primary'
  }

  return [base, sizeClasses, statusColors[status || 'info']].join(' ')
}
</script>
