import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@job-ai/components',
  description: 'Job-Ai 组件库文档',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/Button' },
      { text: '在线演示', link: 'http://localhost:5173/demo.html' }  // 使用绝对 URL
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '设计令牌', link: '/guide/design-tokens' }
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/Button' },
          { text: 'Input 输入框', link: '/components/Input' },
          { text: 'Switch 开关', link: '/components/Switch' }
        ]
      },
      {
        text: '表单组件',
        items: [
          { text: 'Select 选择器', link: '/components/Select' },
          { text: 'DatePicker 日期选择', link: '/components/DatePicker' },
          { text: 'Form 表单', link: '/components/Form' }
        ]
      },
      {
        text: '反馈组件',
        items: [
          { text: 'Modal 对话框', link: '/components/Modal' }
        ]
      },
      {
        text: '导航组件',
        items: [
          { text: 'Tabs 标签页', link: '/components/Tabs' },
          { text: 'Pagination 分页', link: '/components/Pagination' }
        ]
      },
      {
        text: '数据展示',
        items: [
          { text: 'Timeline 时间轴', link: '/components/Timeline' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/job-ai/components' }
    ]
  }
})
