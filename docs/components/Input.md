# Input 输入框

基础输入框组件，支持多种类型和验证。

## 基础用法

:::demo 基础的输入框用法

input/basic

:::

## 不同类型

:::demo 支持多种原生输入框类型

input/types

:::

## 带验证

:::demo 通过 error 属性设置错误提示

input/validation

:::

## 禁用和只读

:::demo 禁用和只读状态

input/disabled

:::

## 尺寸

:::demo 三种尺寸：sm、md、lg

input/size

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | - |
| type | 输入框类型 | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'` | `'text'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| placeholder | 占位符 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| error | 错误提示 | `string` | - |
| label | 标签文本 | `string` | - |
| name | 表单名称 | `string` | - |
| autocomplete | 自动完成 | `string` | - |
| maxLength | 最大长度 | `number` | - |
| min | 最小值 | `number` | - |
| max | 最大值 | `number` | - |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: string \| number` |
| focus | 获得焦点 | `event: FocusEvent` |
| blur | 失去焦点 | `event: FocusEvent` |
| change | 值改变 | `event: Event` |
| keydown | 键盘事件 | `event: KeyboardEvent` |
