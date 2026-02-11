<script setup>
import { ref } from 'vue'
import { Switch } from 'full-aui'

const value1 = ref(false)
const value2 = ref(false)
</script>

<template>
  <div class="space-y-4">
    <Switch v-model="value1" label="小尺寸" size="sm" />
    <Switch v-model="value2" label="默认尺寸" />
  </div>
</template>
