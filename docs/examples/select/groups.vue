<script setup>
import { ref } from 'vue'
import { Select } from 'full-aui'

const province = ref('')

// 模拟分组选项（通过 label 前缀实现视觉分组）
const groupedOptions = [
  // 华北地区
  { label: '华北 - 北京市', value: 'beijing' },
  { label: '华北 - 天津市', value: 'tianjin' },
  { label: '华北 - 河北省', value: 'hebei' },
  { label: '华北 - 山西省', value: 'shanxi' },
  // 华东地区
  { label: '华东 - 上海市', value: 'shanghai' },
  { label: '华东 - 江苏省', value: 'jiangsu' },
  { label: '华东 - 浙江省', value: 'zhejiang' },
  { label: '华东 - 安徽省', value: 'anhui' },
  // 华南地区
  { label: '华南 - 广东省', value: 'guangdong' },
  { label: '华南 - 广西壮族自治区', value: 'guangxi' },
  { label: '华南 - 海南省', value: 'hainan' }
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Select
      v-model="province"
      label="选择省份"
      placeholder="请选择省份"
      :options="groupedOptions"
    />
    <p class="text-sm text-text-light">已选择: {{ province || '未选择' }}</p>
  </div>
</template>
