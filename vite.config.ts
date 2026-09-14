import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/alive-inside-caregiver/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
