import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('src/pages');
const pages = fs.readdirSync(pagesDir).filter((name) =>
  fs.existsSync(path.join(pagesDir, name, 'index.html'))
);

fs.rmSync('dist', { recursive: true, force: true });

for (const page of pages) {
  console.log(`📦 Building: ${page}`);

  execSync(`BUILD_PAGE=${page} vite build`, { stdio: 'inherit' });
}

console.log(`🚀 Deploying to GitHub Pages...`);

execSync(`npx gh-pages -d dist -b gh-pages`, { stdio: 'inherit' });

console.log('\n✅ Done! Your pages are available:');

pages.forEach((page) => {
  console.log(`🔗 https://iwonz.github.io/iwonz/${page}`);
});
