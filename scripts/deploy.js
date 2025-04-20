import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('src/pages');
const distDir = path.resolve('dist');
const pages = fs.readdirSync(pagesDir).filter((name) =>
  fs.existsSync(path.join(pagesDir, name, 'index.html'))
);

// Чистим dist
fs.rmSync(distDir, { recursive: true, force: true });

for (const page of pages) {
  console.log(`📦 Building: ${page}`);

  // Сборка
  execSync(`BUILD_PAGE=${page} vite build`, { stdio: 'inherit' });

  // Копирование статических файлов из src/pages/<page>/public/ (если есть)
  const pagePublicDir = path.join(pagesDir, page, 'public');
  const outputDir = path.join(distDir, page);

  if (fs.existsSync(pagePublicDir)) {
    console.log(`📁 Copying static assets for "${page}"...`);

    const files = fs.readdirSync(pagePublicDir);
    for (const file of files) {
      const srcPath = path.join(pagePublicDir, file);
      const destPath = path.join(outputDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`   → ${file}`);
    }
  }
}

console.log(`🚀 Deploying to GitHub Pages...`);

execSync(`npx gh-pages -d dist -b gh-pages`, { stdio: 'inherit' });

console.log('\n✅ Done! Your pages are available:');
pages.forEach((page) => {
  console.log(`🔗 https://iwonz.github.io/iwonz/${page}/`);
});
