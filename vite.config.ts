import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        server: './server/server.ts', // entry point for the server-side code
        client: './src/main.tsx', // entry point for the client-side code
      },
    },
    outDir: 'dist/',
  },
});
