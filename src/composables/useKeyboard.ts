/**
 * 键盘事件处理
 */
import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useKeyboard(
  key: string,
  callback: (event: KeyboardEvent) => void,
  target: Ref<HTMLElement | undefined> = ref(undefined)
) {
  const handleKeyDown = (event: Event) => {
    if (event instanceof KeyboardEvent && event.key === key) {
      callback(event)
    }
  }

  onMounted(() => {
    const element = target.value || window
    element.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    const element = target.value || window
    element.removeEventListener('keydown', handleKeyDown)
  })
}

export function useEscape(callback: () => void) {
  useKeyboard('Escape', callback)
}
