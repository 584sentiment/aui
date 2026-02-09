<script setup>
import { ref } from 'vue'
import { DatePicker } from '@job-ai/components'

const date = ref('')
</script>

<template>
  <DatePicker
    v-model="date"
    label="限制范围（不能选择未来日期）"
    :max-date="new Date()"
    placeholder="请选择日期"
  />
</template>
