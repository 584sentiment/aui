/**
 * Pagination 组件类型定义
 */

export interface PaginationProps {
  currentPage?: number
  page?: number
  totalPages?: number
  total?: number
  pageSize?: number
  showSizeChanger?: boolean
  showTotal?: boolean
  simple?: boolean
  pageSizeOptions?: number[]
  disabled?: boolean
}

export interface PaginationEmits {
  'update:currentPage': [page: number]
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
  change: [page: number, pageSize?: number]
}
