<script setup>
import { ref } from 'vue'
import { Input } from '@job-ai/components'

const smallValue = ref('')
const mediumValue = ref('')
const largeValue = ref('')
</script>

<template>
  <div class="space-y-4">
    <!-- 小尺寸 -->
    <Input
      v-model="smallValue"
      label="小尺寸"
      size="sm"
      placeholder="小尺寸输入框"
    />

    <!-- 中等尺寸 -->
    <Input
      v-model="mediumValue"
      label="中等尺寸"
      size="md"
      placeholder="中等尺寸输入框"
    />

    <!-- 大尺寸 -->
    <Input
      v-model="largeValue"
      label="大尺寸"
      size="lg"
      placeholder="大尺寸输入框"
    />
  </div>
</template>
