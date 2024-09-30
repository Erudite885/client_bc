import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // Forces IPv4
    port: 3000, // Change to a different port if desired
    strictPort: true, // Ensures Vite fails if the port is already in use
  },
});
