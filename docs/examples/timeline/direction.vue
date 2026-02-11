<script setup>
import { Timeline } from 'full-aui'

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
  }
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h4 class="mb-4 text-sm font-medium text-gray-900">垂直时间轴</h4>
      <Timeline :items="items" direction="vertical" />
    </div>

    <div>
      <h4 class="mb-4 text-sm font-medium text-gray-900">水平时间轴</h4>
      <Timeline :items="items" direction="horizontal" />
    </div>
  </div>
</template>
