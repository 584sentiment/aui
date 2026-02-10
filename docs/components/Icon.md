# Icon 图标

基于 [Lucide Icons](https://lucide.dev) 的美观、一致的图标工具包。

## 特点

- ✅ **1000+ 图标** - 丰富的图标集合
- ✅ **Tree-shakable** - 只打包使用的图标
- ✅ **Vue 3 原生** - 完整的 TypeScript 支持
- ✅ **高度可定制** - 颜色、大小、描边宽度
- ✅ **MIT 许可** - 免费使用

## 安装

\`\`\`bash
pnpm add lucide-vue-next
\`\`\`

## 基础用法

:::demo 基础图标用法

icon/basic

:::

## 直接导入图标

\`\`\`vue
<script setup lang="ts">
import { Search, Settings, User } from 'lucide-vue-next'
</script>

<template>
  <div class="flex gap-4">
    <Search />
    <Settings :size="32" color="#3b82f6" />
    <User :stroke-width="3" />
  </div>
</template>
\`\`\`

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | number | 24 | 图标大小（像素） |
| color | string | currentColor | 图标颜色 |
| stroke-width | number | 2 | 描边宽度 |
| absoluteStrokeWidth | boolean | false | 绝对描边宽度 |
| default-class | string | lucide-icon | 默认 CSS 类 |

## 常用图标

### 基础图标
- `Check` - 勾选
- `X` - 关闭/取消
- `Search` - 搜索
- `Settings` - 设置
- `User` - 用户
- `Bell` - 通知

### 导航图标
- `ChevronDown` - 下箭头
- `ChevronUp` - 上箭头
- `ChevronLeft` - 左箭头
- `ChevronRight` - 右箭头
- `Menu` - 菜单
- `Home` - 首页

### 操作图标
- `Edit` - 编辑
- `Trash` - 删除
- `Download` - 下载
- `Upload` - 上传
- `Plus` - 添加
- `Minus` - 减少

### 状态图标
- `Info` - 信息
- `AlertTriangle` - 警告
- `CheckCircle` - 成功
- `XCircle` - 错误
- `HelpCircle` - 帮助

## 自定义样式

### 颜色定制

\`\`\`vue
<template>
  <!-- 使用颜色名称 -->
  <Search color="red" />
  
  <!-- 使用十六进制 -->
  <Search color="#3b82f6" />
  
  <!-- 使用 Tailwind 类 -->
  <Search class="text-primary" />
  
  <!-- 使用 currentColor 继承文本颜色 -->
  <Search color="currentColor" />
</template>
\`\`\`

### 大小定制

\`\`\`vue
<template>
  <Search :size="16" />
  <Search :size="24" />
  <Search :size="32" />
  <Search :size="48" />
</template>
\`\`\`

### 描边宽度

\`\`\`vue
<template>
  <Search :stroke-width="1" />
  <Search :stroke-width="2" /> <!-- 默认 -->
  <Search :stroke-width="3" />
</template>
\`\`\`

## 动态图标

\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Moon, Sun, Star } from 'lucide-vue-next'

const isDark = ref(false)
const rating = ref(0)

const Icon = computed(() => isDark.value ? Sun : Moon)
</script>

<template>
  <button @click="isDark = !isDark">
    <component :is="Icon" />
  </button>

  <div class="flex gap-1">
    <Star 
      v-for="i in 5" 
      :key="i"
      :fill="i <= rating ? 'currentColor' : 'none'"
      @click="rating = i"
    />
  </div>
</template>
\`\`\`

## 查找更多图标

访问 [Lucide Icons 官网](https://lucide.dev/icons/) 浏览所有可用图标。

## 可访问性

默认情况下，图标使用 `aria-hidden="true"` 隐藏。如需添加说明：

\`\`\`vue
<template>
  <button>
    <Search aria-label="搜索" />
  </button>
</template>
\`\`\`

## 设计令牌集成

\`\`\`vue
<script setup lang="ts">
import { useDesignTokens } from '@job-ai/components'
import { Settings } from 'lucide-vue-next'

const { colors, spacing } = useDesignTokens()
</script>

<template>
  <Settings 
    :color="colors.primary"
    :size="spacing.lg"
  />
</template>
\`\`\`
