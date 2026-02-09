# Pagination 分页

分页组件,用于数据分页。

## 基础用法

:::demo 基础的分页展示

pagination/basic

:::

## 事件监听

:::demo 监听页码变化事件

pagination/event

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 当前页码 | `number` | `1` |
| total | 总条数 | `number` | - |
| pageSize | 每页条数 | `number` | `10` |
| pageSizes | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showSizeChanger | 显示每页条数选择器 | `boolean` | `false` |
| showTotal | 显示总条数 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 页码改变 | `page: number` |
| update:pageSize | 每页条数改变 | `pageSize: number` |
