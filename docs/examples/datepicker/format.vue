<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from 'full-aui'

const date1 = ref('')
const date2 = ref('')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <DatePicker
      v-model="date1"
      label="YYYY/MM/DD 格式"
      format="YYYY/MM/DD"
      placeholder="请选择日期"
    />
    <DatePicker
      v-model="date2"
      label="YYYY-MM-DD 格式"
      format="YYYY-MM-DD"
      placeholder="请选择日期"
    />
  </div>
</template>
