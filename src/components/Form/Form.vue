<template>
  <form
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
    class="form-wrapper"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import type { FormProps, FormEmits, FormRules } from './types'

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: '120px',
  labelPosition: 'top',
  disabled: false
})

const emit = defineEmits<FormEmits>()

// 创建表单上下文
const formContext = ref({
  model: props.model,
  rules: props.rules,
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition,
  disabled: props.disabled
})

provide('form', formContext)

// 验证辅助函数 - 必须在 computed rules 之前定义
const required = (value: any) => !!value || '此字段为必填项'
const email = (value: string) => /.+@.+\..+/.test(value) || '请输入有效的邮箱地址'
const minValue = (min: number) => (value: number) => value >= min || `最小值为 ${min}`
const maxValue = (max: number) => (value: number) => value <= max || `最大值为 ${max}`
const minLength = (min: number) => (value: string) => value.length >= min || `最少 ${min} 个字符`
const maxLength = (max: number) => (value: string) => value.length <= max || `最多 ${max} 个字符`

// Vuelidate 实例
const rules = computed(() => {
  if (!props.rules) return {}

  const vuelidateRules: Record<string, any> = {}
  Object.entries(props.rules).forEach(([field, fieldRules]) => {
    const rulesArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules]
    vuelidateRules[field] = rulesArray.map(rule => {
      if (rule.type === 'required') {
        return { required }
      } else if (rule.type === 'email') {
        return { email }
      } else if (rule.type === 'min' && rule.min !== undefined) {
        return { minValue: minValue(rule.min) }
      } else if (rule.type === 'max' && rule.max !== undefined) {
        return { maxValue: maxValue(rule.max) }
      } else if (rule.type === 'minLength' && rule.min !== undefined) {
        return { minLength: minLength(rule.min) }
      } else if (rule.type === 'maxLength' && rule.max !== undefined) {
        return { maxLength: maxLength(rule.max) }
      } else if (rule.type === 'pattern' && rule.pattern) {
        return { pattern: rule.pattern }
      } else if (rule.validator) {
        return rule.validator
      }
      return {}
    })
  })
  return vuelidateRules
})

const v$ = useVuelidate(rules, props.model)

// 提供验证方法给子组件
provide('validate', v$)

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    emit('submit', props.model)
  }
}

const handleReset = () => {
  v$.value.$reset()
  emit('reset')
}

// 暴露方法
defineExpose({
  validate: () => v$.value.$validate(),
  reset: () => v$.value.$reset(),
  getErrors: () => v$.value.$errors
})
</script>
