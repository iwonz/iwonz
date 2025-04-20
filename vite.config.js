import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

const pagesDir = './src/pages';
const input = {};

fs.readdirSync(pagesDir).forEach((page) => {
  const htmlPath = resolve(__dirname, pagesDir, page, 'index.html');
  if (fs.existsSync(htmlPath)) {
    input[page] = htmlPath;
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input,
    },
  },
});