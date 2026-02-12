<template>
  <div class="select-wrapper">
    <label
      v-if="label"
      :for="selectId"
      class="block text-sm font-medium text-text mb-1"
    >
      {{ label }}
    </label>
    <Listbox
      :model-value="modelValue"
      @update:model-value="handleChange"
      :disabled="disabled"
      v-slot="{ open }"
    >
      <Float
        placement="bottom-start"
        portal
        :offset="4"
        :flip="20"
        floating-as="template"
        adaptive-width
      >
        <ListboxButton
          :class="selectClasses"
          :style="buttonStyle"
        >
          <span class="block truncate">
            {{ displayLabel }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <svg
              class="h-5 w-5 text-text-light"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 8l4 4 4-4"
              />
            </svg>
          </span>
        </ListboxButton>

        <Transition
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            :class="optionsClasses"
          >
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
              as="template"
            >
              <li
                :class="[
                  'relative cursor-default select-none py-2 pl-3 pr-9 list-none',
                  active ? 'bg-primaryLight text-primary' : 'text-text',
                  option.disabled && 'opacity-50 cursor-not-allowed'
                ]"
              >
                <span :class="['block truncate', selected && 'font-semibold']">
                  {{ option.label }}
                </span>
                <span
                  v-if="selected"
                  :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-primary' : 'text-primary']"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </Float>
    </Listbox>
    <p v-if="error" class="mt-1 text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { Float } from '@headlessui-float/vue';
import type { SelectProps, SelectEmits, SelectOption } from './types';

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择',
  disabled: false,
  size: 'md',
});

const emit = defineEmits<SelectEmits>();

const selectId = ref(`select-${Math.random().toString(36).substr(2, 9)}`);

const displayLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue);
  return option?.label || props.placeholder;
});

const sizeClasses = computed(() => {
  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };
  return sizeMap[props.size];
});

const selectClasses = computed(() => {
  const base =
    'relative w-full cursor-default rounded-lg bg-surface py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-all duration-200';
  const focusClass = props.error
    ? 'focus:ring-danger'
    : 'focus:border-transparent';
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

  return [base, sizeClasses.value, focusClass, disabledClass]
    .filter(Boolean)
    .join(' ');
});

const buttonStyle = computed(() => {
  const borderColor = props.error && props.error.length > 0
    ? '#EF4444'
    : '#E2E8F0';
  return {
    border: '1.5px solid ' + borderColor
  };
});

const optionsClasses = computed(() => {
  return 'z-dropdown max-h-60 w-full overflow-auto rounded-lg bg-surface py-1 shadow-medium text-base focus:outline-none sm:text-sm';
});

const handleChange = (value: string | number) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>
