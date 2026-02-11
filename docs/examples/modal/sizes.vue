<script setup>
import { ref } from 'vue'
import { Modal, Button } from 'full-aui'

const size = ref('md')

const openModal = (s) => {
  size.value = s
}
</script>

<template>
  <div class="flex gap-2">
    <Button @click="openModal('sm')">小尺寸</Button>
    <Button @click="openModal('md')">中等尺寸</Button>
    <Button @click="openModal('lg')">大尺寸</Button>
    <Button @click="openModal('xl')">超大尺寸</Button>
  </div>
</template>
