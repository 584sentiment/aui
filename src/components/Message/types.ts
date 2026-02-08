export type MessageType = 'success' | 'error' | 'warning' | 'info'

export interface MessageProps {
  id?: string | number
  type?: MessageType
  title?: string
  message: string
  duration?: number // 0 表示不自动关闭
  closable?: boolean
  showIcon?: boolean
  center?: boolean // 是否居中显示
}

export interface MessageEmits {
  close: []
}
