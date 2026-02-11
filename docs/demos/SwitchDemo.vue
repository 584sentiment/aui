<template>
  <div class="switch-demo">
    <h3>基础开关</h3>
    <div class="demo-section">
      <div class="switch-item">
        <Switch v-model="switch1" />
        <span>关闭状态</span>
      </div>
      <div class="switch-item">
        <Switch v-model="switch2" :default-value="true" />
        <span>开启状态</span>
      </div>
    </div>

    <h3>禁用状态</h3>
    <div class="demo-section">
      <div class="switch-item">
        <Switch v-model="switch3" disabled />
        <span>禁用开关</span>
      </div>
    </div>

    <h3>带标签</h3>
    <div class="demo-section">
      <div class="switch-item">
        <Switch v-model="switch4" />
        <span>接收邮件通知</span>
      </div>
      <div class="switch-item">
        <Switch v-model="switch5" />
        <span>自动保存</span>
      </div>
    </div>

    <h3>当前状态</h3>
    <div class="demo-section">
      <p>Switch 1: {{ switch1 ? '开启' : '关闭' }}</p>
      <p>Switch 2: {{ switch2 ? '开启' : '关闭' }}</p>
      <p>Switch 3: {{ switch3 ? '开启' : '关闭' }}</p>
      <p>Switch 4: {{ switch4 ? '开启' : '关闭' }}</p>
      <p>Switch 5: {{ switch5 ? '开启' : '关闭' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from 'full-aui'

const switch1 = ref(false)
const switch2 = ref(true)
const switch3 = ref(false)
const switch4 = ref(false)
const switch5 = ref(true)
</script>

<style scoped>
.switch-demo h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.switch-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.demo-section p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
