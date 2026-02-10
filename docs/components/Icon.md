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

在组件中导入图标：

\`\`\`typescript
import { Search, Settings, User, Bell } from 'lucide-vue-next'
\`\`\`

在模板中使用：

\`\`\`vue
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
| strokeWidth | number | 2 | 描边宽度 |
| absoluteStrokeWidth | boolean | false | 绝对描边宽度 |

## 常用图标

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
- `Search` - 搜索
- `Plus` - 添加
- `Minus` - 减少

### 状态图标
- `CheckCircle` - 成功
- `XCircle` - 错误
- `AlertTriangle` - 警告
- `Info` - 信息

## 更多资源

访问 [Lucide Icons 官网](https://lucide.dev/icons) 浏览所有可用图标。
