/**
 * Form 组件类型定义
 */

export type FormRuleType = 'required' | 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern'

export interface FormRule {
  type?: FormRuleType
  required?: boolean
  message?: string
  validator?: (value: any) => boolean | string
  min?: number
  max?: number
  pattern?: RegExp
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormProps {
  model: Record<string, any>
  rules?: FormRules
  labelWidth?: string
  labelPosition?: 'left' | 'top' | 'right'
  disabled?: boolean
}

export interface FormEmits {
  submit: [model: Record<string, any>]
  reset: []
}

export interface FormFieldProps {
  label?: string
  name?: string
  required?: boolean
}
