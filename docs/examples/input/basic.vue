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
