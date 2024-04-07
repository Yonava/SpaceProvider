import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@/': '/src/',
      '@store': '/src/store',
      '@components': '/src/components',
      '@composables': '/src/composables',
    }
  },
  plugins: [vue()],
  build: {
    outDir: '../server/public'
  }
})