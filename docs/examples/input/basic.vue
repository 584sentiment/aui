<script setup>
import { ref } from 'vue'
import { Input } from 'full-aui'

const username = ref('')
</script>

<template>
  <Input
    v-model="username"
    label="用户名"
    placeholder="请输入用户名"
  />
</template>
