# Form 表单

表单容器组件，提供表单验证功能。

## 在线演示

👉 **[查看 Form 组件交互演示](http://localhost:5173/demo.html)**

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Form, FormField, Input, Button } from '@job-ai/components'

const formData = ref({
  username: '',
  email: ''
})

const handleSubmit = () => {
  console.log('表单提交:', formData.value)
}
</script>

<template>
  <Form :model="formData" @submit="handleSubmit">
    <FormField label="用户名" name="username">
      <Input v-model="formData.username" placeholder="请输入用户名" />
    </FormField>

    <FormField label="邮箱" name="email">
      <Input v-model="formData.email" type="email" placeholder="请输入邮箱" />
    </FormField>

    <Button type="submit" variant="primary">提交</Button>
  </Form>
</template>
```

## 表单验证

```vue
<script setup>
import { ref } from 'vue'
import { Form, FormField, Input, Button } from '@job-ai/components'

const rules = {
  username: {
    required: true,
    minLength: 3
  },
  email: {
    required: true,
    email: true
  }
}
</script>

<template>
  <Form :model="formData" :rules="rules">
    <FormField
      label="用户名"
      name="username"
      :rules="rules.username"
    >
      <Input v-model="formData.username" />
    </FormField>

    <FormField
      label="邮箱"
      name="email"
      :rules="rules.email"
    >
      <Input v-model="formData.email" type="email" />
    </FormField>

    <Button type="submit">提交</Button>
  </Form>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据 | `Record<string, any>` | - |
| rules | 验证规则 | `FormRules` | - |
| labelWidth | 标签宽度 | `string` | `'120px'` |
| labelPosition | 标签位置 | `'left' \| 'top' \| 'right'` | `'top'` |
| disabled | 是否禁用整个表单 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| submit | 表单提交 | `model: Record<string, any>` |
| reset | 表单重置 | - |

### FormRules 类型

```typescript
type FormRuleType = 'required' | 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern'

interface FormRule {
  type?: FormRuleType
  required?: boolean
  message?: string
  validator?: (value: any) => boolean | string
  min?: number
  max?: number
  pattern?: RegExp
}

type FormRules = Record<string, FormRule | FormRule[]>
```
