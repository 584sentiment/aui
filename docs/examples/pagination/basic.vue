<script setup>
import { ref } from 'vue'
import { Pagination } from 'full-aui'

const currentPage = ref(1)
const currentPageWithTotal = ref(1)
const currentPageSimple = ref(1)
const currentPageDisabled = ref(1)
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- 基础用法 -->
    <section>
      <h3 class="text-lg font-semibold mb-4">基础用法</h3>
      <Pagination
        v-model:current-page="currentPage"
        :total-pages="10"
      />
    </section>

    <!-- 显示总数 -->
    <section>
      <h3 class="text-lg font-semibold mb-4">显示总数</h3>
      <Pagination
        v-model:current-page="currentPageWithTotal"
        :total-pages="20"
        :show-total="true"
        :page-size="10"
      />
    </section>

    <!-- 简洁模式 -->
    <section>
      <h3 class="text-lg font-semibold mb-4">简洁模式</h3>
      <Pagination
        v-model:current-page="currentPageSimple"
        :total-pages="5"
        :simple="true"
      />
    </section>

    <!-- 禁用状态 -->
    <section>
      <h3 class="text-lg font-semibold mb-4">禁用状态</h3>
      <Pagination
        v-model:current-page="currentPageDisabled"
        :total-pages="5"
        disabled
      />
    </section>
  </div>
</template>
