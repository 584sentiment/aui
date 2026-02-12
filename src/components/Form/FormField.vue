<template>
  <div class="form-field" :class="fieldClasses">
    <label
      v-if="label"
      :for="name"
      :class="labelClasses"
      :style="labelStyle"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>
    <div class="form-field-content">
      <slot />
      <div v-if="errorMessage" class="form-field-error text-error text-sm mt-1">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

interface FormFieldProps {
  label?: string
  name?: string
  required?: boolean
}

const props = withDefaults(defineProps<FormFieldProps>(), {
  name: '',
  required: false
})

// 注入表单上下文
const formContext = inject<any>('form', null)
const validate = inject<any>('validate', null)

// 计算错误消息
const errorMessage = computed(() => {
  if (!validate || !props.name) return ''
  const errors = validate.value?.$errors || validate.$errors
  if (!errors || !Array.isArray(errors)) return ''
  const fieldError = errors.find((e: any) => e.$property === props.name)
  return fieldError?.$message || ''
})

// 计算样式类
const fieldClasses = computed(() => {
  const labelPosition = formContext?.labelPosition || 'top'
  return {
    [`form-field-${labelPosition}`]: true,
    'form-field-has-error': !!errorMessage.value
  }
})

const labelWidth = computed(() => {
  return formContext?.labelWidth || '120px'
})

const labelClasses = computed(() => {
  const labelPosition = formContext?.labelPosition || 'top'
  return {
    'form-label-left': labelPosition === 'left',
    'form-label-top': labelPosition === 'top',
    'form-label-right': labelPosition === 'right'
  }
})

const labelStyle = computed(() => {
  const labelPosition = formContext?.labelPosition || 'top'
  if (labelPosition === 'left' || labelPosition === 'right') {
    return { width: labelWidth.value }
  }
  return {}
})
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
}

.form-field-top {
  display: block;
}

.form-field-top .form-label-top {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1e293b;
}

.form-field-left {
  display: flex;
  align-items: flex-start;
}

.form-field-left .form-label-left {
  flex-shrink: 0;
  margin-right: 1rem;
  padding-top: 0.625rem; /* align with input */
  font-weight: 500;
  color: #1e293b;
}

.form-field-right {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
}

.form-field-right .form-label-right {
  flex-shrink: 0;
  margin-left: 1rem;
  padding-top: 0.625rem;
  font-weight: 500;
  color: #1e293b;
}

.form-field-content {
  flex: 1;
  width: 100%;
}

.form-field-error {
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.form-field-has-error :deep(.input-wrapper .input),
.form-field-has-error :deep(.input) {
  border-color: #ef4444;
}
</style>
