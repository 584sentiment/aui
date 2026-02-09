<script setup>
import { ref } from 'vue'
import { Input } from '@job-ai/components'

const value = ref('')
const email = ref('')
const password = ref('')
const age = ref('')
</script>

<template>
  <div class="space-y-4">
    <!-- 文本输入 -->
    <Input type="text" v-model="value" label="文本" />

    <!-- 邮箱输入 -->
    <Input type="email" v-model="email" label="邮箱" placeholder="example@email.com" />

    <!-- 密码输入 -->
    <Input type="password" v-model="password" label="密码" />

    <!-- 数字输入 -->
    <Input type="number" v-model="age" label="年龄" :min="0" :max="120" />
  </div>
</template>
