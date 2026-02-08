/**
 * Switch 组件类型定义
 */

export interface SwitchProps {
  modelValue: boolean
  disabled?: boolean
  label?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

export interface SwitchEmits {
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}
