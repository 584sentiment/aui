# Tabs 标签页

标签页组件,用于内容分组。

## 基础用法

:::demo tabs/basic
:::

## 线条样式

:::demo tabs/line
:::

## 卡片样式

:::demo tabs/card
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 当前激活的标签 | `string` | - |
| items | 标签页数组 | `TabItem[]` | - |
| variant | 样式类型 | `'line' \| 'card'` | `'line'` |

### TabItem 类型

```typescript
interface TabItem {
  label: string          // 标签文本
  value: string          // 标签值
  disabled?: boolean     // 是否禁用
  icon?: string          // 图标 HTML
}
```

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 标签切换 | `value: string` |
| change | 标签改变 | `value: string` |
