/**
 * DatePicker 组件类型定义
 */

export type DatePickerType = 'date' | 'datetime' | 'time' | 'month' | 'year'

export interface DatePickerProps {
  modelValue: Date | string | undefined
  type?: DatePickerType
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  name?: string
  format?: string
  minDate?: Date | string
  maxDate?: Date | string
  disabledDates?: Date[]
  showShortcuts?: boolean
  showClearButton?: boolean
}

export interface DatePickerEmits {
  'update:modelValue': [value: Date | undefined]
  change: [value: Date | undefined]
}
