<script setup>
import { ref } from 'vue'
import { Form, FormField, Input, Button } from '@job-ai/components'

const formData = ref({
  username: '',
  email: ''
})

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

const handleSubmit = () => {
  console.log('表单提交:', formData.value)
}
</script>

<template>
  <Form :model="formData" :rules="rules" @submit="handleSubmit">
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
