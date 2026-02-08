import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JobAiComponents',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@headlessui/vue', '@vuelidate/core', '@vuelidate/validators'],
      output: {
        globals: {
          vue: 'Vue',
          '@headlessui/vue': 'HeadlessUI'
        }
      }
    },
    cssCodeSplit: false
  }
})
