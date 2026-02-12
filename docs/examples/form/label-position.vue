<script setup>
import { ref } from 'vue'
import { Form, FormField, Input } from 'full-aui'

const formLeft = ref({
  username: '',
  email: ''
})

const formRight = ref({
  username: '',
  email: ''
})

const formTop = ref({
  username: '',
  email: ''
})
</script>

<template>
  <div class="label-position-demo">
    <h4>标签在顶部（默认）</h4>
    <Form :model="formTop" label-position="top">
      <FormField label="用户名" name="username">
        <Input v-model="formTop.username" placeholder="标签在顶部" />
      </FormField>
      <FormField label="邮箱地址" name="email">
        <Input v-model="formTop.email" placeholder="标签在顶部" />
      </FormField>
    </Form>

    <h4>标签在左侧</h4>
    <Form :model="formLeft" label-position="left" label-width="100px">
      <FormField label="用户名" name="username">
        <Input v-model="formLeft.username" placeholder="标签在左侧" />
      </FormField>
      <FormField label="邮箱地址" name="email">
        <Input v-model="formLeft.email" placeholder="标签在左侧" />
      </FormField>
    </Form>

    <h4>标签在右侧</h4>
    <Form :model="formRight" label-position="right" label-width="100px">
      <FormField label="用户名" name="username">
        <Input v-model="formRight.username" placeholder="标签在右侧" />
      </FormField>
      <FormField label="邮箱地址" name="email">
        <Input v-model="formRight.email" placeholder="标签在右侧" />
      </FormField>
    </Form>
  </div>
</template>

<style scoped>
.label-position-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.label-position-demo h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
}
</style>
