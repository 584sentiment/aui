<template>
  <div class="select-demo">
    <h3>基础选择器</h3>
    <div class="demo-section">
      <Select
        v-model="fruit"
        :options="fruits"
        label="选择水果"
        placeholder="请选择"
      />
      <Select
        v-model="city"
        :options="cities"
        label="选择城市"
        placeholder="请选择城市"
      />
    </div>

    <h3>带错误提示</h3>
    <div class="demo-section">
      <Select
        v-model="selectedCountry"
        :options="countries"
        label="选择国家（必选）"
        placeholder="请选择国家"
        :error="countryError"
      />
    </div>

    <h3>禁用状态</h3>
    <div class="demo-section">
      <Select
        v-model="disabled"
        :options="options"
        label="禁用选择器"
        disabled
      />
    </div>

    <h3>多选模式</h3>
    <div class="demo-section">
      <Select
        v-model="multiSelect"
        :options="hobbies"
        label="爱好（多选）"
        placeholder="请选择爱好"
        multiple
      />
    </div>

    <h3>当前选择</h3>
    <div class="demo-section">
      <p>水果: {{ fruit || '未选择' }}</p>
      <p>城市: {{ city || '未选择' }}</p>
      <p>国家: {{ selectedCountry || '未选择' }}</p>
      <p>爱好: {{ multiSelect.join(', ') || '未选择' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Select } from 'full-aui'

const fruit = ref('')
const city = ref('')
const disabled = ref('')
const multiSelect = ref<string[]>([])
const selectedCountry = ref('')

const fruits = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
]

const cities = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]

const countries = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'usa' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'uk' }
]

const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]

const hobbies = [
  { label: '阅读', value: 'reading' },
  { label: '运动', value: 'sports' },
  { label: '音乐', value: 'music' },
  { label: '旅行', value: 'travel' },
  { label: '游戏', value: 'gaming' }
]

const countryError = computed(() => {
  if (!selectedCountry.value) {
    return '请选择一个国家'
  }
  return ''
})
</script>

<style scoped>
.select-demo h3 {
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
