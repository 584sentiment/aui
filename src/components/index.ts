/**
 * 组件统一导出
 */

// 基础组件
export { default as Button } from './Button/Button.vue'
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button/types'

// 表单组件
export { default as Input } from './Input/Input.vue'
export type { InputProps, InputSize } from './Input/types'

export { default as Switch } from './Switch/Switch.vue'
export type { SwitchProps } from './Switch/types'

// 导航组件
export { default as Tabs } from './Tabs/Tabs.vue'
export type { TabsProps, TabItem } from './Tabs/types'

export { default as Pagination } from './Pagination/Pagination.vue'
export type { PaginationProps } from './Pagination/types'

// 反馈组件
export { default as Modal } from './Modal/Modal.vue'
export type { ModalProps, ModalEmits } from './Modal/types'

// 数据展示
export { default as Timeline } from './Timeline/Timeline.vue'
export type { TimelineProps, TimelineItem as TimelineItemType } from './Timeline/types'

export { default as DatePicker } from './DatePicker/DatePicker.vue'
export type { DatePickerProps } from './DatePicker/types'

// 表单组件
export { default as Select } from './Select/Select.vue'
export type { SelectProps, SelectOption } from './Select/types'

export { default as Form } from './Form/Form.vue'
export type { FormProps, FormRule } from './Form/types'
