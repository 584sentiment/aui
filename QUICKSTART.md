# 快速开始指南

## 📦 项目已创建成功！

Job-Ai 组件库已成功创建并构建。项目位于：

```
/Users/wang/Documents/study/job-ai-components
```

## ✅ 构建状态

**构建成功！** 产物在 `dist/` 目录：
- `dist/index.js` - 组件库代码 (35.95 kB | gzip: 8.89 kB)
- `dist/style.css` - 样式文件 (18.63 kB | gzip: 3.94 kB)
- `dist/index.d.ts` - TypeScript 类型定义

## 🚀 快速预览

### 方式 1: 查看示例

直接在浏览器中打开示例文件：

```bash
open examples/demo.html
```

或使用任意 HTTP 服务器：

```bash
cd examples
python3 -m http.server 8000
# 访问 http://localhost:8000/demo.html
```

### 方式 2: 查看文档

```bash
cd /Users/wang/Documents/study/job-ai-components
pnpm docs:dev
# 访问 http://localhost:5173
```

## 📝 可用组件

- **Button** - 按钮（5种样式、3种尺寸）
- **Input** - 输入框
- **Switch** - 开关
- **Modal** - 对话框
- **Select** - 选择器
- **Tabs** - 标签页
- **Pagination** - 分页
- **Timeline** - 时间轴
- **DatePicker** - 日期选择
- **Form** - 表单

## 🔧 开发命令

```bash
# 进入项目目录
cd /Users/wang/Documents/study/job-ai-components

# 安装依赖（已完成）
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test

# 文档预览
pnpm docs:dev

# 发布到 npm
pnpm publish
```

## 📦 如何在 job-ai/web 中使用

### 步骤 1: 配置 workspace

编辑 `/Users/wang/Documents/study/job-ai/pnpm-workspace.yaml`：

```yaml
packages:
  - 'web'
  - 'backend'
  - 'packages/*'
  - '../job-ai-components'  # 添加组件库路径
```

### 步骤 2: 安装依赖

```bash
cd /Users/wang/Documents/study/job-ai
pnpm install
```

### 步骤 3: 在 web 项目中使用

```bash
cd /Users/wang/Documents/study/job-ai/web
pnpm add ../job-ai-components
```

或者在 `web/package.json` 中添加：

```json
{
  "dependencies": {
    "full-aui": "file:../job-ai-components"
  }
}
```

### 步骤 4: 在代码中引入

```vue
<script setup>
import { Button, Input, Modal } from 'full-aui'
import 'full-aui/style.css'
</script>

<template>
  <Button variant="primary">点击我</Button>
  <Input v-model="value" placeholder="请输入" />
</template>
```

## 📚 文档

- **项目总结**: PROJECT_SUMMARY.md
- **开发指南**: DEVELOPMENT.md
- **API 文档**: docs/components/

## 🎨 设计令牌

所有组件使用统一的设计令牌：

- **主色**: #2563EB (蓝色)
- **辅助色**: #3B82F6
- **CTA**: #F97316 (橙色)
- **字体**: Open Sans (正文) + Poppins (标题)

## 🔄 下一步

### 如果要集成到 job-ai/web：

1. **修改 job-ai 项目的 workspace 配置**
2. **在 web 项目中添加依赖**
3. **替换 Naive UI 组件**
4. **删除 Naive UI 相关代码**

详细步骤请参考 PROJECT_SUMMARY.md 的"下一步计划"部分。

### 如果要继续开发组件库：

1. 查看 DEVELOPMENT.md 了解开发规范
2. 创建新组件时参考现有组件结构
3. 编写单元测试和文档

## 🐛 常见问题

### Q: 如何在本地测试组件库？

A: 使用 `examples/demo.html` 或运行 `pnpm docs:dev`。

### Q: 如何发布到 npm？

A:
```bash
pnpm build
pnpm publish
```

### Q: 如何添加新组件？

A: 参考 DEVELOPMENT.md 中的"创建新组件"章节。

## 📞 支持

如有问题，请查看：
- DEVELOPMENT.md - 开发指南
- docs/ - 组件文档
- examples/ - 使用示例

---

**项目路径**: `/Users/wang/Documents/study/job-ai-components`
**创建时间**: 2026-02-08
**状态**: ✅ 就绪
