<script setup>
import { ref } from 'vue'
import { Input } from '@job-ai/components'

const disabledValue = ref('禁用的内容')
const readonlyValue = ref('只读的内容')
</script>

<template>
  <div class="space-y-4">
    <!-- 禁用状态 -->
    <Input
      v-model="disabledValue"
      label="禁用的输入框"
      disabled
    />

    <!-- 只读状态 -->
    <Input
      v-model="readonlyValue"
      label="只读的输入框"
      readonly
    />
  </div>
</template>
