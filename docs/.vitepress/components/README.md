# VitePress 自定义组件

本目录包含 VitePress 文档站点的自定义组件。

## DemoContainer

DemoContainer 是一个用于展示代码示例的自定义容器组件，提供了以下功能：

### 功能特性

- **Demo 预览区域**: 展示组件的实际运行效果
- **描述文字支持**: 可在 Demo 上方显示描述信息
- **代码复制**: 一键复制源代码到剪贴板
- **源代码查看/隐藏**: 可切换显示或隐藏源代码
- **语法高亮**: 使用 VitePress 内置的代码高亮
- **响应式设计**: 适配移动端和桌面端
- **深色模式支持**: 自动适配 VitePress 主题

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| source | 渲染后的代码 HTML | `string` | - |
| path | 示例文件路径 | `string` | - |
| rawSource | 原始源代码（URL 编码）| `string` | - |
| description | 描述文字（URL 编码）| `string` | `''` |

### 使用示例

```vue
<template>
  <DemoContainer
    source="<div class='highlight'>...</div>"
    path="/examples/button/basic.vue"
    :raw-source="encodeURIComponent(sourceCode)"
    description="这是一个基础按钮示例"
  >
    <Button>点击我</Button>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from './DemoContainer.vue'

const sourceCode = ref(`
<template>
  <Button>点击我</Button>
</template>
`)
</script>
```

### 与 vitepress-demo-plugin 集成

该组件设计用于与 `vitepress-demo-plugin` 配合使用，但也可以独立使用。

当与 vitepress-demo-plugin 一起使用时，插件会自动处理：
- 代码文件读取
- URL 编码
- 语法高亮
- 文件路径解析

### 样式定制

组件使用 VitePress 的 CSS 变量来适配主题：

- `var(--vp-c-bg)`: 背景色
- `var(--vp-c-bg-soft)`: 柔和背景色
- `var(--vp-c-border)`: 边框色
- `var(--vp-c-divider)`: 分割线颜色
- `var(--vp-c-text-1)`: 主要文本颜色
- `var(--vp-c-brand-1)`: 品牌色
- `var(--vp-c-success-1)`: 成功状态颜色
- `var(--vp-c-success-soft)`: 成功状态背景色

### 浏览器兼容性

- 需要支持 Clipboard API（复制功能）
- 需要支持 CSS 变量
- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+, Edge 90+）

### 注意事项

1. `rawSource` 和 `description` 参数需要使用 `encodeURIComponent()` 进行 URL 编码
2. 组件会自动处理解码，无需在模板中手动解码
3. 代码复制功能需要用户授权剪贴板访问权限
