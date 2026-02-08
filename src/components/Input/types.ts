/**
 * Input 组件类型定义
 */

export type InputSize = 'sm' | 'md' | 'lg'
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'

export interface InputProps {
  modelValue: string | number
  type?: InputType
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  label?: string
  name?: string
  id?: string
  autocomplete?: string
  maxLength?: number
  min?: number
  max?: number
  step?: number
}

export interface InputEmits {
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  change: [event: Event]
  keydown: [event: KeyboardEvent]
}
