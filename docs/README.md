# 📚 Job-Ai Components 文档使用指南

## 文档说明

由于技术限制，VitePress 文档中的代码示例目前使用静态代码块展示。

## 如何查看交互演示

### 方式 1: 在线演示页面（推荐）

每个组件文档顶部都有**在线演示**链接：

```markdown
## 在线演示

👉 **[查看 Button 组件交互演示](../../demo.html)**
```

点击链接即可在浏览器中查看组件的实际运行效果。

### 方式 2: 开发模式

启动开发服务器查看完整交互界面：

```bash
cd /Users/wang/Documents/study/job-ai-components
pnpm dev
```

然后在浏览器中打开：http://localhost:3000

### 方式 3: 示例文件

直接在浏览器中打开示例文件：

```bash
open examples/demo.html
```

## 文档结构

```
docs/
├── guide/
│   ├── getting-started.md     # 快速开始
│   └── design-tokens.md       # 设计令牌
└── components/
    ├── Button.md              # 按钮组件
    ├── Input.md               # 输入框组件
    ├── Modal.md               # 对话框组件
    └── ...                    # 其他组件文档
```

## 每个组件文档包含

1. **在线演示链接** - 点击查看实时效果
2. **基础用法** - 最简单的使用示例
3. **进阶用法** - 复杂场景示例
4. **API 文档** - 完整的 Props、Events、Slots 说明
5. **使用场景** - 实际应用示例

## 查看文档

### 本地预览

```bash
# 在项目根目录
cd /Users/wang/Documents/study/job-ai-components

# 启动文档服务器
pnpm docs:dev

# 访问
# http://localhost:5173
```

### 构建文档

```bash
pnpm docs:build
```

## 组件列表

### 基础组件
- [Button 按钮](./components/Button.md)
- Input 输入框（待补充文档）
- Switch 开关（待补充文档）

### 表单组件
- [Select 选择器](./components/Input.md)
- DatePicker 日期选择（待补充文档）
- Form 表单（待补充文档）

### 反馈组件
- [Modal 对话框](./components/Modal.md)

### 导航组件
- Tabs 标签页（待补充文档）
- Pagination 分页（待补充文档）

### 数据展示
- Timeline 时间轴（待补充文档）

## 代码示例

所有代码示例都可以直接复制使用：

```vue
<script setup>
import { ref } from 'vue'
import { Button } from '@job-ai/components'

const count = ref(0)
</script>

<template>
  <Button @click="count++">
    点击次数: {{ count }}
  </Button>
</template>
```

## 自定义样式

组件使用 Tailwind CSS，可以轻松自定义：

```vue
<template>
  <!-- 添加自定义类名 -->
  <Button class="my-custom-button">
    自定义按钮
  </Button>
</template>

<style scoped>
.my-custom-button {
  /* 自定义样式 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

## 获取帮助

- 查看 [开发指南](../DEVELOPMENT.md)
- 查看 [项目总结](../PROJECT_SUMMARY.md)
- 查看 [测试报告](../TEST_RESULTS_SUMMARY.md)
