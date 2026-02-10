<script setup lang="ts">
import { Search, Settings, User } from 'lucide-vue-next'
</script>

<template>
  <div class="icon-examples">
    <h3>基础用法</h3>
    <div class="flex gap-4">
      <Search />
      <Settings />
      <User />
    </div>

    <h3>自定义大小</h3>
    <div class="flex gap-4">
      <Search :size="16" />
      <Search :size="24" />
      <Search :size="32" />
    </div>

    <h3>自定义颜色</h3>
    <div class="flex gap-4">
      <Search color="#3b82f6" />
      <Settings color="#ef4444" />
      <User color="#10b981" />
    </div>

    <h3>自定义描边宽度</h3>
    <div class="flex gap-4">
      <Search :stroke-width="1" :size="24" />
      <Search :stroke-width="2" :size="24" />
      <Search :stroke-width="3" :size="24" />
    </div>
  </div>
</template>

<style scoped>
.icon-examples {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}
</style>
