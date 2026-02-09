# DatePicker 日期选择器

日期选择组件,支持日期、时间等类型。

## 基础用法

:::demo 基础的日期选择器用法

datepicker/basic

:::

## 不同格式

:::demo 支持多种日期格式

datepicker/format

:::

## 快捷选项

:::demo 显示快捷选项面板

datepicker/shortcuts

:::

## 禁用清除按钮

:::demo 禁用清除按钮

datepicker/clearable

:::

## 日期范围限制

:::demo 限制可选择的日期范围

datepicker/range

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `Date \| string` | - |
| type | 选择器类型 | `'date' \| 'datetime' \| 'time' \| 'month' \| 'year'` | `'date'` |
| placeholder | 占位符 | `string` | `'请选择日期'` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误提示 | `string` | - |
| label | 标签文本 | `string` | - |
| format | 格式化 | `string` | `'YYYY-MM-DD'` |
| minDate | 最小日期 | `Date` | - |
| maxDate | 最大日期 | `Date` | - |
| disabledDates | 禁用日期 | `Date[]` | - |
| showShortcuts | 显示快捷选项 | `boolean` | `true` |
| showClearButton | 显示清除按钮 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: Date \| string` |
| change | 日期改变 | `value: Date \| string` |
