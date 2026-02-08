# Timeline 时间轴

时间轴组件，用于展示时间序列信息。

## 在线演示

👉 **[查看 Timeline 组件交互演示](http://localhost:5173/demo.html)**

## 基础用法

```vue
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
```

## 不同方向

```vue
<!-- 垂直时间轴 -->
<Timeline :items="items" direction="vertical" />

<!-- 水平时间轴 -->
<Timeline :items="items" direction="horizontal" />
```

## 不同状态

```vue
const items = [
  { title: '成功', status: 'success' },
  { title: '信息', status: 'info' },
  { title: '警告', status: 'warning' },
  { title: '危险', status: 'danger' }
]
```

## 自定义图标

```vue
const items = [
  {
    title: '带有图标',
    status: 'success',
    icon: '<svg>...</svg>' // HTML 字符串
  }
]
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 时间轴数据 | `TimelineItem[]` | - |
| direction | 方向 | `'vertical' \| 'horizontal'` | `'vertical'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |

### TimelineItem 类型

```typescript
interface TimelineItem {
  id: string | number          // 唯一标识
  title: string               // 标题
  description?: string         // 描述文本
  timestamp?: string           // 时间戳
  status?: 'success' | 'warning' | 'danger' | 'info'  // 状态
  icon?: string               // 图标 HTML
}
```
