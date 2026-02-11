<template>
  <div class="form-demo">
    <h3>基础表单</h3>
    <div class="demo-section">
      <Form @submit="handleSubmit" :model="form" :rules="rules">
        <FormField label="用户名" name="username">
          <Input v-model="form.username" placeholder="请输入用户名" />
        </FormField>

        <FormField label="邮箱" name="email">
          <Input v-model="form.email" type="email" placeholder="请输入邮箱" />
        </FormField>

        <FormField label="密码" name="password">
          <Input v-model="form.password" type="password" placeholder="请输入密码" />
        </FormField>

        <div class="form-actions">
          <Button type="submit" variant="primary">提交</Button>
          <Button type="button" variant="outline" @click="handleReset">重置</Button>
        </div>
      </Form>
    </div>

    <h3>提交结果</h3>
    <div class="demo-section">
      <div v-if="submittedData" class="result-box">
        <h4>表单已提交：</h4>
        <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, FormField } from 'full-aui'
import { Input, Button } from 'full-aui'

const form = ref({
  username: '',
  email: '',
  password: ''
})

const submittedData = ref(null)

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
  console.log('表单提交:', form.value)
  submittedData.value = { ...form.value }
}

const handleReset = () => {
  form.value = {
    username: '',
    email: '',
    password: ''
  }
}
</script>

<style scoped>
.form-demo h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 500px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.result-box {
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.result-box h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.result-box pre {
  margin: 0;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  font-size: 0.875rem;
  overflow-x: auto;
}
</style>
