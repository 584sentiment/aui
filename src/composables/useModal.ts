/**
 * Modal 通用逻辑
 */
import { ref, watch, type Ref } from 'vue'

export interface UseModalOptions {
  modelValue: Ref<boolean>
  onClose?: () => void
}

export function useModal(options: UseModalOptions) {
  const { modelValue, onClose } = options
  const isOpen = ref(modelValue.value)

  watch(modelValue, (newValue) => {
    isOpen.value = newValue
  })

  watch(isOpen, (newValue) => {
    if (!newValue && onClose) {
      onClose()
    }
  })

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    open,
    close,
    toggle
  }
}
