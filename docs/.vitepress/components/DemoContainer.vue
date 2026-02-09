<script setup lang="ts">
import { ref, computed, resolveComponent } from 'vue'

interface Props {
  source: string      // 渲染后的代码 HTML
  path: string        // 示例文件路径
  rawSource: string   // 原始源代码（URL 编码）
  description?: string // 描述文字（URL 编码）
}

const props = withDefaults(defineProps<Props>(), {
  description: ''
})

const showCode = ref(false)
const copySuccess = ref(false)

// 转换路径为组件名（例如：button/basic -> button-basic）
const componentName = computed(() => {
  return props.path.replace(/\//g, '-')
})

// 动态解析组件
const demoComponent = computed(() => {
  return resolveComponent(componentName.value)
})

// 解码 URL 编码的源代码
const decodedSource = computed(() => {
  try {
    return decodeURIComponent(props.rawSource)
  } catch {
    return props.rawSource
  }
})

// 解码描述文字
const decodedDescription = computed(() => {
  try {
    return decodeURIComponent(props.description)
  } catch {
    return props.description
  }
})

// 切换代码显示
const toggleCode = () => {
  showCode.value = !showCode.value
}

// 复制代码
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(decodedSource.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div class="demo-container">
    <!-- 描述文字 -->
    <div
      v-if="decodedDescription"
      class="demo-description"
      v-html="decodedDescription"
    />

    <!-- Demo 预览区域 -->
    <div class="demo-preview-wrapper">
      <div class="demo-preview" :class="{ 'with-padding': !showCode }">
        <component :is="demoComponent" v-if="demoComponent && typeof demoComponent !== 'string'" />
        <div v-else class="demo-error">
          组件未找到: {{ componentName }}
        </div>
      </div>

      <!-- 操作按钮栏 -->
      <div class="demo-actions">
        <button
          class="demo-action-btn"
          :class="{ 'copied': copySuccess }"
          @click="copyCode"
          title="复制代码"
        >
          <svg
            v-if="!copySuccess"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="btn-text">{{ copySuccess ? '已复制' : '复制代码' }}</span>
        </button>

        <button
          class="demo-action-btn"
          @click="toggleCode"
          :title="showCode ? '隐藏源代码' : '查看源代码'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline v-if="!showCode" points="16 18 22 12 16 6"></polyline>
            <polyline v-if="!showCode" points="8 6 2 12 8 18"></polyline>
            <polyline v-else points="18 15 12 9 6 15"></polyline>
          </svg>
          <span class="btn-text">{{ showCode ? '隐藏代码' : '查看代码' }}</span>
        </button>
      </div>
    </div>

    <!-- 源代码显示区域 -->
    <div v-if="showCode" class="demo-source">
      <pre class="demo-source-code"><code v-html="source"></code></pre>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  margin: 16px 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.demo-description {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.demo-preview-wrapper {
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-preview {
  padding: 0;
  transition: padding 0.3s ease;
}

.demo-preview.with-padding {
  padding: 24px;
}

.demo-error {
  padding: 24px;
  color: var(--vp-c-danger-1);
  font-size: 14px;
  text-align: center;
}

.demo-actions {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  justify-content: flex-end;
}

.demo-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-action-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.demo-action-btn.copied {
  color: var(--vp-c-success-1);
  border-color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}

.demo-action-btn svg {
  flex-shrink: 0;
}

.demo-source {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.demo-source-code {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
}

.demo-source-code code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

/* 深色模式适配 */
.dark .demo-container {
  border-color: var(--vp-c-border);
}

.dark .demo-description {
  background: var(--vp-c-bg-soft);
}

.dark .demo-actions {
  background: var(--vp-c-bg-soft);
}

.dark .demo-source {
  background: var(--vp-c-bg-soft);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .demo-preview.with-padding {
    padding: 16px;
  }

  .demo-actions {
    flex-direction: column;
    gap: 8px;
  }

  .demo-action-btn {
    width: 100%;
    justify-content: center;
  }

  .btn-text {
    display: inline;
  }
}
</style>
