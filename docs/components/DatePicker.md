# DatePicker 日期选择器

日期选择组件，支持日期、时间等类型。

## 实时演示

<demo vue="../demos/DatePickerDemo.vue" />

## 基础用法

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
    type="date"
    placeholder="请选择日期"
  />
</template>
```

## 不同类型

```vue
<!-- 日期选择 -->
<DatePicker v-model="date" type="date" label="日期" />

<!-- 日期时间选择 -->
<DatePicker v-model="datetime" type="datetime" label="日期时间" />

<!-- 时间选择 -->
<DatePicker v-model="time" type="time" label="时间" />

<!-- 月份选择 -->
<DatePicker v-model="month" type="month" label="月份" />

<!-- 年份选择 -->
<DatePicker v-model="year" type="year" label="年份" />
```

## 限制范围

```vue
<DatePicker
  v-model="date"
  label="选择日期"
  :min-date="new Date()"
  :max-date="new Date('2026-12-31')"
/>
```

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

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: Date \| string` |
| change | 日期改变 | `value: Date \| string` |
