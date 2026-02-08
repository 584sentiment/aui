<template>
  <component
    :is="computedTag"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    :href="href"
    :target="target"
    @click="handleClick"
  >
    <span v-if="loading" class="animate-spin mr-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps, ButtonEmits } from './types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button'
})

const emit = defineEmits<ButtonEmits>()

const computedTag = computed(() => {
  return props.href ? 'a' : 'button'
})

const baseClasses = 'btn-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const sizeClasses = computed(() => {
  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  return sizeMap[props.size]
})

const variantClasses = computed(() => {
  const variantMap = {
    primary: 'bg-primary text-white hover:bg-primaryHover focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-primaryHover focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primaryLight focus:ring-primary',
    ghost: 'text-text hover:bg-background border-2 border-transparent hover:border-border focus:ring-text',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger'
  }
  return variantMap[props.variant]
})

const buttonClasses = computed(() => {
  return [
    baseClasses,
    'rounded-xl', // 直接添加圆角类
    sizeClasses.value,
    variantClasses.value,
    props.block && 'w-full'
  ].filter(Boolean).join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
