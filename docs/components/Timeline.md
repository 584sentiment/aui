# Timeline 时间轴

时间轴组件,用于展示时间序列信息。

## 基础用法

:::demo 最基础的时间轴展示形式

timeline/basic

:::

## 不同方向

:::demo 支持垂直和水平两种方向

timeline/direction

:::

## 不同状态

:::demo 支持多种状态样式

timeline/status

:::

## 自定义图标

:::demo 自定义时间轴节点图标

timeline/icon

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 时间轴数据 | `TimelineItem[]` | - |
| direction | 排列方向 | `'vertical' \| 'horizontal'` | `'vertical'` |

### TimelineItem 类型

```typescript
type TimelineStatus = 'success' | 'info' | 'warning' | 'error'

interface TimelineItem {
  title: string           // 标题
  description?: string    // 描述
  timestamp?: string      // 时间戳
  status?: TimelineStatus // 状态
  icon?: string           // 图标（使用图标名称）
  id?: string | number    // 唯一标识
}
```
