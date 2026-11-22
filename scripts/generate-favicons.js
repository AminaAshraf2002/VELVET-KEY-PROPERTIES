const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7A1D30"/>
      <stop offset="50%" stop-color="#6D1A2B"/>
      <stop offset="100%" stop-color="#4A121E"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9F2"/>
      <stop offset="50%" stop-color="#E8DCC8"/>
      <stop offset="100%" stop-color="#D0C0A6"/>
    </linearGradient>
  </defs>
  <!-- Rounded Luxury Tile -->
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <!-- Gold Border -->
  <rect x="28" y="28" width="456" height="456" rx="88" fill="none" stroke="url(#gold)" stroke-width="10" stroke-opacity="0.4"/>
  <!-- Crown Diamond Accent -->
  <path d="M256 64 L276 94 L256 124 L236 94 Z" fill="url(#gold)"/>
  <!-- Velvet Key Monogram VK -->
  <text x="256" y="348" font-size="220" font-weight="600" letter-spacing="10" fill="url(#gold)" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif">VK</text>
  <!-- Divider -->
  <line x1="140" y1="392" x2="372" y2="392" stroke="url(#gold)" stroke-width="4" stroke-opacity="0.6"/>
  <!-- Velvet Key Text -->
  <text x="256" y="436" font-size="36" font-weight="bold" letter-spacing="14" fill="url(#gold)" fill-opacity="0.9" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">VELVET KEY</text>
</svg>`;

async function run() {
  fs.writeFileSync('public/icon.svg', svg);
  fs.writeFileSync('app/icon.svg', svg);
  console.log('Wrote public/icon.svg and app/icon.svg');

  const png32 = await sharp(Buffer.from(svg)).resize(48, 48).png().toBuffer();

  // Construct standard ICO with 48x48 PNG
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // ICO type
  icoHeader.writeUInt16LE(1, 4); // 1 image
  icoHeader.writeUInt8(48, 6);   // width
  icoHeader.writeUInt8(48, 7);   // height
  icoHeader.writeUInt8(0, 8);    // palette
  icoHeader.writeUInt8(0, 9);    // reserved
  icoHeader.writeUInt16LE(1, 10); // color planes
  icoHeader.writeUInt16LE(32, 12); // bpp
  icoHeader.writeUInt32LE(png32.length, 14); // image size
  icoHeader.writeUInt32LE(22, 18); // offset

  const icoBuf = Buffer.concat([icoHeader, png32]);
  fs.writeFileSync('app/favicon.ico', icoBuf);
  fs.writeFileSync('public/favicon.ico', icoBuf);
  console.log('Wrote app/favicon.ico and public/favicon.ico');

  await sharp(Buffer.from(svg)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(Buffer.from(svg)).resize(32, 32).png().toFile('public/icon-32.png');
  await sharp(Buffer.from(svg)).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(Buffer.from(svg)).resize(512, 512).png().toFile('public/icon-512.png');
  console.log('Generated PNG icons: apple-touch-icon, icon-32, icon-192, icon-512');
}

run().catch(console.error);
