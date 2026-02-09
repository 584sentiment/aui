<script setup>
import { Timeline } from '@job-ai/components'

const items = [
  {
    id: 1,
    title: '项目启动',
    description: 'Job-Ai 组件库项目正式启动',
    timestamp: '2026-02-08 10:00',
    status: 'success'
  },
  {
    id: 2,
    title: '设计系统',
    description: '完成设计令牌和主题配置',
    timestamp: '2026-02-08 12:00',
    status: 'success'
  },
  {
    id: 3,
    title: '组件开发',
    description: '完成 10 个核心组件开发',
    timestamp: '2026-02-08 14:00',
    status: 'info'
  },
  {
    id: 4,
    title: '测试验证',
    description: '进行组件测试和验证',
    timestamp: '2026-02-08 16:00',
    status: 'warning'
  }
]
</script>

<template>
  <Timeline :items="items" />
</template>
