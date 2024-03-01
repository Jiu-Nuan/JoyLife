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
  //全局引入variable.scss
  css: {
    preprocessorOptions: {
      scss: {
        charest:false,
        additionalData: `@import "@/assets/scss/variable.scss";`
      }
    }
  },

  server:{
    // host: '192.168.3.12',
    host:'192.168.69.204',
    //port: 5173,
  },
})
