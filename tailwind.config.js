/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts}",
    "./docs/**/*.{md,vue}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
          dark: '#1E40AF'
        },
        secondary: '#3B82F6',
        cta: '#F97316',
        ctaHover: '#EA580C',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: {
          DEFAULT: '#1E293B',
          secondary: '#64748B',
          light: '#94A3B8'
        },
        border: '#E2E8F0',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B'
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
      borderRadius: {
        'xl': '1rem',
        'lg': '0.75rem',
        'md': '0.5rem'
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.12)'
      },
      zIndex: {
        // 与 src/design-system/tokens.ts 中的 zIndex 定义保持一致
        // 层级参考主流 UI 库（Element Plus、Ant Design、shadcn/ui）
        'dropdown': '2000',      // 下拉菜单
        'sticky': '2010',         // 吸顶元素
        'fixed': '2020',          // 固定定位
        'modal-backdrop': '3000', // 模态框遮罩
        'modal': '3010',          // 模态框内容
        'popover': '4000',        // 气泡卡片
        'tooltip': '5000'         // 提示框（最高层级）
      }
    }
  },
  plugins: []
}
