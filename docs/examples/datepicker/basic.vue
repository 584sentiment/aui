<script setup>
import { ref } from 'vue'
import { DatePicker } from '@job-ai/components'

const birthday = ref('')
</script>

<template>
  <DatePicker
    v-model="birthday"
    label="生日"
    placeholder="请选择日期"
  />
</template>
