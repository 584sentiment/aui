# Modal 对话框

模态对话框组件，用于需要用户处理的重要事务。

## 基础用法

:::demo 基础的模态框用法

modal/basic

:::

## 自定义内容

:::demo 自定义模态框内容

modal/custom

:::

## 不同尺寸

:::demo 不同尺寸的模态框

modal/sizes

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` | `false` |
| title | 标题 | `string` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` |
| closeOnOverlay | 点击遮罩关闭 | `boolean` | `true` |
| closeOnEscape | ESC 键关闭 | `boolean` | `true` |
| showClose | 显示关闭按钮 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: boolean` |
| confirm | 点击确认 | - |
| cancel | 点击取消 | - |
