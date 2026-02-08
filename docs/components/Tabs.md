# Tabs 标签页

标签页组件，用于内容分组。

## 实时演示

<demo vue="../demos/TabsDemo.vue" />

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Tabs } from '@job-ai/components'

const activeTab = ref('tab1')
const tabs = [
  { label: '标签页 1', value: 'tab1' },
  { label: '标签页 2', value: 'tab2' },
  { label: '标签页 3', value: 'tab3' }
]
</script>

<template>
  <Tabs v-model="activeTab" :items="tabs">
    <template #default>
      <div v-if="activeTab === 'tab1'" class="p-4">
        标签页 1 的内容
      </div>
      <div v-if="activeTab === 'tab2'" class="p-4">
        标签页 2 的内容
      </div>
      <div v-if="activeTab === 'tab3'" class="p-4">
        标签页 3 的内容
      </div>
    </template>
  </Tabs>
</template>
```

## 线条样式

```vue
<Tabs v-model="activeTab" :items="tabs" variant="line">
  <!-- 内容 -->
</Tabs>
```

## 卡片样式

```vue
<Tabs v-model="activeTab" :items="tabs" variant="card">
  <!-- 内容 -->
</Tabs>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 当前激活的标签 | `string` | - |
| items | 标签页数组 | `TabItem[]` | - |
| variant | 样式类型 | `'line' \| 'card'` | `'line'` |

### TabItem 类型

```typescript
interface TabItem {
  label: string          // 标签文本
  value: string          // 标签值
  disabled?: boolean     // 是否禁用
  icon?: string          // 图标 HTML
}
```

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 标签切换 | `value: string` |
| change | 标签改变 | `value: string` |
