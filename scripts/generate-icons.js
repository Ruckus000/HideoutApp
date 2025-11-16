/**
 * generate-icons.js
 *
 * Converts SVG icon files to PNG format at required sizes for Expo/React Native.
 *
 * Required sizes:
 * - icon.png: 1024x1024 (Universal app icon)
 * - adaptive-icon.png: 1024x1024 (Android adaptive icon foreground)
 * - splash.png: 2048x2048 (Splash screen)
 * - favicon.png: 192x192 (Web favicon)
 */

const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// Paths
const assetsDir = path.join(__dirname, '..', 'assets');

// Icon configurations
const icons = [
  { input: 'icon.svg', output: 'icon.png', width: 1024, height: 1024 },
  { input: 'adaptive-icon.svg', output: 'adaptive-icon.png', width: 1024, height: 1024 },
  { input: 'splash.svg', output: 'splash.png', width: 2048, height: 2048 },
];

// Favicon configuration (smaller size from icon.svg)
const favicon = { input: 'icon.svg', output: 'favicon.png', width: 192, height: 192 };

console.log('🎨 HideOut Kava - Icon Generation\n');
console.log('Converting SVG icons to PNG format...\n');

/**
 * Convert SVG to PNG
 */
function convertSvgToPng(inputPath, outputPath, width, height) {
  try {
    // Read SVG file
    const svg = fs.readFileSync(inputPath, 'utf-8');

    // Render SVG to PNG using Resvg
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: width,
      },
      font: {
        loadSystemFonts: false, // Don't load system fonts for consistency
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Write PNG file
    fs.writeFileSync(outputPath, pngBuffer);

    const fileSize = (pngBuffer.length / 1024).toFixed(2);
    console.log(`✅ ${path.basename(outputPath)} - ${width}x${height}px (${fileSize} KB)`);

    return true;
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

// Convert main icons
let successCount = 0;
let totalCount = icons.length + 1; // +1 for favicon

icons.forEach(({ input, output, width, height }) => {
  const inputPath = path.join(assetsDir, input);
  const outputPath = path.join(assetsDir, output);

  if (convertSvgToPng(inputPath, outputPath, width, height)) {
    successCount++;
  }
});

// Convert favicon (from icon.svg at smaller size)
const faviconInputPath = path.join(assetsDir, favicon.input);
const faviconOutputPath = path.join(assetsDir, favicon.output);
if (convertSvgToPng(faviconInputPath, faviconOutputPath, favicon.width, favicon.height)) {
  successCount++;
}

// Summary
console.log(`\n📊 Conversion Complete: ${successCount}/${totalCount} icons generated\n`);

if (successCount === totalCount) {
  console.log('✅ All icons generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Update app.json to reference the new icon files');
  console.log('2. Run: npm start');
  console.log('3. Test icons on iOS and Android\n');
} else {
  console.log('⚠️  Some icons failed to generate. Check errors above.\n');
  process.exit(1);
}
