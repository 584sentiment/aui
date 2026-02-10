<script setup lang="ts">
import { ref } from 'vue'
import {
  Check,
  X,
  Search,
  Settings,
  User,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  Home,
  Edit,
  Trash,
  Download,
  Upload,
  Plus,
  Minus,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle
} from 'lucide-vue-next'

const selectedColor = ref('#3b82f6')
const selectedSize = ref(24)

const colors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#10b981' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Current', value: 'currentColor' }
]

const sizes = [16, 20, 24, 32, 48]
</script>

<template>
  <div class="lucide-demo">
    <h2>Lucide Icons 演示</h2>

    <!-- 控制面板 -->
    <div class="controls">
      <div class="control-group">
        <label>颜色：</label>
        <button
          v-for="color in colors"
          :key="color.value"
          class="color-btn"
          :class="{ active: selectedColor === color.value }"
          :style="{ backgroundColor: color.value }"
          @click="selectedColor = color.value"
        >
          {{ color.name }}
        </button>
      </div>

      <div class="control-group">
        <label>大小：</label>
        <button
          v-for="size in sizes"
          :key="size"
          class="size-btn"
          :class="{ active: selectedSize === size }"
          @click="selectedSize = size"
        >
          {{ size }}px
        </button>
      </div>
    </div>

    <!-- 基础图标 -->
    <div class="icon-section">
      <h3>基础图标</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <Check :color="selectedColor" :size="selectedSize" />
          <span>Check</span>
        </div>
        <div class="icon-item">
          <X :color="selectedColor" :size="selectedSize" />
          <span>X</span>
        </div>
        <div class="icon-item">
          <Search :color="selectedColor" :size="selectedSize" />
          <span>Search</span>
        </div>
        <div class="icon-item">
          <Settings :color="selectedColor" :size="selectedSize" />
          <span>Settings</span>
        </div>
        <div class="icon-item">
          <User :color="selectedColor" :size="selectedSize" />
          <span>User</span>
        </div>
        <div class="icon-item">
          <Bell :color="selectedColor" :size="selectedSize" />
          <span>Bell</span>
        </div>
      </div>
    </div>

    <!-- 导航图标 -->
    <div class="icon-section">
      <h3>导航图标</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <ChevronDown :color="selectedColor" :size="selectedSize" />
          <span>ChevronDown</span>
        </div>
        <div class="icon-item">
          <ChevronRight :color="selectedColor" :size="selectedSize" />
          <span>ChevronRight</span>
        </div>
        <div class="icon-item">
          <ChevronLeft :color="selectedColor" :size="selectedSize" />
          <span>ChevronLeft</span>
        </div>
        <div class="icon-item">
          <Menu :color="selectedColor" :size="selectedSize" />
          <span>Menu</span>
        </div>
        <div class="icon-item">
          <Home :color="selectedColor" :size="selectedSize" />
          <span>Home</span>
        </div>
      </div>
    </div>

    <!-- 操作图标 -->
    <div class="icon-section">
      <h3>操作图标</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <Edit :color="selectedColor" :size="selectedSize" />
          <span>Edit</span>
        </div>
        <div class="icon-item">
          <Trash :color="selectedColor" :size="selectedSize" />
          <span>Trash</span>
        </div>
        <div class="icon-item">
          <Download :color="selectedColor" :size="selectedSize" />
          <span>Download</span>
        </div>
        <div class="icon-item">
          <Upload :color="selectedColor" :size="selectedSize" />
          <span>Upload</span>
        </div>
        <div class="icon-item">
          <Plus :color="selectedColor" :size="selectedSize" />
          <span>Plus</span>
        </div>
        <div class="icon-item">
          <Minus :color="selectedColor" :size="selectedSize" />
          <span>Minus</span>
        </div>
      </div>
    </div>

    <!-- 状态图标 -->
    <div class="icon-section">
      <h3>状态图标</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <Info :color="selectedColor" :size="selectedSize" />
          <span>Info</span>
        </div>
        <div class="icon-item">
          <AlertTriangle :color="selectedColor" :size="selectedSize" />
          <span>AlertTriangle</span>
        </div>
        <div class="icon-item">
          <XCircle :color="selectedColor" :size="selectedSize" />
          <span>XCircle</span>
        </div>
        <div class="icon-item">
          <CheckCircle :color="selectedColor" :size="selectedSize" />
          <span>CheckCircle</span>
        </div>
      </div>
    </div>

    <!-- 不同描边宽度 -->
    <div class="icon-section">
      <h3>不同描边宽度</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <Check :color="selectedColor" :size="32" :stroke-width="1" />
          <span>Stroke: 1</span>
        </div>
        <div class="icon-item">
          <Check :color="selectedColor" :size="32" :stroke-width="2" />
          <span>Stroke: 2 (默认)</span>
        </div>
        <div class="icon-item">
          <Check :color="selectedColor" :size="32" :stroke-width="3" />
          <span>Stroke: 3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lucide-demo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 600;
  color: #374151;
}

.color-btn,
.size-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.color-btn:hover,
.size-btn:hover {
  border-color: #3b82f6;
}

.color-btn.active,
.size-btn.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.icon-section {
  margin-bottom: 2rem;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
}

.icon-item:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.icon-item span {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  font-family: monospace;
}
</style>
