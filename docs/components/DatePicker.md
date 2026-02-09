# DatePicker 日期选择器

日期选择组件,支持日期、时间等类型。

## 基础用法

:::demo
```vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@job-ai/components'

const birthday = ref('')
</script>

<template>
  <DatePicker
    v-model="birthday"
    label="生日"
    placeholder="请选择日期"
  />
</template>
```
:::

## 不同格式

:::demo
```vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@job-ai/components'

const date1 = ref('')
const date2 = ref('')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <DatePicker
      v-model="date1"
      label="YYYY/MM/DD 格式"
      format="YYYY/MM/DD"
      placeholder="请选择日期"
    />
    <DatePicker
      v-model="date2"
      label="YYYY-MM-DD 格式"
      format="YYYY-MM-DD"
      placeholder="请选择日期"
    />
  </div>
</template>
```
:::

## 快捷选项

:::demo
```vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@job-ai/components'

const date = ref('')
</script>

<template>
  <DatePicker
    v-model="date"
    label="带快捷选项"
    :show-shortcuts="true"
    placeholder="请选择日期"
  />
</template>
```
:::

## 禁用清除按钮

:::demo
```vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@job-ai/components'

const date = ref(new Date())
</script>

<template>
  <DatePicker
    v-model="date"
    label="无清除按钮"
    :show-clear-button="false"
    placeholder="请选择日期"
  />
</template>
```
:::

## 日期范围限制

:::demo
```vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@job-ai/components'

const date = ref('')
</script>

<template>
  <DatePicker
    v-model="date"
    label="限制范围(不能选择未来日期)"
    :max-date="new Date()"
    placeholder="请选择日期"
  />
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `Date \| string` | - |
| type | 选择器类型 | `'date' \| 'datetime' \| 'time' \| 'month' \| 'year'` | `'date'` |
| placeholder | 占位符 | `string` | `'请选择日期'` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误提示 | `string` | - |
| label | 标签文本 | `string` | - |
| format | 格式化 | `string` | `'YYYY-MM-DD'` |
| minDate | 最小日期 | `Date` | - |
| maxDate | 最大日期 | `Date` | - |
| disabledDates | 禁用日期 | `Date[]` | - |
| showShortcuts | 显示快捷选项 | `boolean` | `true` |
| showClearButton | 显示清除按钮 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: Date \| string` |
| change | 日期改变 | `value: Date \| string` |
