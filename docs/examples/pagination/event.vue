<script setup>
import { ref } from 'vue'
import { Pagination } from 'full-aui'

const currentPage = ref(1)
const currentMessage = ref('')

const handlePageChange = (page) => {
  currentMessage.value = `页码改变: ${page}`
  console.log('页码改变:', page)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <section>
      <h3 class="text-lg font-semibold mb-4">事件监听</h3>
      <div class="space-y-4">
        <Pagination
          v-model:current-page="currentPage"
          :total-pages="10"
          @change="handlePageChange"
        />

        <div
          v-if="currentMessage"
          class="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700"
        >
          {{ currentMessage }}
        </div>

        <div class="text-sm text-gray-600">
          当前页码: {{ currentPage }}
        </div>
      </div>
    </section>
  </div>
</template>
