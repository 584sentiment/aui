<template>
  <div class="datepicker-demo">
    <h3>基础日期选择</h3>
    <div class="demo-section">
      <DatePicker
        v-model="date1"
        label="选择日期"
        placeholder="请选择日期"
        :show-shortcuts="false"
      />
    </div>

    <h3>不同格式</h3>
    <div class="demo-section">
      <DatePicker
        v-model="date2"
        label="YYYY/MM/DD 格式"
        format="YYYY/MM/DD"
        placeholder="请选择日期"
      />
      <DatePicker
        v-model="date3"
        label="YYYY-MM-DD 格式"
        format="YYYY-MM-DD"
        placeholder="请选择日期"
      />
    </div>

    <h3>带快捷选项</h3>
    <div class="demo-section">
      <DatePicker
        v-model="date4"
        label="带快捷选项"
        :show-shortcuts="true"
        placeholder="请选择日期"
      />
    </div>

    <h3>禁用清除按钮</h3>
    <div class="demo-section">
      <DatePicker
        v-model="date5"
        label="无清除按钮"
        :show-clear-button="false"
        placeholder="请选择日期"
      />
    </div>

    <h3>日期范围限制</h3>
    <div class="demo-section">
      <DatePicker
        v-model="date6"
        label="限制范围（不能选择未来日期）"
        :max-date="new Date()"
        placeholder="请选择日期"
      />
    </div>

    <h3>当前选择</h3>
    <div class="demo-section">
      <p>日期1: {{ date1 ? formatDate(date1) : '未选择' }}</p>
      <p>日期2: {{ date2 ? formatDate(date2) : '未选择' }}</p>
      <p>日期3: {{ date3 ? formatDate(date3) : '未选择' }}</p>
      <p>日期4: {{ date4 ? formatDate(date4) : '未选择' }}</p>
      <p>日期5: {{ date5 ? formatDate(date5) : '未选择' }}</p>
      <p>日期6: {{ date6 ? formatDate(date6) : '未选择' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from 'full-aui'

const date1 = ref()
const date2 = ref()
const date3 = ref()
const date4 = ref()
const date5 = ref()
const date6 = ref()

const formatDate = (date: Date | string) => {
  if (!date) return '未选择'
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('zh-CN')
}

// 设置默认值
date6.value = new Date()
</script>

<style scoped>
.datepicker-demo h3 {
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

.demo-section p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
