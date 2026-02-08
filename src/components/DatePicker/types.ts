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
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
}

export interface DatePickerEmits {
  'update:modelValue': [value: Date | string | undefined]
  change: [value: Date | string | undefined]
}
