<template>
  <Dialog :open="modelValue" @close="handleClose" class="relative z-modal">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-modal-backdrop bg-black/50 backdrop-blur-sm transition-opacity"
      aria-hidden="true"
    />

    <!-- Full screen container to center the modal -->
    <div class="fixed inset-0 z-modal overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel
          :class="modalClasses"
          class="relative transform overflow-hidden rounded-xl bg-surface shadow-strong transition-all"
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header || closable"
            class="flex items-center justify-between px-6 py-4 border-b border-border"
          >
            <div v-if="title || $slots.header">
              <slot name="header">
                <DialogTitle
                  class="text-lg font-semibold text-text font-heading"
                >
                  {{ title }}
                </DialogTitle>
              </slot>
            </div>
            <button
              v-if="closable"
              @click="handleClose"
              class="text-text-light hover:text-text transition-colors p-1 hover:bg-gray-100 rounded-lg"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-4">
            <slot>
              <DialogDescription class="text-text-secondary">
                <!-- Default content if needed -->
              </DialogDescription>
            </slot>
          </div>

          <!-- Footer -->
          <div
            v-if="showFooter || $slots.footer"
            class="flex items-center justify-end gap-3 px-6 py-4 border-t border-border"
          >
            <slot name="footer">
              <button
                v-if="showFooter"
                @click="handleCancel"
                :disabled="loading"
                class="px-4 py-2 text-text hover:bg-background rounded-lg transition-colors"
              >
                {{ cancelText }}
              </button>
              <button
                v-if="showFooter"
                @click="handleConfirm"
                :disabled="loading"
                class="px-4 py-2 bg-primary text-white hover:bg-primaryHover rounded-lg transition-colors disabled:opacity-50"
              >
                <span v-if="loading" class="animate-spin mr-2">⟳</span>
                {{ confirmText }}
              </button>
            </slot>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue';
import type { ModalProps, ModalEmits } from './types';

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  closable: true,
  maskClosable: true,
  showFooter: false,
  confirmText: '确认',
  cancelText: '取消',
  loading: false,
});

const modelValue = defineModel<boolean>({ default: false });

const emit = defineEmits<ModalEmits>();

const modalClasses = computed(() => {
  const sizeClasses = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-xl w-full',
    full: 'max-w-6xl w-full',
  };
  return sizeClasses[props.size];
});

const handleClose = () => {
  if (props.closable && !props.loading) {
    modelValue.value = false;
  }
};

const handleCancel = () => {
  emit('cancel');
  modelValue.value = false;
};

const handleConfirm = () => {
  if (!props.loading) {
    emit('confirm');
  }
};

watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      emit('afterOpen');
    } else {
      emit('afterClose');
    }
  },
);
</script>
