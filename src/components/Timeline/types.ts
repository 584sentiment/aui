/**
 * Timeline 组件类型定义
 */

export interface TimelineItem {
  id: string | number
  title: string
  description?: string
  timestamp?: string
  status?: 'success' | 'warning' | 'danger' | 'info'
  icon?: string
}

export interface TimelineProps {
  items: TimelineItem[]
  direction?: 'vertical' | 'horizontal'
  size?: 'sm' | 'md' | 'lg'
}
