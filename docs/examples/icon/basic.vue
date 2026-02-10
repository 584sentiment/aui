<script setup lang="ts">
import { ref } from 'vue'
import { 
  Search, 
  Settings, 
  Bell, 
  User,
  Heart,
  Star,
  Moon,
  Sun
} from 'lucide-vue-next'

const isDark = ref(false)
const rating = ref(0)
</script>

<template>
  <div class="icon-examples">
    <h3>基础用法</h3>
    <div class="flex items-center gap-4">
      <Search />
      <Settings />
      <Bell />
      <User />
    </div>

    <h3>自定义颜色和大小</h3>
    <div class="flex items-center gap-4">
      <Heart color="#ef4444" :size="32" />
      <Star color="#f59e0b" :size="40" :stroke-width="1.5" />
      <Moon color="#8b5cf6" :size="24" />
      <Sun color="#fbbf24" :size="28" :stroke-width="2.5" />
    </div>

    <h3>交互式图标</h3>
    <div class="flex items-center gap-4">
      <button 
        @click="isDark = !isDark"
        class="p-2 border rounded hover:bg-gray-100"
      >
        <Moon v-if="!isDark" />
        <Sun v-else color="#f59e0b" />
      </button>

      <div class="flex items-center gap-2">
        <button 
          v-for="i in 5" 
          :key="i"
          @click="rating = i"
          class="p-1"
        >
          <Star 
            :color="i <= rating ? '#f59e0b' : '#d1d5db'"
            :size="24"
            :fill="i <= rating ? '#f59e0b' : 'none'"
          />
        </button>
        <span class="text-sm text-gray-600">{{ rating }}/5</span>
      </div>
    </div>

    <h3>不同描边宽度</h3>
    <div class="flex items-center gap-4">
      <Search :stroke-width="1" :size="32" />
      <Search :stroke-width="2" :size="32" />
      <Search :stroke-width="3" :size="32" />
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

button {
  cursor: pointer;
}
</style>
