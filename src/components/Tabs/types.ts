/**
 * Tabs 组件类型定义
 */

export interface TabItem {
  label: string
  value: string
  disabled?: boolean
  icon?: string
}

export interface TabsProps {
  modelValue: string
  items: TabItem[]
  variant?: 'line' | 'card'
  size?: 'sm' | 'md' | 'lg'
}

export interface TabsEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
