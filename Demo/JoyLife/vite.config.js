import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    host: '192.168.0.103',
    //port: 5173,
  },
  //全局引入variable.scss
  css: {
    preprocessorOptions: {
      scss: {
        charest:false,
        additionalData: `@import "@/assets/scss/variable.scss";`
      }
    }
  },
})
