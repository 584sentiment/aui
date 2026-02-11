<script setup>
import { Button } from 'full-aui'
</script>

<template>
  <div class="flex gap-2">
    <Button loading>加载中...</Button>
    <Button variant="primary" loading>提交中...</Button>
    <Button variant="outline" loading>处理中...</Button>
  </div>
</template>
