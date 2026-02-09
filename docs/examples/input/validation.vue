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
