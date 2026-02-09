# Tabs 标签页

标签页组件,用于内容分组。

## 基础用法

:::demo 基础的标签页用法

tabs/basic

:::

## 线条样式

:::demo 线条样式的标签页

tabs/line

:::

## 卡片样式

:::demo 卡片样式的标签页

tabs/card

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | - |
| type | 标签页类型 | `'line' \| 'card'` | `'line'` |
| tabs | 标签页选项 | `Tab[]` | - |

### Tab 类型

```typescript
interface Tab {
  label: string      // 标签文本
  value: string | number  // 标签值
  disabled?: boolean  // 是否禁用
}
```

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: string \| number` |
