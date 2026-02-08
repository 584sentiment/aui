<template>
  <TabGroup
    :model-value="modelValue"
    @update:model-value="handleChange"
    as="div"
    class="tabs-wrapper"
  >
    <TabList
      :class="tabListClasses"
      v-if="variant === 'line'"
    >
      <Tab
        v-for="item in items"
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
        v-for="item in items"
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
import { computed } from 'vue'
import { TabGroup, TabList, Tab } from '@headlessui/vue'
import type { TabsProps, TabsEmits } from './types'

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'line',
  size: 'md'
})

const emit = defineEmits<TabsEmits>()

const tabListClasses = computed(() => {
  return 'flex border-b border-border bg-surface rounded-t-lg'
})

const cardTabListClasses = computed(() => {
  return 'flex gap-2 bg-background p-2 rounded-lg'
})

const handleChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>
