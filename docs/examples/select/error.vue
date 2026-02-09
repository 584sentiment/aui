<script setup>
import { ref } from 'vue'
import { Select } from '@job-ai/components'

const value = ref('')
const options = [
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '访客', value: 'guest' }
]
</script>

<template>
  <Select
    v-model="value"
    label="角色"
    :options="options"
    error="请选择一个角色"
  />
</template>
