import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'node:path'
import nodeExternals from 'rollup-plugin-node-externals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
    {
      ...nodeExternals(),
      enforce: 'pre',
    },
  ],
  build: {
    target: 'esnext',
    copyPublicDir: false,
    lib: {
      entry: path.join(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
  },
})
