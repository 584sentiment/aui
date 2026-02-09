<script setup>
import { ref } from 'vue'
import { Modal, Button, Input } from '@job-ai/components'

const isOpen = ref(false)
const form = ref({
  name: '',
  email: ''
})

const handleSubmit = () => {
  console.log('提交表单', form.value)
  isOpen.value = false
}
</script>

<template>
  <div>
    <Button @click="isOpen = true">打开表单</Button>

    <Modal v-model="isOpen" title="表单">
      <form @submit.prevent="handleSubmit">
        <Input v-model="form.name" label="名称" />
        <Input v-model="form.email" type="email" label="邮箱" />
        <div class="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" @click="isOpen = false">取消</Button>
          <Button type="submit" variant="primary">保存</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
