<template>
  <div class="timeline-demo">
    <h3>基础时间轴</h3>
    <div class="demo-section">
      <Timeline :items="basicItems" />
    </div>

    <h3>带图标的时间轴</h3>
    <div class="demo-section">
      <Timeline :items="iconItems" />
    </div>

    <h3>不同类型</h3>
    <div class="demo-section">
      <Timeline :items="typedItems" />
    </div>

    <h3>不同状态</h3>
    <div class="demo-section">
      <Timeline :items="statusItems" />
    </div>

    <h3>当前时间</h3>
    <div class="demo-section">
      <p>{{ currentTime }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Timeline } from 'full-aui'
import type { TimelineItem } from 'full-aui'

const currentTime = ref('')

const basicItems: TimelineItem[] = [
  {
    id: 1,
    title: '项目启动',
    timestamp: '2024-01-15',
    description: '项目正式启动，组建开发团队'
  },
  {
    id: 2,
    title: '需求分析',
    timestamp: '2024-01-20',
    description: '完成需求收集和分析工作'
  },
  {
    id: 3,
    title: '设计阶段',
    timestamp: '2024-02-01',
    description: 'UI/UX 设计完成'
  },
  {
    id: 4,
    title: '开发阶段',
    timestamp: '2024-02-15',
    description: '开始核心功能开发'
  }
]

const iconItems: TimelineItem[] = [
  {
    id: 1,
    title: '提交代码',
    timestamp: '2024-03-01',
    description: '提交第一版代码',
    status: 'success'
  },
  {
    id: 2,
    title: '代码审查',
    timestamp: '2024-03-05',
    description: '完成代码审查和修改',
    status: 'info'
  },
  {
    id: 3,
    title: '测试通过',
    timestamp: '2024-03-10',
    description: '所有测试用例通过',
    status: 'warning'
  },
  {
    id: 4,
    title: '版本发布',
    timestamp: '2024-03-15',
    description: 'v1.0.0 正式发布',
    status: 'success'
  }
]

const typedItems: TimelineItem[] = [
  {
    id: 1,
    title: '收到简历',
    timestamp: '2024-03-20 09:00',
    description: '收到候选人简历',
    status: 'info'
  },
  {
    id: 2,
    title: '初试完成',
    timestamp: '2024-03-20 14:00',
    description: '技术面试完成',
    status: 'success'
  },
  {
    id: 3,
    title: '复试安排',
    timestamp: '2024-03-21 10:00',
    description: '安排复试时间',
    status: 'warning'
  },
  {
    id: 4,
    title: '发送offer',
    timestamp: '2024-03-22 16:00',
    description: '向候选人发送录用通知',
    status: 'success'
  }
]

const statusItems: TimelineItem[] = [
  {
    id: 1,
    title: '成功状态',
    timestamp: '2024-03-20 09:00',
    description: '操作成功完成',
    status: 'success'
  },
  {
    id: 2,
    title: '信息状态',
    timestamp: '2024-03-20 10:00',
    description: '提示信息',
    status: 'info'
  },
  {
    id: 3,
    title: '警告状态',
    timestamp: '2024-03-20 11:00',
    description: '需要注意的警告',
    status: 'warning'
  },
  {
    id: 4,
    title: '危险状态',
    timestamp: '2024-03-20 12:00',
    description: '错误或失败的操作',
    status: 'danger'
  }
]

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN')
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.timeline-demo h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
