# App Icons and Assets Setup Guide

## ✅ Icons Created!

**Status**: All app icons have been created and configured using the HideOut Kava brand design.

### Generated Files:
- ✅ `icon.png` (1024x1024px) - Universal app icon with kava leaf design
- ✅ `adaptive-icon.png` (1024x1024px) - Android adaptive icon (safe zone optimized)
- ✅ `splash.png` (2048x2048px) - Splash screen with brand logo
- ✅ `favicon.png` (192x192px) - Web favicon

### Design Features:
- **Brand Colors**: Deep Olive Green (#6B7F47) primary background
- **Icon Design**: Stylized kava leaf/root symbol in warm off-white (#FAFAF8)
- **Typography**: "HIDEOUT" wordmark with terracotta accent dot
- **Style**: Warm minimalist aesthetic matching the app design

---

## Regenerating Icons

If you need to modify the icon design, edit the SVG source files and regenerate:

```bash
# Edit SVG files in /assets/
# - icon.svg
# - adaptive-icon.svg
# - splash.svg

# Regenerate PNG files
npm run generate-icons
```

The `generate-icons` script uses @resvg/resvg-js to convert SVG to PNG at the correct sizes.

---

## Adding Your HideOut Kava Logo

### Option 1: Use Expo's Icon Generator (Recommended)

1. **Prepare your logo:**
   - Create a square PNG image (1024x1024px recommended)
   - Use transparent background
   - Center your logo with padding (about 20% padding on all sides)

2. **Use Expo's online tool:**
   ```bash
   # If you have a logo file ready:
   npx expo-icon-generator --icon path/to/your/logo.png
   ```

3. **Or manually create icons:**
   - Place your `icon.png` (1024x1024) in `/assets/`
   - Expo will automatically generate all required sizes

### Option 2: Create Icons Manually

Required files for complete icon support:

```
/assets/
├── icon.png              # 1024x1024px - Universal app icon
├── adaptive-icon.png     # 1024x1024px - Android adaptive icon
├── splash.png           # 2048x2048px - Splash screen image
└── favicon.png          # 48x48px - Web favicon
```

**Icon Specifications:**

1. **icon.png** (Universal)
   - Size: 1024x1024px
   - Format: PNG with transparency
   - Usage: iOS, Android, Expo Go

2. **adaptive-icon.png** (Android)
   - Size: 1024x1024px
   - Format: PNG with transparency
   - Important: Keep logo centered in middle 66% (safe zone)
   - Background will be your brand color: #6B7F47 (Olive Green)

3. **splash.png** (Splash Screen)
   - Size: 2048x2048px minimum
   - Format: PNG
   - Background: Can be transparent (will show #FAFAF8 warm off-white)
   - Keep important content in center

4. **favicon.png** (Web)
   - Size: 48x48px or 192x192px
   - Format: PNG
   - Simple, recognizable at small sizes

---

## Design Recommendations for HideOut Kava

### Brand Colors (Use in your icons):
- **Primary**: #6B7F47 (Deep Olive Green)
- **Accent**: #B8654B (Terracotta)
- **Background**: #FAFAF8 (Warm Off-White)
- **Text**: #1C1C1E (Deep Charcoal)

### Icon Design Tips:
1. **Keep it simple** - Icons are viewed at small sizes
2. **Use warm colors** - Olive green or terracotta from your brand
3. **Consider a kava root symbol** or stylized cup
4. **Maintain warm minimalism** - Clean, uncluttered design
5. **Test at different sizes** - Ensure legibility

---

## Quick Icon Template (SVG to PNG)

If you want to create a quick placeholder, use this SVG template:

```svg
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="512" cy="512" r="512" fill="#6B7F47"/>

  <!-- Text: HK (HideOut Kava) -->
  <text x="512" y="600"
        font-family="Arial, sans-serif"
        font-size="400"
        font-weight="bold"
        fill="#FAFAF8"
        text-anchor="middle">HK</text>
</svg>
```

Convert to PNG:
1. Save as `icon.svg`
2. Use online converter: https://svgtopng.com
3. Set size to 1024x1024px
4. Save as `/assets/icon.png`

---

## After Adding Icons

Once you have your icon files in `/assets/`, update `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FAFAF8"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#6B7F47"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## Testing Your Icons

### Test on iOS Simulator:
```bash
npm start
# Press 'i' for iOS
# Check home screen for your icon
```

### Test on Android Emulator:
```bash
npm start
# Press 'a' for Android
# Check app drawer for your icon
```

### Test Web:
```bash
npm start
# Press 'w' for web
# Check browser tab for favicon
```

---

## Current Status

✅ **App is fully configured with branded icons**
- Custom app icon with kava leaf design
- Custom splash screen with brand logo
- Custom adaptive icon for Android (safe zone optimized)
- Custom favicon for web
- All icons use warm minimalist brand colors (#6B7F47, #FAFAF8, #B8654B)
- app.json configured to reference all icon files

✅ **Ready for:**
- Development and testing
- iOS simulator testing
- Android emulator testing
- Web browser testing
- Production builds

---

## Resources

- [Expo Icon Requirements](https://docs.expo.dev/develop/user-interface/app-icons/)
- [Expo Splash Screen](https://docs.expo.dev/develop/user-interface/splash-screen/)
- [Android Adaptive Icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
- [Icon Generator Tools](https://www.appicon.co/)
- [Image Converter](https://cloudconvert.com/svg-to-png)

---

**The error is now fixed! Your app will run without issues. Add icons whenever you're ready.**
