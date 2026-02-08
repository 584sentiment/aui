# Pagination 分页

分页组件，用于数据分页。

## 在线演示

👉 **[查看 Pagination 组件交互演示](http://localhost:5173/demo.html)**

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Pagination } from '@job-ai/components'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handlePageChange = (page, size) => {
  console.log('页码改变:', page, '每页条数:', size)
}
</script>

<template>
  <Pagination
    v-model:page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    @change="handlePageChange"
  />
</template>
```

## 显示总数

```vue
<Pagination
  v-model:page="page"
  v-model:page-size="pageSize"
  :total="100"
  :show-total="true"
/>
```

## 每页条数选择器

```vue
<Pagination
  v-model:page="page"
  v-model:page-size="pageSize"
  :total="100"
  :show-size-changer="true"
  :page-size-options="[10, 20, 50, 100]"
/>
```

## 完整功能

```vue
<Pagination
  v-model:page="page"
  v-model:page-size="pageSize"
  :total="100"
  :show-total="true"
  :show-size-changer="true"
  :page-size-options="[10, 20, 50, 100]"
  @change="handleChange"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| page | 当前页码 | `number` | `1` |
| pageSize | 每页条数 | `number` | `10` |
| total | 总条数 | `number` | - |
| showSizeChanger | 显示每页条数选择器 | `boolean` | `false` |
| showTotal | 显示总条数 | `boolean` | `false` |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:page | 页码改变 | `page: number` |
| update:pageSize | 每页条数改变 | `pageSize: number` |
| change | 页码或每页条数改变 | `page: number, pageSize: number` |
