<script setup>
import { ref } from 'vue'
import { Form, FormField, Input, Button } from 'full-aui'

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
