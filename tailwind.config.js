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
        'dropdown': '50',
        'modal': '100',
        'toast': '200'
      }
    }
  },
  plugins: []
}
