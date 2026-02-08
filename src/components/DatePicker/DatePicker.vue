<template>
  <div class="date-picker-wrapper">
    <label v-if="label" :for="datePickerId" class="block text-sm font-medium text-text mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="datePickerId"
        :class="inputClasses"
        :type="inputType"
        :value="formattedValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :min="minDateFormatted"
        :max="maxDateFormatted"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </span>
    </div>
    <p v-if="error" class="mt-1 text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DatePickerProps, DatePickerEmits } from './types'

const props = withDefaults(defineProps<DatePickerProps>(), {
  type: 'date',
  placeholder: '请选择日期',
  disabled: false,
  format: 'YYYY-MM-DD'
})

const emit = defineEmits<DatePickerEmits>()

const datePickerId = ref(`date-picker-${Math.random().toString(36).substr(2, 9)}`)

const inputType = computed(() => {
  const typeMap = {
    date: 'date',
    datetime: 'datetime-local',
    time: 'time',
    month: 'month',
    year: 'number'
  }
  return typeMap[props.type]
})

const inputClasses = computed(() => {
  const base = 'input-base pr-10'
  const errorClass = props.error ? 'border-danger focus:ring-danger' : ''
  return [base, errorClass].filter(Boolean).join(' ')
})

const formattedValue = computed(() => {
  if (!props.modelValue) return ''
  if (props.modelValue instanceof Date) {
    return formatDate(props.modelValue)
  }
  return props.modelValue
})

const minDateFormatted = computed(() => {
  return props.minDate ? formatDate(props.minDate) : ''
})

const maxDateFormatted = computed(() => {
  return props.maxDate ? formatDate(props.maxDate) : ''
})

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formatMap = {
    date: `${year}-${month}-${day}`,
    datetime: `${year}-${month}-${day}T${hours}:${minutes}`,
    time: `${hours}:${minutes}`,
    month: `${year}-${month}`,
    year: String(year)
  }

  return formatMap[props.type] || formatMap.date
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value ? new Date(target.value) : undefined
  emit('update:modelValue', value)
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  // 可以添加 focus 逻辑
}

const handleBlur = (event: FocusEvent) => {
  // 可以添加 blur 逻辑
}
</script>
