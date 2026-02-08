---
layout: home

hero:
  name: "@job-ai/components"
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

\`\`\`bash
npm install @job-ai/components
\`\`\`

### 引入

\`\`\`\`vue
<script setup>
import { Button, Input, Modal } from '@job-ai/components'
</script>

<template>
  <Button variant="primary">点击我</Button>
</template>
\`\`\`\`
