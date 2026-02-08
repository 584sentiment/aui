<template>
  <div class="switch-wrapper">
    <label v-if="label" class="block text-sm font-medium text-text mb-2">
      {{ label }}
    </label>
    <button
      :class="switchClasses"
      :disabled="disabled"
      role="switch"
      :aria-checked="modelValue"
      @click="toggle"
      @keydown.prevent.enter="toggle"
      @keydown.prevent.space="toggle"
      tabindex="0"
    >
      <span :class="sliderClasses" aria-hidden="true" />
      <span class="sr-only">{{ label || 'Toggle' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  size: 'md'
})

const emit = defineEmits<SwitchEmits>()

const switchClasses = computed(() => {
  const base = 'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-13'
  }
  const colorClasses = props.modelValue ? 'bg-primary' : 'bg-gray-200'
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  return [base, sizeClasses[props.size], colorClasses, disabledClass].filter(Boolean).join(' ')
})

const sliderClasses = computed(() => {
  const base = 'pointer-events-none inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out'
  const sizeClasses = {
    sm: 'h-4 w-4 translate-x-0',
    md: 'h-5 w-5 translate-x-0',
    lg: 'h-6 w-6 translate-x-0'
  }
  const translateClasses = props.modelValue ? {
    sm: 'translate-x-4',
    md: 'translate-x-5',
    lg: 'translate-x-6'
  } : {
    sm: 'translate-x-0',
    md: 'translate-x-0',
    lg: 'translate-x-0'
  }

  return [base, sizeClasses[props.size].split(' ')[0], sizeClasses[props.size].split(' ')[1], translateClasses[props.size]].filter(Boolean).join(' ')
})

const toggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
