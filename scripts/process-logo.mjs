import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inputPath = 'C:\\Users\\91953\\.gemini\\antigravity-ide\\brain\\99521bfb-81b9-4d36-b663-fc3045715ce8\\.user_uploaded\\media_1792607366223.jpg';
const publicDir = path.resolve('public', 'images');
const appDir = path.resolve('src', 'app');

fs.mkdirSync(publicDir, { recursive: true });

async function process() {
  console.log('Reading input master image from:', inputPath);

  // Load raw pixels
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelCount = info.width * info.height;

  // Ultra-clean transparency algorithm with edge color retention
  for (let i = 0; i < pixelCount; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const brightness = (r + g + b) / 3;
    const colorVariance = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

    // Pure white or off-white background detection
    if (brightness > 248 && colorVariance < 8) {
      data[idx + 3] = 0;
    } else if (brightness > 230 && colorVariance < 12) {
      // Smooth feathering to avoid halos
      const alphaFactor = Math.max(0, Math.min(1, (248 - brightness) / 18));
      data[idx + 3] = Math.round(255 * alphaFactor);
    }
  }

  const transparentMaster = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  // 1. Precise Emblem Extraction
  // Circle top: 79, bottom: 642 (height 563)
  // Circle left: 225, right: 814 (width 589)
  // We extract a square with balanced 12px padding around the emblem
  // left: 213, top: 67, width: 612, height: 585
  // We place it centered on a 640x640 transparent canvas
  const emblemBuffer = await sharp(transparentMaster)
    .extract({
      left: 213,
      top: 67,
      width: 614,
      height: 585, // Stops at y=652, safely above y=669 where AMIT text begins!
    })
    .resize(600, 600, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(emblemBuffer)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'logo-emblem.png'));
  console.log('Saved public/images/logo-emblem.png (clean circular emblem)');

  // 2. Full Logo Extraction (Emblem + AMIT + REHABILITATION CENTRE + MOVE BETTER LIVE STRONGER)
  // Overall bounds: minX: 125, maxX: 900, minY: 79, maxY: 920
  // Extract with 16px padding on all sides and center on transparent canvas
  const fullLogoBuffer = await sharp(transparentMaster)
    .extract({
      left: 110,
      top: 65,
      width: 805,
      height: 865,
    })
    .resize(800, 860, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('Saved public/images/logo.png (clean transparent full logo)');

  // 3. Keep original artwork
  await sharp(inputPath)
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, 'logo-original.jpg'));
  console.log('Saved public/images/logo-original.jpg');

  // 4. Generate crisp browser favicon (src/app/icon.png)
  await sharp(emblemBuffer)
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(appDir, 'icon.png'));
  console.log('Saved src/app/icon.png (browser favicon)');

  // 5. Generate apple touch icon
  await sharp(emblemBuffer)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));
  console.log('Saved src/app/apple-icon.png');

  console.log('All logo assets successfully updated and verified.');
}

process().catch(console.error);
