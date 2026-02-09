# 组件示例

这个目录存放组件示例文件，用于在文档中展示组件的各种用法。

## 目录结构

每个子目录对应一个组件，包含该组件的示例文件：

```
examples/
├── button/          # Button 组件示例
├── input/           # Input 组件示例
├── select/          # Select 组件示例
├── modal/           # Modal 组件示例
├── switch/          # Switch 组件示例
├── pagination/      # Pagination 组件示例
├── form/            # Form 组件示例
├── tabs/            # Tabs 组件示例
├── datepicker/      # DatePicker 组件示例
└── timeline/        # Timeline 组件示例
```

## 示例文件命名规范

示例文件应使用清晰的命名，描述具体的使用场景：

- `basic.vue` - 基础用法
- `size.vue` - 尺寸变体
- `disabled.vue` - 禁用状态
- `loading.vue` - 加载状态
- `custom.vue` - 自定义配置
- 等等...

## 使用方式

在组件文档中引用示例：

```markdown
## 基础用法

:::demo
```vue
<script setup>
import { Button } from '@job-ai/components'
</script>

<template>
  <Button>点击我</Button>
</template>
```
:::
```

示例文件也可以作为独立的 Vue 文件导入到文档中。
