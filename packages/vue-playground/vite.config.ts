import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueRouter(), vue()],
  resolve: {
    alias: {
      '#examples': path.join(import.meta.dirname, '../../examples'),
    },
  },
})
