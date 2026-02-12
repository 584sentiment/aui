<script setup>
import { ref } from 'vue'
import { Form, FormField, Input, Button } from 'full-aui'

const formData = ref({
  username: '',
  email: '',
  password: ''
})

const rules = {
  username: { type: 'required', message: '请输入用户名' },
  email: [
    { type: 'required', message: '请输入邮箱' },
    { type: 'pattern', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入有效的邮箱地址' }
  ],
  password: [
    { type: 'required', message: '请输入密码' },
    { type: 'minLength', min: 6, message: '密码至少6位' }
  ]
}

const handleSubmit = () => {
  console.log('表单提交:', formData.value)
}

const handleReset = () => {
  formData.value = {
    username: '',
    email: '',
    password: ''
  }
}
</script>

<template>
  <Form :model="formData" :rules="rules" @submit="handleSubmit" @reset="handleReset">
    <FormField label="用户名" name="username" required>
      <Input v-model="formData.username" placeholder="请输入用户名" />
    </FormField>

    <FormField label="邮箱" name="email" required>
      <Input v-model="formData.email" type="email" placeholder="请输入邮箱" />
    </FormField>

    <FormField label="密码" name="password" required>
      <Input v-model="formData.password" type="password" placeholder="请输入密码" />
    </FormField>

    <div class="form-actions">
      <Button type="submit" variant="primary">提交</Button>
      <Button type="button" variant="outline" @click="handleReset">重置</Button>
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
