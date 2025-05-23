import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const GITHUB_REPO_NAME = 'iwonz';

const page = process.env.BUILD_PAGE;
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig(() => {
  if (!page && !isDev) {
    throw new Error('❌ BUILD_PAGE не задан для сборки!');
  }

  const pagePath = page ? `src/pages/${page}/index.html` : undefined;
  const inputPath =
    pagePath && fs.existsSync(pagePath) ? path.resolve(__dirname, pagePath) : undefined;

  return {
    plugins: [react()],
    root: isDev ? null : `src/pages/${page}`,
    base: page ? `/${GITHUB_REPO_NAME}/${page}/` : '/',
    build: {
      outDir: page ? path.resolve(__dirname, `dist/${page}`) : 'dist',
      rollupOptions: inputPath ? { input: inputPath } : {},
      emptyOutDir: false,
    },
    server: {
      open: true,
      // fs: {
      //   allow: [path.resolve(__dirname)],
      // },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
