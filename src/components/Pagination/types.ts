/**
 * Pagination 组件类型定义
 */

export interface PaginationProps {
  page: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showTotal?: boolean
  pageSizeOptions?: number[]
  disabled?: boolean
}

export interface PaginationEmits {
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
  change: [page: number, pageSize: number]
}
