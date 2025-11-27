import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173, // o 5173, el que prefieras
    proxy: {
      // Todas las llamadas que empiecen por /api/ las mandamos al backend real
      '/api': {
        target: 'https://sistec-read.atwebpages.com',        // tu dominio AwardSpace
        changeOrigin: true,
        secure: true,                                       // valida certificado SSL
        rewrite: (path) => path.replace(/^\/api/, '/public_html/backend/api')
        // Ejemplo:
        //  localhost:3000/api/libros.php
        //  → https://sistec-read.atwebpages.com/public_html/backend/api/libros.php
      }
    }
  }
})