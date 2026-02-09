<script setup>
import { Button } from '@job-ai/components'
</script>

<template>
  <div class="flex gap-2">
    <Button disabled>禁用按钮</Button>
    <Button variant="primary" disabled>禁用主要按钮</Button>
    <Button variant="outline" disabled>禁用轮廓按钮</Button>
  </div>
</template>
