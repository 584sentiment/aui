# Switch 开关

开关选择器，用于切换开关状态。

## 基础用法

:::demo 基础的开关用法

switch/basic

:::

## 不同状态

:::demo 开关的不同状态

switch/disabled

:::

## 尺寸

:::demo 不同尺寸的开关

switch/size

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| label | 标签文本 | `string` | - |
| name | 表单名称 | `string` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: boolean` |
| change | 状态改变 | `value: boolean` |
