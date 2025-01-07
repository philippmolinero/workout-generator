import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
      server: {
        port: process.env.PORT || 3000, // Use environment variable or default to 3000
        host: true // Listen on all network interfaces
      },
      preview: {
        port: process.env.PORT || 3000,
        host: true
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true
      }
    })
