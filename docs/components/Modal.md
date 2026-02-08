# Modal 对话框

模态对话框组件，用于需要用户处理的重要事务。

## 实时演示

<demo vue="../demos/ModalDemo.vue" />

## 基础用法

```vue
<script setup>
import { ref } from 'vue'
import { Modal } from '@job-ai/components'

const isOpen = ref(false)

const handleConfirm = () => {
  console.log('确认操作')
  isOpen.value = false
}
</script>

<template>
  <Button @click="isOpen = true">打开对话框</Button>

  <Modal
    v-model="isOpen"
    title="对话框标题"
    :show-footer="true"
    @confirm="handleConfirm"
  >
    <p>这是对话框的内容区域。</p>
  </Modal>
</template>
```

## 无底部按钮

```vue
<Modal v-model="isOpen" title="提示">
  <p>只显示信息，不需要用户确认。</p>
</Modal>
```

## 确认对话框

```vue
<Modal
  v-model="isOpen"
  title="确认删除"
  :show-footer="true"
  confirm-text="删除"
  cancel-text="取消"
  variant="danger"
>
  <p>确定要删除这条记录吗？此操作无法撤销。</p>
</Modal>
```

## 自定义内容

```vue
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
```

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
