# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

`@job-ai/components` 是一个基于 Vue 3 + TypeScript + Tailwind CSS 的组件库，使用 Headless UI 提供无障碍访问支持，Vuelidate 处理表单验证。

## 开发命令

```bash
# 开发模式（启动 Vite 开发服务器）
pnpm dev

# 生产构建
pnpm build

# 单元测试（Vitest）
pnpm test
pnpm test <ComponentName>  # 运行特定组件的测试

# E2E 测试（Playwright）
pnpm test:e2e
pnpm test:e2e:ui          # UI 模式
pnpm test:e2e:debug       # 调试模式
pnpm test:e2e:report      # 查看报告

# 文档开发（VitePress）
pnpm docs:dev

# 文档构建
pnpm docs:build
```

## 架构结构

### 入口文件
- `src/index.ts` - 主入口，导出所有组件、设计令牌、composables 和样式
- `src/components/index.ts` - 组件统一导出，按类别组织（基础/表单/导航/反馈/数据展示）

### 组件结构
每个组件遵循标准结构：
```
src/components/ComponentName/
├── ComponentName.vue    # 组件实现（<script setup lang="ts">）
├── types.ts             # TypeScript 类型定义（Props/Emits 接口）
└── index.ts             # 导出组件和类型
```

### 设计系统
- `src/design-system/tokens.ts` - 设计令牌（颜色、字体、间距等）
- `src/design-system/themes.ts` - 主题配置
- `src/styles/main.css` - 全局样式

### Composables
可复用逻辑位于 `src/composables/`：
- `useFormField.ts` - 表单字段状态管理
- `useModal.ts` - 模态框状态管理
- `useKeyboard.ts` - 键盘交互处理

### 依赖关系
- **peerDependencies**: `vue@^3.4.0`
- **外部依赖**（不打包）: `vue`, `@headlessui/vue`, `@vuelidate/core`, `@vuelidate/validators`

## 组件开发规范

### 1. 组件模板
```vue
<script setup lang="ts">
import type { ComponentNameProps, ComponentNameEmits } from './types'

const props = withDefaults(defineProps<ComponentNameProps>(), {
  // 默认值
})

const emit = defineEmits<ComponentNameEmits>()
</script>

<template>
  <!-- 模板 -->
</template>
```

### 2. 类型定义
```typescript
// types.ts
export interface ComponentNameProps {
  // 属性定义
}

export interface ComponentNameEmits {
  // 事件定义 (e: 'eventName', payload: type)
}
```

### 3. 在主入口注册
编辑 `src/components/index.ts`：
```typescript
export { default as ComponentName } from './ComponentName/ComponentName.vue'
export type { ComponentNameProps } from './ComponentName/types'
```

### 4. 样式规范
- 优先使用 Tailwind 工具类
- 使用设计令牌而非硬编码值
- 仅在必要时使用 `<style scoped>`

## 文档规范

文档使用 VitePress + vitepress-demo-plugin。

### Demo 组件
创建 `docs/demos/ComponentDemo.vue` 文件，在文档中使用：

```markdown
## 基础用法

:::demo
```vue
<script setup>
import { ComponentName } from '@job-ai/components'
</script>

<template>
  <ComponentName />
</template>
```
:::
```

### 文档位置
- 组件文档: `docs/components/ComponentName.md`
- Demo 文件: `docs/demos/ComponentNameDemo.vue`

## Headless UI 集成

部分组件基于 Headless UI 构建，参考以下组件：
- `Modal` - 使用 `<Dialog>`
- `Tabs` - 使用 `<TabGroup>`
- `Select` - 使用 `<Listbox>`

## 表单验证

使用 Vuelidate 实现表单验证，参考 `Form` 组件：
- 使用 `useVuelidate` 组合式函数
- 在 `types.ts` 中定义 `FormRule` 接口
- 通过 `rules` prop 传递验证规则

## 测试规范

### 单元测试（Vitest）
- 测试文件: `ComponentName.test.ts`（与组件同目录）
- 使用 `@vue/test-utils` 的 `mount()`
- 配置文件: `vitest.config.ts`

### E2E 测试（Playwright）
- 测试目录: `tests/e2e/`
- 配置文件: `playwright.config.ts`
- base URL: `http://localhost:3000`
- 运行前需先启动 `pnpm dev`

## 构建配置

- **构建工具**: Vite
- **入口**: `src/index.ts`
- **输出格式**: ES Module (`es`)
- **输出目录**: `dist/`
- **TypeScript 声明**: 使用 `vue-tsc --emitDeclarationOnly` 生成
- **外部依赖**: 不打包 vue、headlessui、vuelidate
