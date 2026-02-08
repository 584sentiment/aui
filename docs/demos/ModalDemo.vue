<template>
  <div class="modal-demo">
    <h3>基础对话框</h3>
    <div class="demo-section">
      <Button @click="showBasic = true">打开对话框</Button>
      <Modal v-model:open="showBasic" title="基础对话框">
        <p>这是一个基础的对话框内容。</p>
      </Modal>
    </div>

    <h3>确认对话框</h3>
    <div class="demo-section">
      <Button @click="showConfirm = true">确认操作</Button>
      <Modal
        v-model:open="showConfirm"
        title="确认删除"
        type="confirm"
        @confirm="handleConfirm"
      >
        <p>确定要删除这条数据吗？此操作无法撤销。</p>
      </Modal>
    </div>

    <h3>自定义按钮</h3>
    <div class="demo-section">
      <Button @click="showCustom = true">自定义按钮</Button>
      <Modal
        v-model:open="showCustom"
        title="自定义按钮"
        :show-footer="false"
      >
        <p>这个对话框没有默认的页脚按钮。</p>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
          <Button variant="primary" @click="showCustom = false">确定</Button>
          <Button variant="outline" @click="showCustom = false">取消</Button>
        </div>
      </Modal>
    </div>

    <h3>大型对话框</h3>
    <div class="demo-section">
      <Button @click="showLarge = true">大型对话框</Button>
      <Modal v-model:open="showLarge" title="大型对话框" size="lg">
        <div style="padding: 1rem 0;">
          <p>这是一个大型对话框，适合展示更多内容。</p>
          <p v-for="i in 5" :key="i">这是第 {{ i }} 段示例文本。</p>
        </div>
      </Modal>
    </div>

    <h3>操作结果</h3>
    <div class="demo-section">
      <p v-if="confirmResult">确认操作结果: {{ confirmResult }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@job-ai/components'
import Button from '@job-ai/components'

const showBasic = ref(false)
const showConfirm = ref(false)
const showCustom = ref(false)
const showLarge = ref(false)
const confirmResult = ref('')

const handleConfirm = () => {
  confirmResult.value = '用户已确认删除'
  showConfirm.value = false
  setTimeout(() => {
    confirmResult.value = ''
  }, 3000)
}
</script>

<style scoped>
.modal-demo h3 {
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

.demo-section p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
