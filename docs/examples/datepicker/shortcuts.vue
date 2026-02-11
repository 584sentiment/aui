<script setup>
import { ref } from 'vue'
import { DatePicker } from 'full-aui'

const date = ref('')
</script>

<template>
  <DatePicker
    v-model="date"
    label="带快捷选项"
    :show-shortcuts="true"
    placeholder="请选择日期"
  />
</template>
