# Select 选择器

下拉选择器，用于从选项中选择一个。

## 在线演示

👉 **[查看 Select 组件交互演示](http://localhost:5173/demo.html)**

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Select } from '@job-ai/components'

const city = ref('')
const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]
</script>

<template>
  <Select
    v-model="city"
    label="城市"
    placeholder="请选择城市"
    :options="options"
  />
</template>
```

## 带错误提示

```vue
<Select
  v-model="value"
  label="角色"
  :options="options"
  error="请选择一个角色"
/>
```

## 禁用选项

```vue
<Select
  v-model="value"
  :options="[
    { label: '选项一', value: '1' },
    { label: '选项二（禁用）', value: '2', disabled: true },
    { label: '选项三', value: '3' }
  ]"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | - |
| options | 选项数组 | `SelectOption[]` | - |
| placeholder | 占位符 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误提示 | `string` | - |
| label | 标签文本 | `string` | - |
| name | 表单名称 | `string` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |

### SelectOption 类型

```typescript
interface SelectOption {
  label: string      // 显示文本
  value: string | number  // 选项值
  disabled?: boolean  // 是否禁用
}
```

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: string \| number` |
| change | 选择改变 | `value: string \| number` |
