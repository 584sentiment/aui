/**
 * Button 组件类型定义
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}
