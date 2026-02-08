<template>
  <HeadlessTabPanel
    v-if="isCurrentTab"
    as="div"
    :class="tabPanelClasses"
  >
    <slot />
  </HeadlessTabPanel>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { TabPanel as HeadlessTabPanel } from '@headlessui/vue'

interface TabPanelProps {
  value?: string
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<TabPanelProps>(), {
  disabled: false
})

// 注入当前选中的值
const currentValue = inject<ComputedRef<string>>('tabsCurrentValue', computed(() => ''))

// 判断当前 panel 是否被选中
const isCurrentTab = computed(() => {
  return currentValue.value === props.value
})

const tabPanelClasses = computed(() => {
  return 'tab-panel-content'
})
</script>
