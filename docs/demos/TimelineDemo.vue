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

    <h3>最新内容优先</h3>
    <div class="demo-section">
      <Timeline :items="reversedItems" reverse />
    </div>

    <h3>当前时间</h3>
    <div class="demo-section">
      <p>{{ currentTime }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Timeline } from '@job-ai/components'
import type { TimelineItem } from '@job-ai/components'

const currentTime = ref('')

const basicItems: TimelineItem[] = [
  {
    title: '项目启动',
    date: '2024-01-15',
    description: '项目正式启动，组建开发团队'
  },
  {
    title: '需求分析',
    date: '2024-01-20',
    description: '完成需求收集和分析工作'
  },
  {
    title: '设计阶段',
    date: '2024-02-01',
    description: 'UI/UX 设计完成'
  },
  {
    title: '开发阶段',
    date: '2024-02-15',
    description: '开始核心功能开发'
  }
]

const iconItems: TimelineItem[] = [
  {
    title: '提交代码',
    date: '2024-03-01',
    description: '提交第一版代码',
    type: 'success'
  },
  {
    title: '代码审查',
    date: '2024-03-05',
    description: '完成代码审查和修改',
    type: 'info'
  },
  {
    title: '测试通过',
    date: '2024-03-10',
    description: '所有测试用例通过',
    type: 'warning'
  },
  {
    title: '版本发布',
    date: '2024-03-15',
    description: 'v1.0.0 正式发布',
    type: 'success'
  }
]

const typedItems: TimelineItem[] = [
  {
    title: '收到简历',
    date: '2024-03-20 09:00',
    description: '收到候选人简历',
    type: 'info'
  },
  {
    title: '初试完成',
    date: '2024-03-20 14:00',
    description: '技术面试完成',
    type: 'success'
  },
  {
    title: '复试安排',
    date: '2024-03-21 10:00',
    description: '安排复试时间',
    type: 'warning'
  },
  {
    title: '发送offer',
    date: '2024-03-22 16:00',
    description: '向候选人发送录用通知',
    type: 'success'
  }
]

const reversedItems: TimelineItem[] = [...basicItems].reverse()

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
