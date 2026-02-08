import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-three': ['three'],
          'vendor-d3': ['d3'],
          'vendor-motion': ['framer-motion', 'motion'],
          'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          // Separate heavy components
          'components-3d': ['./src/app/components/ui/web-gl-shader.tsx', './src/app/components/ui/wireframe-dotted-globe.tsx'],
        }
      }
    },
    // Increase chunk size warning limit since we're optimizing
    chunkSizeWarningLimit: 600,
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize for production
    minify: 'esbuild', // Use esbuild instead of terser for faster builds
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false
    }
  }
})