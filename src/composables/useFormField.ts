/**
 * 表单字段通用逻辑
 */
import { ref, computed, type Ref } from 'vue'

export interface UseFormFieldOptions<T = any> {
  modelValue: Ref<T>
  rules?: any
  label?: string
  name?: string
}

export function useFormField<T = any>(options: UseFormFieldOptions<T>) {
  const {
    modelValue,
    rules = {},
    label = '',
    name = ''
  } = options

  const isDirty = ref(false)
  const isTouched = ref(false)

  // 简化验证逻辑
  const error = computed(() => {
    if (!isDirty.value) return ''
    // 可以添加更多验证逻辑
    return ''
  })

  const hasError = computed(() => {
    return isDirty.value && !!error.value
  })

  const validate = () => {
    isDirty.value = true
    return Promise.resolve(true)
  }

  const reset = () => {
    isDirty.value = false
    isTouched.value = false
  }

  const handleBlur = () => {
    isTouched.value = true
    isDirty.value = true
  }

  return {
    isDirty,
    isTouched,
    error,
    hasError,
    validate,
    reset,
    handleBlur
  }
}
