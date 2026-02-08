<template>
  <div class="input-demo">
    <h3>基础输入框</h3>
    <div class="demo-section">
      <Input v-model="text1" placeholder="请输入内容" />
      <Input v-model="text2" label="用户名" placeholder="请输入用户名" />
    </div>

    <h3>不同类型</h3>
    <div class="demo-section">
      <Input v-model="email" type="email" label="邮箱" placeholder="example@mail.com" />
      <Input v-model="password" type="password" label="密码" placeholder="请输入密码" />
      <Input v-model="number" type="number" label="数量" placeholder="0" />
    </div>

    <h3>带验证</h3>
    <div class="demo-section">
      <Input
        v-model="email2"
        type="email"
        label="邮箱（必填）"
        placeholder="请输入邮箱"
        :error="emailError"
        required
      />
    </div>

    <h3>禁用状态</h3>
    <div class="demo-section">
      <Input v-model="disabled" label="禁用输入框" disabled />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Input from '@job-ai/components'

const text1 = ref('')
const text2 = ref('')
const email = ref('')
const password = ref('')
const number = ref(0)
const email2 = ref('')
const disabled = ref('禁用内容')

const emailError = computed(() => {
  if (email2.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email2.value)) {
    return '请输入有效的邮箱地址'
  }
  return ''
})
</script>

<style scoped>
.input-demo h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
}
</style>
