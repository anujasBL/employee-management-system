import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@/components': path.resolve('./src/components'),
      '@/hooks': path.resolve('./src/hooks'),
      '@/services': path.resolve('./src/services'),
      '@/types': path.resolve('./src/types'),
      '@/utils': path.resolve('./src/utils'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
  define: {
    __DEV__: '"true"',
    'process.env.NODE_ENV': '"development"',
  },
})
