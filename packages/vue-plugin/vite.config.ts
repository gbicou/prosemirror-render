import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'node:path'
import nodeExternals from 'rollup-plugin-node-externals'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
  },
})
