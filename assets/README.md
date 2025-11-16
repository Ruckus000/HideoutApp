# Assets Directory

This directory contains all static assets for the HideOut Kava app.

## Required Assets

To run the app, you'll need to add the following image files:

### App Icons and Splash

- `icon.png` - App icon (1024x1024 px)
- `adaptive-icon.png` - Android adaptive icon (1024x1024 px)
- `splash.png` - Splash screen image (1284x2778 px recommended)
- `favicon.png` - Web favicon (48x48 px)

### Placeholder Images

You can generate these using Expo:

```bash
# This will create default icons and splash screens
expo install expo-asset
```

Or create custom assets that match the HideOut Kava branding:
- Primary color: #8B4513 (Kava brown)
- Accent color: #D4AF37 (Gold)
- Background: #1a1a1a (Dark)

## Directory Structure

Organize assets by type:

```
assets/
├── images/          # Product images, logos, etc.
├── fonts/           # Custom font files
├── icons/           # Icon sets
├── icon.png
├── adaptive-icon.png
├── splash.png
└── favicon.png
```

## Adding New Assets

1. Place image files in the appropriate subdirectory
2. Import using relative paths:

```typescript
import logo from '../assets/images/logo.png';
```

Or use Expo's asset system:

```typescript
import { Image } from 'expo-image';

<Image
  source={require('../assets/images/logo.png')}
  style={{ width: 100, height: 100 }}
/>
```

## Image Optimization

- Use PNG for images with transparency
- Use JPEG for photos
- Compress images before adding to the project
- Consider using @1x, @2x, @3x variants for different screen densities

## Fonts

To add custom fonts:

1. Add font files to `assets/fonts/`
2. Load fonts in App.tsx using `expo-font`:

```typescript
import * as Font from 'expo-font';

await Font.loadAsync({
  'CustomFont-Regular': require('./assets/fonts/CustomFont-Regular.ttf'),
});
```
