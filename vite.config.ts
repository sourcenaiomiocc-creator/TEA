import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Importante para o GitHub Pages funcionar em subdiretórios
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  define: {
    'process.env': {} // Fallback simples para evitar erros com process.env
  }
});