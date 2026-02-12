<script setup>
import { ref } from 'vue'
import { Form, FormField, Input, Button } from 'full-aui'

const formData = ref({
  username: '',
  age: '',
  email: '',
  password: ''
})

const rules = {
  username: [
    { type: 'required', message: '请输入用户名' },
    { type: 'minLength', min: 3, message: '用户名至少3个字符' },
    { type: 'maxLength', max: 15, message: '用户名最多15个字符' }
  ],
  age: [
    { type: 'required', message: '请输入年龄' },
    { type: 'min', min: 18, message: '年龄必须大于18岁' },
    { type: 'max', max: 100, message: '年龄必须小于100岁' }
  ],
  email: [
    { type: 'required', message: '请输入邮箱' },
    { type: 'pattern', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入有效的邮箱地址' }
  ],
  password: [
    { type: 'required', message: '请输入密码' },
    { type: 'minLength', min: 8, message: '密码至少8位' },
    {
      type: 'pattern',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
      message: '密码必须包含大小写字母和数字'
    }
  ]
}

const handleSubmit = () => {
  console.log('表单验证通过，数据:', formData.value)
  alert('表单验证通过！')
}
</script>

<template>
  <Form :model="formData" :rules="rules" @submit="handleSubmit">
    <FormField label="用户名" name="username" required>
      <Input v-model="formData.username" placeholder="3-15个字符" />
    </FormField>

    <FormField label="年龄" name="age" required>
      <Input v-model="formData.age" type="number" placeholder="18-100岁" />
    </FormField>

    <FormField label="邮箱" name="email" required>
      <Input v-model="formData.email" type="email" placeholder="example@domain.com" />
    </FormField>

    <FormField label="密码" name="password" required>
      <Input v-model="formData.password" type="password" placeholder="至少8位，包含大小写字母和数字" />
    </FormField>

    <div class="form-actions">
      <Button type="submit" variant="primary">提交验证</Button>
    </div>
  </Form>
</template>

<style scoped>
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
