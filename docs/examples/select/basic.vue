<script setup>
import { ref } from 'vue'
import { Select } from 'full-aui'

const city = ref('')
const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]
</script>

<template>
  <Select
    v-model="city"
    label="城市"
    placeholder="请选择城市"
    :options="options"
  />
</template>
