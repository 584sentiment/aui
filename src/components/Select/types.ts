/**
 * Select 组件类型定义
 */

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SelectProps {
  modelValue: string | number | undefined
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

export interface SelectEmits {
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}
