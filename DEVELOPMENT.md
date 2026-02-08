# 组件库开发指南

## 项目结构

```
job-ai-components/
├── src/
│   ├── components/       # 组件源码
│   │   ├── Button/
│   │   ├── Input/
│   │   └── ...
│   ├── design-system/    # 设计系统
│   ├── composables/      # 组合式函数
│   ├── styles/           # 全局样式
│   └── index.ts          # 主入口
├── docs/                 # 文档 (VitePress)
├── tests/                # 测试文件
├── examples/             # 示例
└── [配置文件]
```

## 开发流程

### 1. 创建新组件

```bash
# 在 src/components 下创建组件目录
mkdir src/components/YourComponent
```

### 2. 组件文件结构

每个组件应包含以下文件：

```
YourComponent/
├── YourComponent.vue    # 组件实现
├── types.ts             # 类型定义
├── index.ts             # 导出
└── YourComponent.test.ts # 测试
```

### 3. 组件开发规范

#### 类型定义 (types.ts)

```typescript
export interface YourComponentProps {
  // Props 定义
}

export interface YourComponentEmits {
  // Events 定义
}
```

#### 组件实现 (YourComponent.vue)

```vue
<script setup lang="ts">
import type { YourComponentProps, YourComponentEmits } from './types'

const props = withDefaults(defineProps<YourComponentProps>(), {
  // 默认值
})

const emit = defineEmits<YourComponentEmits>()
</script>

<template>
  <!-- 模板 -->
</template>
```

#### 导出 (index.ts)

```typescript
export { default as YourComponent } from './YourComponent.vue'
export type { YourComponentProps, YourComponentEmits } from './types'
```

### 4. 在主入口注册

在 `src/components/index.ts` 中添加：

```typescript
export { default as YourComponent } from './YourComponent'
export type { YourComponentProps } from './YourComponent/types'
```

### 5. 编写单元测试

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import YourComponent from './YourComponent.vue'

describe('YourComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(YourComponent)
    expect(wrapper.exists()).toBe(true)
  })
})
```

### 6. 编写文档

在 `docs/components/` 下创建 `YourComponent.md`：

```markdown
# YourComponent 组件名

## 基础用法

:::demo
\`\`\`vue
<YourComponent />
\`\`\`
:::

## API

### Props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
```

## 设计令牌使用

组件必须使用设计系统中的令牌：

```vue
<script setup>
import { colors, typography, spacing } from '@/design-system/tokens'
</script>

<template>
  <div :style="{ color: colors.primary }">
    <!-- 内容 -->
  </div>
</template>
```

## 样式规范

### 使用 Tailwind 类

优先使用 Tailwind 的工具类：

```vue
<template>
  <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition-colors">
    按钮
  </button>
</template>
```

### 自定义样式

对于无法用 Tailwind 实现的样式，使用 scoped style：

```vue
<style scoped>
.custom-class {
  /* 自定义样式 */
}
</style>
```

## 测试

### 运行所有测试

```bash
pnpm test
```

### 运行特定测试

```bash
pnpm test Button
```

### 测试覆盖率

```bash
pnpm test:coverage
```

## 构建

### 开发构建

```bash
pnpm dev
```

### 生产构建

```bash
pnpm build
```

构建产物在 `dist/` 目录。

## 文档

### 本地预览

```bash
pnpm docs:dev
```

### 构建文档

```bash
pnpm docs:build
```

## 发布

### 更新版本

```bash
pnpm version <major|minor|patch>
```

### 发布到 npm

```bash
pnpm publish
```

## 常见问题

### Q: 如何处理组件状态？

A: 使用 Vue 3 的 composition API：

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
</script>
```

### Q: 如何与 Headless UI 集成？

A: 参考 Select、Modal、Tabs 等组件的实现方式。

### Q: 如何添加表单验证？

A: 使用 Vuelidate，参考 Form 组件的实现。

## 代码审查清单

- [ ] 组件有完整的 TypeScript 类型
- [ ] 组件有单元测试
- [ ] 组件有文档
- [ ] 使用设计令牌
- [ ] 响应式设计
- [ ] 无障碍访问（a11y）
- [ ] 代码格式化（使用 Prettier）
