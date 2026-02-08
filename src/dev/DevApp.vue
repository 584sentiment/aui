<template>
  <div class="min-h-screen bg-background">
    <!-- 顶部导航 -->
    <header class="bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-primary font-heading">Job-Ai Components</h1>
            <span class="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">Dev Mode</span>
          </div>
          <nav class="flex gap-4 text-sm">
            <a href="#buttons" class="text-text hover:text-primary transition-colors">按钮</a>
            <a href="#forms" class="text-text hover:text-primary transition-colors">表单</a>
            <a href="#feedback" class="text-text hover:text-primary transition-colors">反馈</a>
            <a href="#navigation" class="text-text hover:text-primary transition-colors">导航</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 概览 -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-text mb-4 font-heading">组件库开发模式</h2>
        <p class="text-text-secondary text-lg">
          这是一个交互式的组件测试环境，所有组件都可以实时查看和交互。
        </p>
      </section>

      <!-- 按钮组件 -->
      <section id="buttons" class="mb-16">
        <h3 class="text-2xl font-semibold text-text mb-6 font-heading">Button 按钮</h3>

        <div class="space-y-6">
          <!-- 不同样式 -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">不同样式</h4>
            <div class="flex flex-wrap gap-4">
              <Button @click="handleClick('primary')" variant="primary">主要按钮</Button>
              <Button @click="handleClick('secondary')" variant="secondary">次要按钮</Button>
              <Button @click="handleClick('outline')" variant="outline">轮廓按钮</Button>
              <Button @click="handleClick('ghost')" variant="ghost">幽灵按钮</Button>
              <Button @click="handleClick('danger')" variant="danger">危险按钮</Button>
            </div>
          </div>

          <!-- 不同尺寸 -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">不同尺寸</h4>
            <div class="flex flex-wrap items-center gap-4">
              <Button size="sm" variant="primary">小按钮</Button>
              <Button size="md" variant="primary">中按钮</Button>
              <Button size="lg" variant="primary">大按钮</Button>
            </div>
          </div>

          <!-- 状态 -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">不同状态</h4>
            <div class="flex flex-wrap gap-4">
              <Button>正常按钮</Button>
              <Button disabled>禁用按钮</Button>
              <Button :loading="isLoading">加载中...</Button>
            </div>
          </div>

          <!-- 块级按钮 -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">块级按钮</h4>
            <Button block variant="primary">块级按钮</Button>
          </div>
        </div>
      </section>

      <!-- 表单组件 -->
      <section id="forms" class="mb-16">
        <h3 class="text-2xl font-semibold text-text mb-6 font-heading">Form 表单组件</h3>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Input -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">Input 输入框</h4>
            <div class="space-y-4">
              <Input
                v-model="formData.username"
                label="用户名"
                placeholder="请输入用户名"
              />
              <Input
                v-model="formData.email"
                type="email"
                label="邮箱"
                placeholder="example@email.com"
              />
              <Input
                v-model="formData.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
              />
              <div class="text-sm text-text-secondary">
                用户名: {{ formData.username || '(空)' }}
              </div>
            </div>
          </div>

          <!-- Select & Switch -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">Select & Switch</h4>
            <div class="space-y-4">
              <Select
                v-model="formData.city"
                label="城市"
                placeholder="请选择城市"
                :options="cityOptions"
              />
              <div class="text-sm text-text-secondary">
                选择: {{ formData.city || '(未选择)' }}
              </div>

              <Switch
                v-model="formData.notifications"
                label="启用通知"
              />
              <div class="text-sm text-text-secondary">
                通知状态: {{ formData.notifications ? '开启' : '关闭' }}
              </div>

              <DatePicker
                v-model="formData.birthday"
                label="生日"
                type="date"
              />
              <div class="text-sm text-text-secondary">
                生日: {{ formData.birthday || '(未选择)' }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 反馈组件 -->
      <section id="feedback" class="mb-16">
        <h3 class="text-2xl font-semibold text-text mb-6 font-heading">Feedback 反馈组件</h3>

        <div class="glass-card p-6">
          <h4 class="text-lg font-medium text-text mb-4">Modal 对话框</h4>
          <div class="space-y-4">
            <Button @click="modalOpen = true" variant="primary">打开对话框</Button>
            <Button @click="confirmModalOpen = true" variant="secondary">打开确认对话框</Button>

            <div class="text-sm text-text-secondary">
              对话框状态: {{ modalOpen ? '打开' : '关闭' }}
            </div>
          </div>
        </div>

        <!-- Modal 示例 -->
        <Modal
          v-model="modalOpen"
          title="对话框标题"
          :show-footer="true"
          @confirm="handleModalConfirm"
        >
          <p class="text-text-secondary">
            这是对话框的内容。你可以在这里放置任何内容，比如表单、文本、图片等。
          </p>
          <div class="mt-4 p-4 bg-background rounded-lg">
            <p class="text-sm">这是一个提示信息框。</p>
          </div>
        </Modal>

        <Modal
          v-model="confirmModalOpen"
          title="确认操作"
          :show-footer="true"
          confirm-text="确认删除"
          cancel-text="取消"
          variant="danger"
        >
          <p class="text-text-secondary">
            确定要删除这条记录吗？此操作无法撤销。
          </p>
        </Modal>

        <!-- Toast 演示 -->
        <div class="glass-card p-6 mt-6">
          <h4 class="text-lg font-medium text-text mb-4">Toast 提示消息</h4>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-3">
              <Button @click="showToast('success')" variant="primary">显示成功 Toast</Button>
              <Button @click="showToast('error')" variant="danger">显示错误 Toast</Button>
              <Button @click="showToast('warning')" variant="outline">显示警告 Toast</Button>
              <Button @click="showToast('info')" variant="secondary">显示信息 Toast</Button>
            </div>

            <div class="flex flex-wrap gap-3">
              <Button @click="showToast('success', 2000)" variant="primary" size="sm">显示 Toast (2秒)</Button>
              <Button @click="showToast('error', 0)" variant="danger" size="sm">显示 Toast (手动关闭)</Button>
            </div>

            <div class="flex flex-wrap gap-3">
              <Button @click="showToast('success', 3000, 'top-left')" variant="outline" size="sm">左上角</Button>
              <Button @click="showToast('error', 3000, 'top-right')" variant="outline" size="sm">右上角</Button>
              <Button @click="showToast('warning', 3000, 'bottom-left')" variant="outline" size="sm">左下角</Button>
            </div>

            <div class="flex flex-wrap gap-3">
              <Button @click="showMultipleToasts" variant="secondary">显示多个 Toast</Button>
            </div>
          </div>
        </div>

        <!-- Toast 容器 -->
        <Teleport to="body">
          <div class="toast-container">
            <Toast
              v-for="toast in toasts"
              :key="toast.id"
              :type="toast.type"
              :title="toast.title"
              :message="toast.message"
              :duration="toast.duration"
              :closable="toast.closable"
              :show-icon="toast.showIcon"
              :position="toast.position"
              @close="removeToast(toast.id)"
            />
          </div>
        </Teleport>
      </section>

      <!-- 导航组件 -->
      <section id="navigation" class="mb-16">
        <h3 class="text-2xl font-semibold text-text mb-6 font-heading">Navigation 导航组件</h3>

        <div class="space-y-6">
          <!-- Tabs -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">Tabs 标签页</h4>
            <div class="space-y-4">
              <Tabs v-model="activeTab" :items="tabItems" variant="line">
                <template #default>
                  <div v-if="activeTab === 'tab1'" class="p-4">
                    <h5 class="font-medium text-text mb-2">标签页 1 内容</h5>
                    <p class="text-text-secondary">这是第一个标签页的内容。</p>
                  </div>
                  <div v-if="activeTab === 'tab2'" class="p-4">
                    <h5 class="font-medium text-text mb-2">标签页 2 内容</h5>
                    <p class="text-text-secondary">这是第二个标签页的内容。</p>
                  </div>
                  <div v-if="activeTab === 'tab3'" class="p-4">
                    <h5 class="font-medium text-text mb-2">标签页 3 内容</h5>
                    <p class="text-text-secondary">这是第三个标签页的内容。</p>
                  </div>
                </template>
              </Tabs>

              <Tabs v-model="activeTabCard" :items="tabItems" variant="card">
                <template #default>
                  <div class="p-4">
                    <p class="text-text-secondary">卡片样式标签页 - 当前: {{ activeTabCard }}</p>
                  </div>
                </template>
              </Tabs>
            </div>
          </div>

          <!-- Pagination -->
          <div class="glass-card p-6">
            <h4 class="text-lg font-medium text-text mb-4">Pagination 分页</h4>
            <div class="space-y-4">
              <Pagination
                v-model:page="currentPage"
                v-model:page-size="pageSize"
                :total="100"
                :show-total="true"
                :show-size-changer="true"
                @change="handlePageChange"
              />
              <div class="text-sm text-text-secondary">
                当前页: {{ currentPage }}, 每页: {{ pageSize }} 条
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section class="mb-16">
        <h3 class="text-2xl font-semibold text-text mb-6 font-heading">Timeline 时间轴</h3>

        <div class="glass-card p-6">
          <Timeline
            :items="timelineItems"
            size="md"
          />
        </div>
      </section>

      <!-- 状态展示 -->
      <section class="mb-16">
        <h3 class="text-2xl font-semibold text-text mb-6 font-heading">状态展示</h3>

        <div class="glass-card p-6">
          <h4 class="text-lg font-medium text-text mb-4">状态标签</h4>
          <div class="flex flex-wrap gap-3">
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">成功</span>
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">信息</span>
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">警告</span>
            <span class="px-3 py-1 rounded-full text-sm font-medium bg-danger/10 text-danger">危险</span>
          </div>
        </div>
      </section>

      <!-- 表单示例 -->
      <section class="mb-16">
        <h3 class="text-2xl font-semibold text-text mb-6 font-heading">完整表单示例</h3>

        <div class="glass-card p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6 max-w-2xl">
            <Input
              v-model="form.name"
              label="姓名"
              placeholder="请输入姓名"
              :error="formErrors.name"
            />
            <Input
              v-model="form.email"
              type="email"
              label="邮箱"
              placeholder="请输入邮箱"
              :error="formErrors.email"
            />
            <Select
              v-model="form.role"
              label="角色"
              placeholder="请选择角色"
              :options="roleOptions"
              :error="formErrors.role"
            />
            <Switch
              v-model="form.agree"
              label="我同意服务条款"
            />
            <div class="flex gap-4">
              <Button type="submit" variant="primary">提交</Button>
              <Button type="button" variant="outline" @click="resetForm">重置</Button>
            </div>
          </form>
          <div v-if="submitted" class="mt-4 p-4 bg-success/10 text-success rounded-lg">
            ✓ 表单提交成功！
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-surface border-t border-border mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-text-secondary text-sm">
          Job-Ai Components 开发模式 | 基于 Vue 3 + Tailwind CSS
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Button from '../components/Button/Button.vue'
import Input from '../components/Input/Input.vue'
import Select from '../components/Select/Select.vue'
import Switch from '../components/Switch/Switch.vue'
import Modal from '../components/Modal/Modal.vue'
import Tabs from '../components/Tabs/Tabs.vue'
import Pagination from '../components/Pagination/Pagination.vue'
import Timeline from '../components/Timeline/Timeline.vue'
import DatePicker from '../components/DatePicker/DatePicker.vue'
import Toast from '../components/Toast/Toast.vue'
import type { ToastType, ToastPosition } from '../components/Toast/types'

// 状态
const isLoading = ref(false)
const modalOpen = ref(false)
const confirmModalOpen = ref(false)
const activeTab = ref('tab1')
const activeTabCard = ref('tab1')
const currentPage = ref(1)
const pageSize = ref(10)
const submitted = ref(false)

// Toast 状态
const toasts = ref<Array<{
  id: number
  type: ToastType
  title: string
  message: string
  duration: number
  closable: boolean
  showIcon: boolean
  position: ToastPosition
}>>([])
let toastId = 0

// 表单数据
const formData = reactive({
  username: '',
  email: '',
  password: '',
  city: '',
  notifications: false,
  birthday: ''
})

const form = reactive({
  name: '',
  email: '',
  role: '',
  agree: false
})

const formErrors = reactive({
  name: '',
  email: '',
  role: ''
})

// 选项
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]

const roleOptions = [
  { label: '开发者', value: 'developer' },
  { label: '设计师', value: 'designer' },
  { label: '产品经理', value: 'pm' },
  { label: '测试工程师', value: 'qa' }
]

const tabItems = [
  { label: '标签页 1', value: 'tab1' },
  { label: '标签页 2', value: 'tab2' },
  { label: '标签页 3', value: 'tab3' }
]

const timelineItems = [
  {
    id: 1,
    title: '项目启动',
    description: 'Job-Ai 组件库项目正式启动',
    timestamp: '2026-02-08 10:00',
    status: 'success' as const
  },
  {
    id: 2,
    title: '设计系统',
    description: '完成设计令牌和主题配置',
    timestamp: '2026-02-08 12:00',
    status: 'success' as const
  },
  {
    id: 3,
    title: '组件开发',
    description: '完成 10 个核心组件开发',
    timestamp: '2026-02-08 14:00',
    status: 'info' as const
  },
  {
    id: 4,
    title: '测试验证',
    description: '进行组件测试和验证',
    timestamp: '2026-02-08 16:00',
    status: 'warning' as const
  }
]

// 方法
const handleClick = (variant: string) => {
  console.log('Button clicked:', variant)
}

const handleModalConfirm = () => {
  console.log('Modal confirmed')
  modalOpen.value = false
}

const handlePageChange = (page: number, size: number) => {
  console.log('Page changed:', page, size)
}

const handleSubmit = () => {
  // 简单验证
  formErrors.name = form.name ? '' : '请输入姓名'
  formErrors.email = form.email ? '' : '请输入邮箱'
  formErrors.role = form.role ? '' : '请选择角色'

  if (!formErrors.name && !formErrors.email && !formErrors.role) {
    submitted.value = true
    console.log('Form submitted:', form)
    setTimeout(() => {
      submitted.value = false
    }, 3000)
  }
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.role = ''
  form.agree = false
  formErrors.name = ''
  formErrors.email = ''
  formErrors.role = ''
  submitted.value = false
}

// Toast 方法
const showToast = (
  type: ToastType = 'info',
  duration: number = 3000,
  position: ToastPosition = 'top-right'
) => {
  const messages = {
    success: { title: '操作成功', message: '您的操作已成功完成！' },
    error: { title: '操作失败', message: '操作过程中发生错误，请重试。' },
    warning: { title: '警告', message: '请注意检查您的输入信息。' },
    info: { title: '提示', message: '这是一条提示信息。' }
  }

  const toast = {
    id: toastId++,
    type,
    title: messages[type].title,
    message: messages[type].message,
    duration,
    closable: duration === 0,
    showIcon: true,
    position
  }

  toasts.value.push(toast)
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const showMultipleToasts = () => {
  showToast('success', 3000, 'top-right')
  setTimeout(() => showToast('error', 3000, 'top-right'), 500)
  setTimeout(() => showToast('warning', 3000, 'top-right'), 1000)
}

// 演示加载状态
setInterval(() => {
  isLoading.value = !isLoading.value
}, 3000)
</script>

<style scoped>
/* Toast 容器样式 */
.toast-container {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  max-width: 400px;
  width: 100%;
}

.toast-container:deep(.toast-wrapper) {
  position: relative;
}

/* 根据 position 定位容器 */
.toast-container {
  top: 1rem;
  right: 1rem;
}

/* 如果需要支持不同的位置，可以通过动态类或内联样式实现 */
</style>

