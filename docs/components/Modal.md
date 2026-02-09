# Modal 对话框

模态对话框组件，用于需要用户处理的重要事务。

## 基础用法

使用 `v-model` 绑定打开状态，通过 `title` 设置标题。

:::demo 基础用法
```vue
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
```
:::

## 尺寸

通过 `size` 属性设置对话框大小，支持 `sm`、`md`、`lg`、`xl`、`full`。

:::demo 尺寸示例
```vue
<script setup>
import { ref } from 'vue'
import { Modal, Button } from '@job-ai/components'

const size = ref('md')

const openModal = (s) => {
  size.value = s
}
</script>

<template>
  <div class="flex gap-2">
    <Button @click="openModal('sm')">小尺寸</Button>
    <Button @click="openModal('md')">中等尺寸</Button>
    <Button @click="openModal('lg')">大尺寸</Button>
    <Button @click="openModal('xl')">超大尺寸</Button>
  </div>
</template>
```
:::

## 自定义内容

可以在对话框内放置任意内容，包括表单组件。

:::demo 自定义内容
```vue
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
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 是否打开 | `boolean` | `false` |
| title | 标题 | `string` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| maskClosable | 点击蒙层是否关闭 | `boolean` | `true` |
| showFooter | 是否显示底部按钮 | `boolean` | `false` |
| confirmText | 确认按钮文本 | `string` | `'确认'` |
| cancelText | 取消按钮文本 | `string` | `'取消'` |
| loading | 确认按钮加载状态 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 打开状态改变 | `value: boolean` |
| confirm | 点击确认按钮 | - |
| cancel | 点击取消按钮 | - |
| afterOpen | 打开后触发 | - |
| afterClose | 关闭后触发 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| header | 自定义头部 |
| default | 默认内容 |
| footer | 自定义底部 |
