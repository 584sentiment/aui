<script setup>
import { ref } from 'vue'
import { Select } from 'full-aui'

const fruit = ref('')
const fruits = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
  { label: '草莓', value: 'strawberry' },
  { label: '芒果', value: 'mango' }
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select
      v-model="fruit"
      label="选择水果"
      placeholder="请选择水果"
      :options="fruits"
    />
    <p class="text-sm text-text-light">已选择: {{ fruit || '未选择' }}</p>
  </div>
</template>
