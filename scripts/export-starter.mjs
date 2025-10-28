/* eslint-env node */
/* global process, console */
// Export the starter app as a standalone template zip
// - Copies apps/starter to dist/starter-template
// - Removes dev-only files and node_modules if present
// - Zips to dist/starter-template.zip

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = path.resolve(process.cwd());
const srcDir = path.join(root, 'apps', 'starter');
const outDir = path.join(root, 'dist', 'starter-template');
const outZip = path.join(root, 'dist', 'starter-template.zip');

function rmrf(p) {
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
}

function writeReadme(dest) {
  const readme = `# VN Starter Template\n\nQuickstart:\n\n- npm install\n- npm run dev\n\nThis template expects @vn/* packages to be available in your workspace or installed.\nIf you're distributing to students, consider replacing @vn/* deps with published versions or providing them in the same repo.\n`;
  fs.writeFileSync(path.join(dest, 'README.md'), readme, 'utf8');
}

rmrf(outDir);
fs.mkdirSync(path.dirname(outDir), { recursive: true });
copyDir(srcDir, outDir);
writeReadme(outDir);

// Cleanup any node_modules or caches inside the copied template
rmrf(path.join(outDir, 'node_modules'));
rmrf(outZip);

// Create zip (PowerShell on Windows, zip on others)
try {
  if (process.platform === 'win32') {
    const ps = `Compress-Archive -Path "${outDir}/*" -DestinationPath "${outZip}" -Force`;
    execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: 'inherit' });
  } else {
    execSync(`zip -r -q ${outZip} .`, { cwd: outDir, stdio: 'inherit' });
  }
  console.log(`Created: ${outZip}`);
} catch (e) {
  console.error('Failed to create zip:', e.message);
  process.exit(1);
}
