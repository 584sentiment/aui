<script setup>
import { ref } from 'vue'
import { Modal, Button } from '@job-ai/components'

const isOpen = ref(false)

const handleConfirm = () => {
  console.log('确认操作')
  isOpen.value = false
}
</script>

<template>
  <div>
    <Button @click="isOpen = true">打开对话框</Button>

    <Modal
      v-model="isOpen"
      title="对话框标题"
      :show-footer="true"
      @confirm="handleConfirm"
    >
      <p>这是对话框的内容区域。</p>
    </Modal>
  </div>
</template>
