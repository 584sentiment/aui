<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-text mb-1">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :class="inputClasses"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :name="name"
      :autocomplete="autocomplete"
      :maxlength="maxLength"
      :min="min"
      :max="max"
      :step="step"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    />
    <p v-if="error" class="mt-1 text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputProps, InputEmits } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false
})

const emit = defineEmits<InputEmits>()

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

const sizeClasses = computed(() => {
  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg'
  }
  return sizeMap[props.size]
})

const inputClasses = computed(() => {
  const base = 'input-base w-full'
  const errorClass = props.error ? 'border-danger focus:ring-danger' : ''
  return [
    base,
    sizeClasses.value,
    errorClass
  ].filter(Boolean).join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}
</script>
