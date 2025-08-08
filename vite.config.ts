import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true,
     hmr: {
      protocol: 'ws',
      host: 'qqbaob-ip-177-53-214-5.tunnelmole.net',
      port: 80,
    },
  },
})
