# Button 按钮

基础按钮组件，支持多种样式和尺寸。

## 基础用法

基础的按钮用法。

:::demo 不同样式的按钮

button/basic

:::

## 不同尺寸

Button 组件提供了三种尺寸：`sm`、`md`、`lg`。

:::demo 不同尺寸的按钮

button/size

:::

## 禁用状态

按钮可以设置为禁用状态。

:::demo 禁用的按钮

button/disabled

:::

## 加载状态

点击按钮后可以显示加载状态。

:::demo 加载中的按钮

button/loading

:::

## 块级按钮

`block` 属性将使按钮宽度变为父容器的 100%。

:::demo 块级按钮

button/block

:::

## 危险按钮

用于危险操作的按钮，如删除。

:::demo 危险按钮

button/variant

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| variant | 按钮样式 | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` |
| size | 按钮尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| block | 是否块级显示 | `boolean` | `false` |
| type | 原生按钮类型 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| href | 链接地址 | `string` | - |
| target | 链接打开方式 | `string` | - |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| click | 点击事件 | `event: MouseEvent` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 默认内容 |

## 效果预览

### 不同样式

- **主要按钮**: 蓝色背景，用于主要操作
- **次要按钮**: 浅蓝色背景，用于次要操作
- **轮廓按钮**: 透明背景带边框，用于较轻量的操作
- **幽灵按钮**: 无边框，用于极轻量的操作
- **危险按钮**: 红色背景，用于删除等危险操作

### 使用场景

```vue
<!-- 表单提交 -->
<Button type="submit" variant="primary" :loading="isSubmitting">
  提交
</Button>

<!-- 取消操作 -->
<Button variant="outline" @click="cancel">
  取消
</Button>

<!-- 删除操作 -->
<Button variant="danger" @click="deleteItem">
  删除
</Button>

<!-- 块级按钮（占满容器） -->
<Button block variant="primary">
  登录
</Button>
```
