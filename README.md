# full-aui

Job-Ai 组件库 - 基于 Vue 3 和 Tailwind CSS 的现代化组件库。

## 特性

- 🎨 **设计统一** - 基于统一的设计令牌系统
- 💪 **TypeScript** - 完整的类型定义
- 🎯 **无头组件** - 基于 Headless UI，完全可定制
- 📦 **按需引入** - 支持按需引入，优化打包体积
- 🧪 **测试覆盖** - 完善的单元测试

## 文档

完整文档请访问：[docs](./docs)

## 安装

```bash
npm install full-aui
```

## 快速开始

```vue
<script setup>
import { Button, Input, Modal } from 'full-aui'
import 'full-aui/style.css'
</script>

<template>
  <Button variant="primary">点击我</Button>
</template>
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 文档预览
pnpm docs:dev
```

## 组件列表

### 基础组件
- Button - 按钮
- Input - 输入框
- Switch - 开关

### 表单组件
- Form - 表单
- Select - 选择器
- DatePicker - 日期选择器

### 反馈组件
- Modal - 对话框

### 导航组件
- Tabs - 标签页
- Pagination - 分页

### 数据展示
- Timeline - 时间轴

## License

MIT
