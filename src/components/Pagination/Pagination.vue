<template>
  <div v-if="!simple" class="pagination-wrapper flex items-center justify-between gap-4">
    <!-- 总数显示 -->
    <div v-if="showTotal && total" class="text-sm text-text-secondary">
      共 {{ total }} 条
    </div>

    <!-- 分页按钮 -->
    <div class="flex items-center gap-2">
      <button
        :disabled="currentPage <= 1 || disabled"
        @click="handlePageChange(currentPage - 1)"
        class="px-3 py-2 rounded-lg border border-border bg-surface hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="flex gap-1">
        <button
          v-for="p in displayPages"
          :key="p"
          @click="handlePageChange(p)"
          :class="[
            'min-w-[40px] px-3 py-2 rounded-lg transition-colors',
            p === currentPage
              ? 'bg-primary text-white'
              : 'border border-border bg-surface hover:bg-gray-50 text-text'
          ]"
          :disabled="disabled"
        >
          {{ p === -1 ? '...' : p }}
        </button>
      </div>

      <button
        :disabled="currentPage >= computedTotalPages || disabled"
        @click="handlePageChange(currentPage + 1)"
        class="px-3 py-2 rounded-lg border border-border bg-surface hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- 每页条数选择 -->
    <div v-if="showSizeChanger" class="flex items-center gap-2">
      <Select
        :model-value="pageSize"
        :options="pageSizeOptions.map(size => ({ label: `${size} 条/页`, value: size }))"
        @update:model-value="handleSizeChange"
        :disabled="disabled"
        size="sm"
      />
    </div>
  </div>

  <!-- 简洁模式 -->
  <div v-else class="pagination-wrapper-simple flex items-center justify-center gap-2">
    <button
      :disabled="currentPage <= 1 || disabled"
      @click="handlePageChange(currentPage - 1)"
      class="px-3 py-2 rounded-lg border border-border bg-surface hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      上一页
    </button>

    <div class="text-sm text-text-secondary">
      {{ currentPage }} / {{ computedTotalPages }}
    </div>

    <button
      :disabled="currentPage >= computedTotalPages || disabled"
      @click="handlePageChange(currentPage + 1)"
      class="px-3 py-2 rounded-lg border border-border bg-surface hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      下一页
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Select from '../Select/Select.vue'
import type { PaginationProps, PaginationEmits } from './types'

const props = withDefaults(defineProps<PaginationProps>(), {
  page: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: false,
  showTotal: false,
  simple: false,
  pageSizeOptions: () => [10, 20, 50, 100],
  disabled: false
})

const emit = defineEmits<PaginationEmits>()

// 支持 currentPage 和 page 两种 API
const currentPage = computed(() => props.currentPage || props.page || 1)

// 支持 totalPages 和 total 两种 API
const computedTotalPages = computed(() => {
  if (props.totalPages) {
    return props.totalPages
  }
  return props.total ? Math.ceil(props.total / props.pageSize) : 1
})

const displayPages = computed(() => {
  const pages: number[] = []
  const total = computedTotalPages.value
  const current = currentPage.value
  const delta = 2 // 当前页前后显示的页数

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== -1) {
      pages.push(-1) // 省略号
    }
  }

  return pages
})

const handlePageChange = (newPage: number) => {
  if (newPage < 1 || newPage > computedTotalPages.value || props.disabled) return

  // 同时触发两种事件格式
  emit('update:currentPage', newPage)
  emit('update:page', newPage)
  emit('change', newPage, props.pageSize)
}

const handleSizeChange = (pageSize: string | number) => {
  const size = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize
  emit('update:pageSize', size)
  emit('change', currentPage.value, size)
}
</script>
