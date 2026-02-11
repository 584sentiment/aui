---
layout: home

hero:
  name: "full-aui"
  text: "Job-Ai 组件库"
  tagline: "基于 Vue 3 和 Tailwind CSS 的现代化组件库"
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看组件
      link: /components/Button

features:
  - title: 🎨 设计统一
    details: 基于统一的设计令牌，确保所有组件风格一致
  - title: 💪 TypeScript
    details: 完整的 TypeScript 类型定义，提供更好的开发体验
  - title: 🎯 无头组件
    details: 基于 Headless UI 构建，完全可定制样式
  - title: 📦 按需引入
    details: 支持按需引入，优化打包体积
  - title: 🔧 易于使用
    details: 简洁的 API 设计，快速上手
  - title: 🧪 测试覆盖
    details: 完善的单元测试，保证代码质量
---

## 使用方式

### 安装

```bash
# npm
npm install full-aui

# pnpm
pnpm add full-aui

# yarn
yarn add full-aui
```

### 引入样式

在主入口文件中引入样式：

```javascript
import 'full-aui/style.css'
```

### 使用组件

#### 按需引入（推荐）

```vue
<script setup>
import { Button, Input, Modal } from 'full-aui'
</script>

<template>
  <Button variant="primary">点击我</Button>
  <Input v-model="value" placeholder="请输入内容" />
  <Modal v-model="open" title="标题">内容</Modal>
</template>
```

#### 全局注册

```javascript
import { createApp } from 'vue'
import JobAiComponents from 'full-aui'
import 'full-aui/style.css'

const app = createApp(App)
app.use(JobAiComponents)
```

### 配置 Tailwind CSS

如果您的项目已经使用 Tailwind CSS，需要在配置中包含组件库的样式路径：

```javascript
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{vue,js,ts}",
    "./node_modules/full-aui/**/*.{vue,js,ts}"
  ]
}
```
