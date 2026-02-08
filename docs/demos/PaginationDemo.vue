<template>
  <div class="pagination-demo">
    <h3>基础分页</h3>
    <div class="demo-section">
      <Pagination
        v-model:current-page="currentPage1"
        :total-pages="10"
        @change="handlePageChange"
      />
    </div>

    <h3>显示总数信息</h3>
    <div class="demo-section">
      <Pagination
        v-model:current-page="currentPage2"
        :total-pages="20"
        :show-total="true"
        :page-size="10"
        @change="handlePageChange"
      />
    </div>

    <h3>简洁模式</h3>
    <div class="demo-section">
      <Pagination
        v-model:current-page="currentPage3"
        :total-pages="5"
        :simple="true"
        @change="handlePageChange"
      />
    </div>

    <h3>禁用状态</h3>
    <div class="demo-section">
      <Pagination
        v-model:current-page="currentPage4"
        :total-pages="5"
        disabled
        @change="handlePageChange"
      />
    </div>

    <h3>当前页码</h3>
    <div class="demo-section">
      <p>分页1: 第 {{ currentPage1 }} 页</p>
      <p>分页2: 第 {{ currentPage2 }} 页</p>
      <p>分页3: 第 {{ currentPage3 }} 页</p>
      <p>分页4: 第 {{ currentPage4 }} 页</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '@job-ai/components'

const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
const currentPage4 = ref(1)

const handlePageChange = (page: number) => {
  console.log('页码变更:', page)
}
</script>

<style scoped>
.pagination-demo h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.demo-section p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
