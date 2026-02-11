<script setup>
import { Timeline } from 'full-aui'

const items = [
  {
    id: 1,
    title: '成功状态',
    description: '操作成功完成',
    timestamp: '2026-02-08 10:00',
    status: 'success'
  },
  {
    id: 2,
    title: '信息状态',
    description: '一般信息提示',
    timestamp: '2026-02-08 11:00',
    status: 'info'
  },
  {
    id: 3,
    title: '警告状态',
    description: '需要注意的警告',
    timestamp: '2026-02-08 12:00',
    status: 'warning'
  },
  {
    id: 4,
    title: '危险状态',
    description: '错误或危险操作',
    timestamp: '2026-02-08 13:00',
    status: 'danger'
  }
]
</script>

<template>
  <Timeline :items="items" />
</template>
