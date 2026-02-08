<template>
  <div class="button-demo">
    <h3>基础按钮</h3>
    <div class="demo-section">
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="outline">边框按钮</Button>
      <Button variant="ghost">幽灵按钮</Button>
    </div>

    <h3>不同尺寸</h3>
    <div class="demo-section">
      <Button variant="primary" size="sm">小按钮</Button>
      <Button variant="primary" size="md">中按钮</Button>
      <Button variant="primary" size="lg">大按钮</Button>
    </div>

    <h3>状态按钮</h3>
    <div class="demo-section">
      <Button variant="primary" :loading="loading">加载中</Button>
      <Button variant="primary" disabled>禁用按钮</Button>
      <Button variant="primary" @click="handleClick">点击计数: {{ count }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@job-ai/components'

const loading = ref(false)
const count = ref(0)

const handleClick = () => {
  count.value++
}

// 模拟加载状态
setInterval(() => {
  loading.value = !loading.value
}, 3000)
</script>

<style scoped>
.button-demo h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.demo-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
</style>
