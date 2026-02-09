<script setup>
import { ref } from 'vue'
import { Switch } from '@job-ai/components'

const value1 = ref(false)
const value2 = ref(true)
const value3 = ref(false)
</script>

<template>
  <div class="space-y-4">
    <!-- 关闭状态 -->
    <Switch v-model="value1" label="关闭" />

    <!-- 开启状态 -->
    <Switch v-model="value2" label="开启" />

    <!-- 禁用状态 -->
    <Switch v-model="value3" label="禁用" :disabled="true" />
  </div>
</template>
