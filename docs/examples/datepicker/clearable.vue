<script setup>
import { ref } from 'vue'
import { DatePicker } from 'full-aui'

const date = ref(new Date())
</script>

<template>
  <DatePicker
    v-model="date"
    label="无清除按钮"
    :show-clear-button="false"
    placeholder="请选择日期"
  />
</template>
