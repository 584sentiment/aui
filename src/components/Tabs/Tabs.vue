<template>
  <TabGroup
    :default-index="currentIndex"
    @change="handleIndexChange"
    as="div"
    class="tabs-wrapper"
  >
    <TabList
      :class="tabListClasses"
      v-if="variant === 'line'"
    >
      <Tab
        v-for="item in displayItems"
        :key="item.value"
        v-slot="{ selected }"
        :disabled="item.disabled"
        as="template"
      >
        <button
          :class="[
            'relative min-w-0 flex-1 overflow-hidden rounded-t-lg py-2 text-sm font-medium text-center transition-all duration-200 focus:outline-none',
            selected ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text border-b-2 border-transparent',
            item.disabled && 'opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="flex items-center justify-center gap-2">
            <span v-if="item.icon" v-html="item.icon" />
            {{ item.label }}
          </span>
        </button>
      </Tab>
    </TabList>

    <TabList
      :class="cardTabListClasses"
      v-else
    >
      <Tab
        v-for="item in displayItems"
        :key="item.value"
        v-slot="{ selected }"
        :disabled="item.disabled"
        as="template"
      >
        <button
          :class="[
            'relative min-w-0 flex-1 overflow-hidden rounded-lg py-2 px-4 text-sm font-medium text-center transition-all duration-200 focus:outline-none',
            selected ? 'bg-primary text-white shadow-sm' : 'bg-surface text-text-secondary hover:text-text hover:bg-gray-50',
            item.disabled && 'opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="flex items-center justify-center gap-2">
            <span v-if="item.icon" v-html="item.icon" />
            {{ item.label }}
          </span>
        </button>
      </Tab>
    </TabList>

    <!-- 使用默认插槽让用户自定义内容区域 -->
    <div class="mt-4">
      <slot />
    </div>
  </TabGroup>
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { TabGroup, TabList, Tab } from '@headlessui/vue'
import type { TabsProps, TabsEmits, TabItem } from './types'

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'line',
  size: 'md'
})

const emit = defineEmits<TabsEmits>()

const slots = useSlots()

// 收集 TabPanel 子组件
const tabPanels = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []

  const panels: Array<{ value: string; label?: string; disabled?: boolean }> = []
  defaultSlot.forEach((child: any) => {
    if (child.type?.name === 'TabPanel' || child.type?.__name === 'TabPanel') {
      panels.push({
        value: child.props?.value || '',
        label: child.props?.label,
        disabled: child.props?.disabled || false
      })
    }
  })
  return panels
})

// 如果有 TabPanel 子组件，使用它们；否则使用 items prop
const displayItems = computed<TabItem[]>(() => {
  if (tabPanels.value.length > 0) {
    return tabPanels.value.map(p => ({
      value: p.value,
      label: p.label || p.value,
      disabled: p.disabled
    }))
  }
  return props.items || []
})

// 计算当前选中的索引
const currentIndex = computed(() => {
  const index = displayItems.value.findIndex(item => item.value === props.modelValue)
  return index >= 0 ? index : 0
})

// 处理索引变化
const handleIndexChange = (index: number) => {
  const item = displayItems.value[index]
  if (item && item.value !== props.modelValue) {
    emit('update:modelValue', item.value)
    emit('change', item.value)
  }
}

const tabListClasses = computed(() => {
  return 'flex border-b border-border bg-surface rounded-t-lg'
})

const cardTabListClasses = computed(() => {
  return 'flex gap-2 bg-background p-2 rounded-lg'
})

// 提供当前选中的值给 TabPanel 子组件
provide('tabsCurrentValue', computed(() => props.modelValue))
</script>
