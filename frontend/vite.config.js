import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true
  },
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        format: 'es',
        sourcemap: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
});