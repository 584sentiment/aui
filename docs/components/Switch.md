# Switch 开关

开关选择器，用于切换开关状态。

## 实时演示

<demo vue="../demos/SwitchDemo.vue" />

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Switch } from '@job-ai/components'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled" label="启用通知" />
</template>
```

## 不同状态

```vue
<!-- 关闭状态 -->
<Switch v-model="value1" label="关闭" />

<!-- 开启状态 -->
<Switch v-model="value2" label="开启" />

<!-- 禁用状态 -->
<Switch v-model="value3" label="禁用" :disabled="true" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| label | 标签文本 | `string` | - |
| name | 表单名称 | `string` | - |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: boolean` |
| change | 状态改变 | `value: boolean` |
