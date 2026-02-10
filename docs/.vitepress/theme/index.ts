import DefaultTheme from 'vitepress/theme'
import DemoContainer from '../components/DemoContainer.vue'
import type { Theme } from 'vitepress'
import 'highlight.js/styles/github-dark.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 DemoContainer
    app.component('DemoContainer', DemoContainer)

    // 动态导入并注册所有示例组件
    const exampleModules = import.meta.glob('../../examples/**/*.vue', {
      eager: true
    })

    for (const path in exampleModules) {
      const component = (exampleModules[path] as any).default
      if (component) {
        // 将路径转换为组件名（连字符）
        // button/basic.vue -> button-basic
        const componentName = path
          .replace('../../examples/', '')
          .replace('.vue', '')
          .replace(/\//g, '-')

        app.component(componentName, component)
      }
    }
  }
} as Theme
