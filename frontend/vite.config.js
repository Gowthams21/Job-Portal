import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
};