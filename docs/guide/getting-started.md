# 快速开始

## 安装

使用 npm、pnpm 或 yarn 安装组件库：

```bash
# npm
npm install full-aui

# pnpm
pnpm add full-aui

# yarn
yarn add full-aui
```

## 引入样式

在主入口文件中引入样式：

```javascript
import 'full-aui/style.css'
```

## 使用组件

### 按需引入（推荐）

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

### 全局注册

```javascript
import { createApp } from 'vue'
import JobAiComponents from 'full-aui'
import 'full-aui/style.css'

const app = createApp(App)
app.use(JobAiComponents)
```

## TypeScript 支持

组件库内置了完整的 TypeScript 类型定义，无需额外配置即可获得类型提示。

## 配置 Tailwind CSS

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

## 下一步

- 查看 [组件列表](/components/Button)
- 了解 [设计令牌](/guide/design-tokens)
