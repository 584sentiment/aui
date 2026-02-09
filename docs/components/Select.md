# Select 选择器

下拉选择器,用于从选项中选择一个。

## 基础用法

基础的下拉选择器用法。

:::demo 基础的下拉选择器用法

select/basic

:::

## 带错误提示

显示错误提示的选择器。

:::demo 显示错误提示的选择器

select/error

:::

## 禁用选项

选项可以设置为禁用状态。

:::demo 选项可以设置为禁用状态

select/disabled

:::

## 多个选项

展示更多选项的选择器。

:::demo 展示更多选项的选择器

select/options

:::

## 选项分组

通过 label 前缀实现视觉分组效果。

:::demo 通过 label 前缀实现视觉分组效果

select/groups

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | - |
| options | 选项数组 | `SelectOption[]` | - |
| placeholder | 占位符 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误提示 | `string` | - |
| label | 标签文本 | `string` | - |
| name | 表单名称 | `string` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |

### SelectOption 类型

```typescript
interface SelectOption {
  label: string      // 显示文本
  value: string | number  // 选项值
  disabled?: boolean  // 是否禁用
}
```

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: string \| number` |
| change | 选择改变 | `value: string \| number` |
