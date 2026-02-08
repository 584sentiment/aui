<template>
  <div class="tabs-demo">
    <h3>基础标签页</h3>
    <div class="demo-section">
      <Tabs v-model="activeTab1">
        <TabPanel value="tab1" label="标签页 1">
          <p>标签页 1 的内容</p>
        </TabPanel>
        <TabPanel value="tab2" label="标签页 2">
          <p>标签页 2 的内容</p>
        </TabPanel>
        <TabPanel value="tab3" label="标签页 3">
          <p>标签页 3 的内容</p>
        </TabPanel>
      </Tabs>
    </div>

    <h3>带图标</h3>
    <div class="demo-section">
      <Tabs v-model="activeTab2">
        <TabPanel value="home" label="首页">
          <p>🏠 首页内容</p>
        </TabPanel>
        <TabPanel value="profile" label="个人资料">
          <p>👤 个人资料内容</p>
        </TabPanel>
        <TabPanel value="settings" label="设置">
          <p>⚙️ 设置内容</p>
        </TabPanel>
      </Tabs>
    </div>

    <h3>垂直标签页</h3>
    <div class="demo-section">
      <Tabs v-model="activeTab3">
        <TabPanel value="vertical1" label="垂直 1">
          <p>垂直标签页 1</p>
        </TabPanel>
        <TabPanel value="vertical2" label="垂直 2">
          <p>垂直标签页 2</p>
        </TabPanel>
        <TabPanel value="vertical3" label="垂直 3">
          <p>垂直标签页 3</p>
        </TabPanel>
      </Tabs>
    </div>

    <h3>当前激活标签</h3>
    <div class="demo-section">
      <p>基础标签页: {{ activeTab1 }}</p>
      <p>带图标标签页: {{ activeTab2 }}</p>
      <p>垂直标签页: {{ activeTab3 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabPanel } from '@job-ai/components'

const activeTab1 = ref('tab1')
const activeTab2 = ref('home')
const activeTab3 = ref('vertical1')
</script>

<style scoped>
.tabs-demo h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
