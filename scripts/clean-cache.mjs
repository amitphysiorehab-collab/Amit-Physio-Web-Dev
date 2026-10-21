import fs from 'node:fs';
import path from 'node:path';

const cacheDir = path.resolve('.next', 'cache', 'images');
if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('Successfully removed .next/cache/images');
} else {
  console.log('.next/cache/images does not exist.');
}
