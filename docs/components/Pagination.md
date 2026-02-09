# Pagination 分页

分页组件,用于数据分页。

## 基础用法

基础的分页展示。

:::demo pagination/basic
:::

## 事件监听

监听页码变化事件。

:::demo pagination/event
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| currentPage | 当前页码 | `number` | `1` |
| totalPages | 总页数 | `number` | - |
| pageSize | 每页条数 | `number` | `10` |
| showTotal | 显示总条数 | `boolean` | `false` |
| simple | 简洁模式 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:currentPage | 页码改变 | `page: number` |
| change | 页码改变 | `page: number` |
