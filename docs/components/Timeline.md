# Timeline 时间轴

时间轴组件,用于展示时间序列信息。

## 基础用法

最基础的时间轴展示形式。

:::demo 基础用法

timeline/basic

:::

## 不同方向

支持垂直和水平两种方向。

:::demo 不同方向

timeline/direction

:::

## 不同状态

展示不同状态的时间轴节点。

:::demo 不同状态

timeline/status

:::

## 自定义图标

可以通过 `icon` 属性自定义每个节点的图标。

:::demo 自定义图标

timeline/icon

:::

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
