/**
 * Modal 组件类型定义
 */

export interface ModalProps {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  maskClosable?: boolean
  showFooter?: boolean
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export interface ModalEmits {
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
  afterOpen: []
  afterClose: []
}
