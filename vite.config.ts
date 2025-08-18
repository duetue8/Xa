import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    global: 'globalThis',
  },
  build: {
    // Enable minification and optimization
    minify: 'terser',
    outDir: 'dist',
    assetsDir: 'assets',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'utils': ['lucide-react', 'react-hot-toast', 'zod', 'xlsx']
        }
      }
    },
    // Enable source maps for production
    sourcemap: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Ensure proper asset handling
    assetsInlineLimit: 4096
  },
  // Enable compression
  server: {
    compression: true,
    host: true,
    port: 5173
  },
  preview: {
    port: 4173,
    host: true
  }
});