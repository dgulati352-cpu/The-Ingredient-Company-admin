const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// High-end master SVG for The Ingredient Company
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient: Deep slate / midnight emerald -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1322"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#062e24"/>
    </linearGradient>

    <!-- Outer Ambient Glow -->
    <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#059669" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>

    <!-- Primary Emerald Leaf Gradient -->
    <linearGradient id="leafGrad" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="35%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>

    <!-- Essence Droplet Gradient -->
    <linearGradient id="dropGrad" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="45%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>

    <!-- Center Sprout / Core Essence -->
    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>

    <!-- Sparkle / Star Essence -->
    <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#6ee7b7"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>

    <!-- Soft Drop Shadow -->
    <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#10b981" flood-opacity="0.3"/>
    </filter>

    <filter id="glowOnly" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background Squircle Container -->
  <rect width="512" height="512" rx="116" fill="url(#bgGrad)"/>
  
  <!-- Subtle Border Highlights -->
  <rect x="2" y="2" width="508" height="508" rx="114" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="3"/>
  <rect x="6" y="6" width="500" height="500" rx="110" fill="none" stroke="url(#leafGrad)" stroke-width="1.5" stroke-opacity="0.35"/>

  <!-- Radial Glow Behind Emblem -->
  <circle cx="256" cy="256" r="210" fill="url(#ambientGlow)"/>

  <!-- Master Emblem -->
  <g filter="url(#shadowFilter)">
    <!-- Left Botanical Ingredient Leaf -->
    <path d="M 256 100 
             C 256 100 132 165 130 286 
             C 128 356 182 412 256 412 
             C 230 376 226 318 256 264 
             C 278 226 308 202 328 184 
             C 292 152 270 124 256 100 Z" 
          fill="url(#leafGrad)"/>

    <!-- Right Pure Essence Droplet -->
    <path d="M 256 100 
             C 276 130 310 172 358 218 
             C 392 252 400 298 384 342 
             C 366 390 316 414 256 412 
             C 286 382 298 340 282 294 
             C 270 260 250 234 232 214 
             C 246 172 253 132 256 100 Z" 
          fill="url(#dropGrad)" 
          opacity="0.94"/>

    <!-- Delicate Center Sprout Harmony -->
    <path d="M 256 412 
             C 256 352 278 298 318 250 
             C 288 280 268 320 260 372 Z" 
          fill="url(#coreGrad)" 
          opacity="0.85"/>

    <!-- Luminous Sparkle / Quality Seal (Top Right) -->
    <path d="M 378 128 
             Q 378 152 402 152 
             Q 378 152 378 176 
             Q 378 152 354 152 
             Q 378 152 378 128 Z" 
          fill="url(#sparkleGrad)" 
          filter="url(#glowOnly)"/>

    <!-- Micro Purity Sparkle (Left) -->
    <path d="M 152 192 
             Q 152 205 165 205 
             Q 152 205 152 218 
             Q 152 205 139 205 
             Q 152 205 152 192 Z" 
          fill="#a7f3d0" 
          opacity="0.8"/>
  </g>
</svg>`;

// Standalone Emblem SVG without background (ideal for in-app headers, navbar, etc.)
const emblemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="emblemLeafGrad" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="35%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="emblemDropGrad" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="45%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="emblemCoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="emblemSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
  </defs>
  <g>
    <path d="M 256 100 C 256 100 132 165 130 286 C 128 356 182 412 256 412 C 230 376 226 318 256 264 C 278 226 308 202 328 184 C 292 152 270 124 256 100 Z" fill="url(#emblemLeafGrad)"/>
    <path d="M 256 100 C 276 130 310 172 358 218 C 392 252 400 298 384 342 C 366 390 316 414 256 412 C 286 382 298 340 282 294 C 270 260 250 234 232 214 C 246 172 253 132 256 100 Z" fill="url(#emblemDropGrad)" opacity="0.94"/>
    <path d="M 256 412 C 256 352 278 298 318 250 C 288 280 268 320 260 372 Z" fill="url(#emblemCoreGrad)" opacity="0.85"/>
    <path d="M 378 128 Q 378 152 402 152 Q 378 152 378 176 Q 378 152 354 152 Q 378 152 378 128 Z" fill="url(#emblemSparkle)"/>
    <path d="M 152 192 Q 152 205 165 205 Q 152 205 152 218 Q 152 205 139 205 Q 152 205 152 192 Z" fill="#a7f3d0" opacity="0.8"/>
  </g>
</svg>`;

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Write SVG files
fs.writeFileSync(path.join(assetsDir, 'logo.svg'), svgContent);
fs.writeFileSync(path.join(assetsDir, 'emblem.svg'), emblemSvg);
console.log('Saved logo.svg and emblem.svg');

async function buildIcons() {
  const svgBuffer = Buffer.from(svgContent);

  await sharp(svgBuffer)
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(assetsDir, 'icon-512.png'));
  console.log('Generated icon-512.png');

  await sharp(svgBuffer)
    .resize(192, 192)
    .png({ quality: 100 })
    .toFile(path.join(assetsDir, 'icon-192.png'));
  console.log('Generated icon-192.png');

  await sharp(svgBuffer)
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(assetsDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  await sharp(svgBuffer)
    .resize(64, 64)
    .png({ quality: 100 })
    .toFile(path.join(assetsDir, 'favicon.png'));
  console.log('Generated favicon.png');
}

buildIcons().catch(err => {
  console.error('Error building icons:', err);
  process.exit(1);
});
