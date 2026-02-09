<script setup>
import { ref } from 'vue'
import { Tabs } from '@job-ai/components'

const activeTab = ref('tab1')
const tabs = [
  { label: '标签页 1', value: 'tab1' },
  { label: '标签页 2', value: 'tab2' },
  { label: '标签页 3', value: 'tab3' }
]
</script>

<template>
  <Tabs v-model="activeTab" :items="tabs" variant="card">
    <template #default>
      <div v-if="activeTab === 'tab1'" class="p-4">
        卡片样式 - 标签页 1 的内容
      </div>
      <div v-if="activeTab === 'tab2'" class="p-4">
        卡片样式 - 标签页 2 的内容
      </div>
      <div v-if="activeTab === 'tab3'" class="p-4">
        卡片样式 - 标签页 3 的内容
      </div>
    </template>
  </Tabs>
</template>
