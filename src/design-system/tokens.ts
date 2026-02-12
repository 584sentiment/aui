/**
 * Job-Ai 设计令牌
 * 统一的设计变量，用于所有组件
 */

export const colors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryLight: '#DBEAFE',
  primaryDark: '#1E40AF',
  secondary: '#3B82F6',
  cta: '#F97316',
  ctaHover: '#EA580C',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B'
} as const

export const typography = {
  fontFamily: {
    sans: "'Open Sans', sans-serif",
    heading: "'Poppins', sans-serif"
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  }
} as const

export const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem'
} as const

export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px'
} as const

export const shadows = {
  soft: '0 2px 8px rgba(0, 0, 0, 0.05)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.08)',
  strong: '0 8px 24px rgba(0, 0, 0, 0.12)'
} as const

export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms'
} as const

/**
 * Z-index 层级规范
 *
 * 参考主流 UI 库的层级设计（Element Plus、Ant Design、shadcn/ui）
 *
 * 使用说明：
 * - dropdown: 下拉菜单、Select、Autocomplete 等
 * - sticky: 吸顶容器
 * - fixed: 固定定位元素（如页脚固定按钮）
 * - modalBackdrop: 模态框遮罩
 * - modal: 模态框内容
 * - popover: 气泡卡片、Popconfirm 等
 * - tooltip: 提示框（最高层级）
 *
 * 注意：项目中有更高层级需求时，应在此范围内选择，而非超出范围
 */
export const zIndex = {
  dropdown: 2000,      // 下拉菜单（Select、DatePicker 等）
  sticky: 2010,        // 吸顶元素
  fixed: 2020,         // 固定定位
  modalBackdrop: 3000, // 模态框遮罩
  modal: 3010,         // 模态框内容
  popover: 4000,       // 气泡卡片
  tooltip: 5000        // 提示框（最高）
} as const
