import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    proxy: {
      '/api': { // forward API requests to the backend server
        target: 'http://localhost:3001', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
