<template>
  <div class="pagination-wrapper flex items-center justify-between gap-4">
    <!-- 总数显示 -->
    <div v-if="showTotal" class="text-sm text-text-secondary">
      共 {{ total }} 条
    </div>

    <!-- 分页按钮 -->
    <div class="flex items-center gap-2">
      <button
        :disabled="page <= 1 || disabled"
        @click="handlePageChange(page - 1)"
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
            p === page
              ? 'bg-primary text-white'
              : 'border border-border bg-surface hover:bg-gray-50 text-text'
          ]"
          :disabled="disabled"
        >
          {{ p }}
        </button>
      </div>

      <button
        :disabled="page >= totalPages || disabled"
        @click="handlePageChange(page + 1)"
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Select from '../Select/Select.vue'
import type { PaginationProps, PaginationEmits } from './types'

const props = withDefaults(defineProps<PaginationProps>(), {
  showSizeChanger: false,
  showTotal: false,
  pageSizeOptions: () => [10, 20, 50, 100],
  disabled: false
})

const emit = defineEmits<PaginationEmits>()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const displayPages = computed(() => {
  const pages: number[] = []
  const delta = 2 // 当前页前后显示的页数

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= props.page - delta && i <= props.page + delta)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== -1) {
      pages.push(-1) // 省略号
    }
  }

  return pages
})

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value || props.disabled) return
  emit('update:page', page)
  emit('change', page, props.pageSize)
}

const handleSizeChange = (pageSize: string | number) => {
  const size = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize
  emit('update:pageSize', size)
  emit('change', props.page, size)
}
</script>
