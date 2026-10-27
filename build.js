const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

// Clean and recreate dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy all static assets and pages to dist
const itemsToCopy = [
  'index.html',
  'about.html',
  'blog.html',
  'career.html',
  'contact.html',
  'projects.html',
  'services.html',
  'privacy.html',
  'terms.html',
  'lead.html',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'llms-full.txt',
  'site.webmanifest',
  'og-image.jpg',
  'favicon.ico',
  'css',
  'js',
  'images',
  'blog'
];

for (const item of itemsToCopy) {
  const src = path.join(rootDir, item);
  const dest = path.join(distDir, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copied ${item} -> dist/${item}`);
  }
}

console.log('Fitscalez build successful: dist/ is ready.');
