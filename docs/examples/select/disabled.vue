<script setup>
import { ref } from 'vue'
import { Select } from 'full-aui'

const value = ref('')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二（禁用）', value: '2', disabled: true },
  { label: '选项三', value: '3' }
]
</script>

<template>
  <Select
    v-model="value"
    :options="options"
  />
</template>
