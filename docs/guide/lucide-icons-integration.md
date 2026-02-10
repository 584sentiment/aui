# Lucide Icons 集成指南

## 概述

本文档说明如何在 `@job-ai/components` 组件库中集成和使用 Lucide Icons。

## 安装

\`\`\`bash
pnpm add lucide-vue-next
\`\`\`

## 集成方式

### 1. 直接导入（推荐用于组件内部）

在组件内部直接导入需要的图标：

\`\`\`vue
<script setup lang="ts">
import { Check, X, Search } from 'lucide-vue-next'
</script>

<template>
  <div>
    <Check @click="onConfirm" />
    <X @click="onCancel" />
    <Search />
  </div>
</template>
\`\`\`

**优点：**
- ✅ Tree-shaking 支持，最小化打包体积
- ✅ 类型安全
- ✅ 明确依赖关系

**缺点：**
- ❌ 每次使用都需要导入

### 2. 包装组件（用于消费者应用）

创建一个通用的 Icon 组件供应用使用：

\`\`\`vue
<!-- src/components/Icon/Icon.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import * as lucideIcons from 'lucide-vue-next'

interface Props {
  name: string
  size?: number
  color?: string
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2
})

const iconComponent = computed(() => {
  return (lucideIcons as any)[props.name]
})
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
  />
</template>
\`\`\`

**⚠️ 注意：** 这种方式会导入所有图标，不建议在生产环境中使用。

## 在现有组件中集成

### 示例：为 Select 组件添加下拉图标

\`\`\`vue
<!-- src/components/Select/Select.vue -->
<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
// ... 其他代码
</script>

<template>
  <div class="select-wrapper">
    <select v-model="selectedValue">
      <!-- 选项 -->
    </select>
    <ChevronDown class="select-icon" :size="16" />
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
}

.select-icon {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
\`\`\`

### 示例：为 Modal 组件添加关闭按钮

\`\`\`vue
<!-- src/components/Modal/Modal.vue -->
<script setup lang="ts">
import { X } from 'lucide-vue-next'
// ... 其他代码
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close" @click="close">
        <X :size="24" />
      </button>
      <!-- 其他内容 -->
    </div>
  </div>
</template>
\`\`\`

### 示例：为 DatePicker 添加日历图标

\`\`\`vue
<!-- src/components/DatePicker/DatePicker.vue -->
<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
// ... 其他代码
</script>

<template>
  <div class="date-picker">
    <input 
      type="text" 
      :value="formattedValue" 
      readonly
    />
    <Calendar class="calendar-icon" :size="20" />
  </div>
</template>
\`\`\`

## 设计令牌集成

创建一个 Icon composable 来集成设计令牌：

\`\`\`typescript
// src/composables/useIcon.ts
import { computed } from 'vue'
import { useDesignTokens } from './useDesignTokens'

export function useIcon(props: {
  size?: number | string
  color?: string
}) {
  const { spacing, colors } = useDesignTokens()

  const iconSize = computed(() => {
    if (typeof props.size === 'number') {
      return props.size
    }
    return spacing[props.size as string] || 24
  })

  const iconColor = computed(() => {
    return colors[props.color as string] || props.color || 'currentColor'
  })

  return {
    size: iconSize,
    color: iconColor
  }
}
\`\`\`

## 图标列表

### 常用图标速查

| 类别 | 图标 | 组件名 |
|------|------|--------|
| **导航** | 下箭头 | ChevronDown |
| | 上箭头 | ChevronUp |
| | 左箭头 | ChevronLeft |
| | 右箭头 | ChevronRight |
| | 菜单 | Menu |
| | 首页 | Home |
| **操作** | 编辑 | Edit |
| | 删除 | Trash |
| | 保存 | Save |
| | 搜索 | Search |
| | 添加 | Plus |
| | 减少 | Minus |
| **状态** | 成功 | CheckCircle |
| | 错误 | XCircle |
| | 警告 | AlertTriangle |
| | 信息 | Info |
| | 加载 | Loader2 |
| **媒体** | 播放 | Play |
| | 暂停 | Pause |
| | 停止 | Square |
| **用户** | 用户 | User |
| | 设置 | Settings |
| | 通知 | Bell |
| | 邮件 | Mail |

## 最佳实践

### 1. 使用语义化图标

\`\`\`vue
<!-- ✅ 好的做法 -->
<button>
  <Search aria-label="搜索" />
</button>

<!-- ❌ 不好的做法 -->
<button>
  <Search />
  <span>搜索</span>
</button>
\`\`\`

### 2. 保持图标大小一致

\`\`\`vue
<script setup>
import { ICON_SIZES } from './constants'
</script>

<template>
  <Search :size="ICON_SIZES.md" />
  <Settings :size="ICON_SIZES.md" />
</template>
\`\`\`

### 3. 使用 currentColor

\`\`\`vue
<template>
  <!-- 继承父元素文本颜色 -->
  <div class="text-primary">
    <Search color="currentColor" />
  </div>
</template>
\`\`\`

## 性能优化

### Tree-shaking

Lucide Icons 支持 tree-shaking，只打包使用的图标：

\`\`\`typescript
// ✅ 只打包 Check 图标
import { Check } from 'lucide-vue-next'

// ❌ 打包所有图标（不推荐）
import * as Icons from 'lucide-vue-next'
\`\`\`

### 按需加载

对于动态图标，使用动态导入：

\`\`\`vue
<script setup>
import { defineAsyncComponent } from 'vue'

const DynamicIcon = defineAsyncComponent(() =>
  import('lucide-vue-next').then(m => m[iconName])
)
</script>
\`\`\`

## 资源

- [Lucide Icons 官网](https://lucide.dev)
- [Vue 3 文档](https://lucide.dev/guide/packages/lucide-vue-next)
- [图标库](https://lucide.dev/icons/)
- [Figma 设计资源](https://www.figma.com/community/file/1156589226774843524)

## 迁移指南

### 从其他图标库迁移

**从 Heroicons 迁移：**

\`\`\`typescript
// Heroicons
import { SearchIcon } from '@heroicons/vue/24/outline'
<SearchIcon />

// Lucide Icons
import { Search } from 'lucide-vue-next'
<Search />
\`\`\`

**从 Phosphor Icons 迁移：**

\`\`\`typescript
// Phosphor
import { MagnifyingGlass } from '@phosphor-icons/vue'
<MagnifyingGlass :size="24" weight="regular" />

// Lucide Icons
import { Search } from 'lucide-vue-next'
<Search :size="24" :stroke-width="2" />
\`\`\`
