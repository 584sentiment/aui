/**
 * 开发模式入口文件
 */
import { createApp } from 'vue'
import DevApp from './DevApp.vue'

// 导入组件库样式（包含 Tailwind CSS）
import '../styles/main.css'

createApp(DevApp).mount('#app')
