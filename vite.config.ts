import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
