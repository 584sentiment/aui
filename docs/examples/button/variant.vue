<script setup>
import { Button } from 'full-aui'
</script>

<template>
  <div class="flex gap-2">
    <Button variant="danger">删除</Button>
    <Button variant="danger" disabled>禁用危险按钮</Button>
    <Button variant="danger" loading>删除中...</Button>
  </div>
</template>
