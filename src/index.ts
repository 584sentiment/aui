/**
 * @job-ai/components 主入口文件
 */
import type { App } from 'vue'

// 导出所有组件
export * from './components'
export * from './design-system/tokens'
export * from './design-system/themes'

// 导出所有 composables
export * from './composables'

// 导出样式
import './styles/main.css'

// 全局注册插件
export default {
  install(app: App) {
    // 可以在这里全局注册组件
    // app.component('Button', Button)
    // ...
  }
}
