export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'

export interface ToastProps {
  id?: string | number
  type?: ToastType
  title?: string
  message: string
  duration?: number // 0 表示不自动关闭
  closable?: boolean
  showIcon?: boolean
  position?: ToastPosition
  onClose?: () => void
}

export interface ToastEmits {
  close: []
}
