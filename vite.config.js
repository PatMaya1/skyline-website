import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar framer-motion en su propio chunk
          'framer-motion': ['framer-motion'],
          // Separar lucide-react en su propio chunk
          'lucide-react': ['lucide-react'],
          // Agrupar componentes grandes
          'components': [
            './src/components/Technologies.jsx',
            './src/components/Hero.jsx',
            './src/components/Process.jsx'
          ]
        }
      }
    },
    // Optimizaciones adicionales con esbuild (más rápido que terser)
    minify: 'esbuild',
    target: 'esnext'
  },
  // Optimizar imágenes y assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif']
})
