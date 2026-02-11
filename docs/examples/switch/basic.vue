<script setup>
import { ref } from 'vue'
import { Switch } from 'full-aui'

const enabled = ref(false)
</script>

<template>
  <Switch v-model="enabled" label="启用通知" />
</template>
