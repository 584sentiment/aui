# Button 按钮

基础按钮组件，支持多种样式和尺寸。

## 在线演示

👉 **[查看 Button 组件交互演示](http://localhost:5173/demo.html)**

## 基础用法

```vue
<script setup>
import { Button } from '@job-ai/components'
</script>

<template>
  <Button variant="primary">主要按钮</Button>
  <Button variant="secondary">次要按钮</Button>
  <Button variant="outline">轮廓按钮</Button>
  <Button variant="ghost">幽灵按钮</Button>
</template>
```

## 不同尺寸

```vue
<Button size="sm" variant="primary">小按钮</Button>
<Button size="md" variant="primary">中按钮</Button>
<Button size="lg" variant="primary">大按钮</Button>
```

## 禁用状态

```vue
<Button disabled>禁用按钮</Button>
```

## 加载状态

```vue
<Button loading>加载中...</Button>
```

## 块级按钮

```vue
<Button block>块级按钮</Button>
```

## 危险按钮

```vue
<Button variant="danger">删除</Button>
```

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
