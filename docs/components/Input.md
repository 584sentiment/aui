# Input 输入框

基础输入框组件，支持多种类型和验证。

## 在线演示

👉 **[查看 Input 组件交互演示](http://localhost:5173/demo.html)**

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@job-ai/components'

const username = ref('')
</script>

<template>
  <Input
    v-model="username"
    label="用户名"
    placeholder="请输入用户名"
  />
</template>
```

## 不同类型

```vue
<!-- 文本输入 -->
<Input type="text" v-model="value" label="文本" />

<!-- 邮箱输入 -->
<Input type="email" v-model="email" label="邮箱" placeholder="example@email.com" />

<!-- 密码输入 -->
<Input type="password" v-model="password" label="密码" />

<!-- 数字输入 -->
<Input type="number" v-model="age" label="年龄" :min="0" :max="120" />
```

## 带验证

```vue
<script setup>
import { ref } from 'vue'
import { Input } from '@job-ai/components'

const email = ref('')
const emailError = ref('')

const validateEmail = () => {
  if (!email.value) {
    emailError.value = '请输入邮箱'
  } else if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = '请输入有效的邮箱'
  } else {
    emailError.value = ''
  }
}
</script>

<template>
  <Input
    v-model="email"
    type="email"
    label="邮箱"
    placeholder="请输入邮箱"
    :error="emailError"
    @blur="validateEmail"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | - |
| type | 输入框类型 | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'` | `'text'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| placeholder | 占位符 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| error | 错误提示 | `string` | - |
| label | 标签文本 | `string` | - |
| name | 表单名称 | `string` | - |
| autocomplete | 自动完成 | `string` | - |
| maxLength | 最大长度 | `number` | - |
| min | 最小值 | `number` | - |
| max | 最大值 | `number` | - |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `value: string \| number` |
| focus | 获得焦点 | `event: FocusEvent` |
| blur | 失去焦点 | `event: FocusEvent` |
| change | 值改变 | `event: Event` |
| keydown | 键盘事件 | `event: KeyboardEvent` |
