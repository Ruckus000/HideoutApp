# Responsive Design Standards

## Overview

This document defines the responsive design system for the HideOut Kava app. Our hybrid approach combines **percentage-based layouts with Flexbox** for structure and **react-native-size-matters** for typography and icon scaling.

**Core Principle:**
> "Layouts respond with flex/percentages. Font and icon sizes scale with react-native-size-matters, but only via theme tokens."

This system ensures components look great across all device types, from iPhone SE to iPad Pro.

---

## Decision Rules: When to Use What

### Layout (widths/heights/margins/padding)

**✅ DO:**
- Use Flexbox (`flex`, `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`)
- Use percentages for explicit sizing (e.g., `width: '48%'` for grid cards)
- Use `useResponsive()` hook for device-specific layouts

**❌ DON'T:**
- Hard-code pixel widths/heights unless absolutely necessary
- Use scaling functions (moderateScale) for layout dimensions

**Rule of thumb:**
> If it's about how things are laid out on the screen → use Flexbox/percentages, not scaling.

---

### Typography (font sizes, line heights)

**✅ DO:**
- ALWAYS use `theme.typography.*` tokens
- Font sizes are computed using `moderateScale()` inside the theme

**❌ DON'T:**
- Call `moderateScale()` directly in components
- Hard-code font sizes like `fontSize: 16`

**Rule of thumb:**
> Text size? Use `theme.typography.*`, which already uses moderateScale.

**Examples:**
```javascript
// ✅ CORRECT
<Text style={theme.typography.styles.h2}>Heading</Text>
<Text style={theme.typography.styles.body}>Body text</Text>

// ❌ INCORRECT
<Text style={{ fontSize: 32, fontWeight: 'bold' }}>Heading</Text>
<Text style={{ fontSize: moderateScale(15) }}>Body text</Text>
```

---

### Icons & Visual Elements

**✅ DO:**
- ALWAYS use `icon.*` tokens from theme (xs, sm, md, lg, xl, xxl)
- Icon sizes use `moderateScale()` under the hood

**❌ DON'T:**
- Hard-code icon sizes like `size={24}`
- Call `moderateScale()` directly for icons

**Rule of thumb:**
> Icon size? Use `theme.icon.*`, not raw numbers or direct moderateScale.

**Examples:**
```javascript
import { icon } from '../theme';

// ✅ CORRECT
<Feather name="star" size={icon.md} />
<Ionicons name="cart" size={icon.lg} />

// ❌ INCORRECT
<Feather name="star" size={24} />
<Ionicons name="cart" size={moderateScale(22)} />
```

---

### Responsive Logic (breakpoints, device type)

**✅ DO:**
- Use `useResponsive()` hook for device-aware layouts
- Use `wp(percent)` and `hp(percent)` helpers for percentage-based calculations

**❌ DON'T:**
- Manually use `Dimensions.get()` in components
- Import `useWindowDimensions` directly (use our hook instead)

**Rule of thumb:**
> If component behavior/layout needs to change based on device size → use `useResponsive()`.

**Examples:**
```javascript
import { useResponsive } from '../hooks/useResponsive';

const MyComponent = () => {
  const { isTablet, wp, isSmallPhone } = useResponsive();

  // ✅ Adaptive layout
  const numColumns = isTablet ? 3 : 2;

  // ✅ Percentage-based sizing
  const cardWidth = isSmallPhone ? wp(100) : wp(48);

  return (
    <View style={{ width: `${cardWidth}%` }}>
      {/* ... */}
    </View>
  );
};
```

---

## Available Typography Tokens

### Predefined Styles
Use these complete style objects for common text types:

```javascript
theme.typography.styles.h1          // Hero/Display headings
theme.typography.styles.h2          // Large headers
theme.typography.styles.h3          // Section headers
theme.typography.styles.h4          // Card headers
theme.typography.styles.h5          // Subheaders
theme.typography.styles.h6          // Small headings

theme.typography.styles.body        // Standard body text
theme.typography.styles.bodyLarge   // Large body text
theme.typography.styles.bodySmall   // Small body text

theme.typography.styles.bodyBold    // Bold body text
theme.typography.styles.bodyMedium  // Medium weight body text

theme.typography.styles.button      // Button text
theme.typography.styles.buttonLarge // Large button text
theme.typography.styles.buttonSmall // Small button text

theme.typography.styles.caption     // Captions and helper text
theme.typography.styles.label       // Form labels
theme.typography.styles.finePrint   // Fine print, footnotes
```

### Font Size Scale
For custom compositions:

```javascript
theme.typography.sizes.xxxl  // 40px - Hero/Display
theme.typography.sizes.xxl   // 32px - Large headers
theme.typography.sizes.xl    // 28px - Section headers
theme.typography.sizes.lg    // 24px - Card headers
theme.typography.sizes.md    // 20px - Subheaders
theme.typography.sizes.base  // 17px - Body text (iOS default)
theme.typography.sizes.sm    // 15px - Secondary text
theme.typography.sizes.xs    // 13px - Captions
theme.typography.sizes.xxs   // 11px - Fine print
```

---

## Available Icon Size Tokens

```javascript
icon.xs   // 12px - Tiny icons, decorative elements
icon.sm   // 16px - Small UI icons, list items
icon.md   // 20px - Standard icons (most common)
icon.lg   // 24px - Large icons, primary actions
icon.xl   // 32px - Extra large icons, hero sections
icon.xxl  // 40px - Display icons, splash screens
```

---

## Available Spacing Tokens

Use these for consistent margins and padding:

```javascript
theme.spacing.xs    // 8px
theme.spacing.sm    // 12px
theme.spacing.md    // 16px - Most common
theme.spacing.lg    // 24px
theme.spacing.xl    // 32px
theme.spacing.xxl   // 40px
theme.spacing.xxxl  // 48px
```

---

## useResponsive() Hook

### Available Properties

```javascript
const {
  // Dimensions (updates on rotation)
  width,          // Current window width
  height,         // Current window height
  scale,          // Device pixel ratio
  fontScale,      // Accessibility font scale

  // Device type flags
  isSmallPhone,   // < 360px width (iPhone SE)
  isLargePhone,   // 414-767px width (iPhone Pro Max)
  isTablet,       // >= 768px width (iPad)

  // Percentage helpers
  wp,             // Width percentage: wp(50) = 50% of screen width
  hp,             // Height percentage: hp(25) = 25% of screen height
} = useResponsive();
```

### Common Patterns

```javascript
// Conditional column count
const numColumns = isTablet ? 3 : 2;

// Device-specific styling
const cardStyle = isSmallPhone
  ? { padding: theme.spacing.sm }
  : { padding: theme.spacing.lg };

// Percentage-based width
const headerHeight = hp(15); // 15% of screen height

// Conditional rendering
if (isTablet) {
  return <TabletLayout />;
}
return <PhoneLayout />;
```

---

## Common Responsive Patterns

### Two-Column Grid with Percentage Widths

```javascript
// ✅ CORRECT - Percentage-based responsive grid
<View style={styles.grid}>
  {items.map(item => (
    <View key={item.id} style={styles.gridItem}>
      <Text>{item.name}</Text>
    </View>
  ))}
</View>

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  gridItem: {
    width: '48%',  // Two columns with space between
    padding: theme.spacing.md,
  },
});
```

### Adaptive Layout Based on Device

```javascript
// ✅ CORRECT - Device-aware column count
const MyGrid = () => {
  const { isTablet } = useResponsive();
  const cardWidth = isTablet ? '30%' : '48%';

  return (
    <View style={styles.grid}>
      {items.map(item => (
        <View key={item.id} style={[styles.card, { width: cardWidth }]}>
          <Text style={theme.typography.styles.h4}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};
```

### Responsive Text with Icons

```javascript
// ✅ CORRECT - Uses theme tokens for all sizing
<View style={styles.container}>
  <Feather name="star" size={icon.md} color="#6B7F47" />
  <Text style={theme.typography.styles.bodyLarge}>
    Featured Item
  </Text>
</View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
});
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Hard-coded Pixel Widths

```javascript
// ❌ WRONG - Fixed width won't scale
<View style={{ width: 350, height: 200 }}>
  <Text>Content</Text>
</View>

// ✅ CORRECT - Flexible layout
<View style={{ flex: 1, maxWidth: '90%' }}>
  <Text>Content</Text>
</View>
```

### ❌ Hard-coded Font Sizes

```javascript
// ❌ WRONG - Fixed font size
<Text style={{ fontSize: 16, fontWeight: '600' }}>
  Heading
</Text>

// ✅ CORRECT - Theme typography
<Text style={theme.typography.styles.h5}>
  Heading
</Text>
```

### ❌ Direct moderateScale Usage

```javascript
// ❌ WRONG - Don't import or use moderateScale directly
import { moderateScale } from 'react-native-size-matters';

<Text style={{ fontSize: moderateScale(16) }}>Text</Text>

// ✅ CORRECT - Use theme tokens
<Text style={theme.typography.styles.body}>Text</Text>
```

### ❌ Direct Dimensions API

```javascript
// ❌ WRONG - Static dimensions, doesn't update on rotation
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

// ✅ CORRECT - Dynamic hook updates on changes
const { width, isTablet } = useResponsive();
```

---

## Accessibility

### Font Scaling

**✅ DO:**
- Keep `allowFontScaling` enabled by default on Text components
- Let the OS handle accessibility text size where possible
- Make layouts flexible enough to handle larger text

**❌ DON'T:**
- Disable `allowFontScaling` unless there's a strong UX reason
- Fight system accessibility settings
- Lock font sizes to prevent scaling

**If text breaks at larger sizes:**
- Fix the layout (add wrapping, multi-line, flex) rather than locking font size

---

## Testing Checklist

Before merging any UI changes, test on:

### Required Device Sizes
- [ ] **iPhone SE** (small phone - 375px width)
- [ ] **iPhone 14** (standard phone - 390px width)
- [ ] **iPhone 14 Pro Max** (large phone - 428px width)
- [ ] **iPad Mini** (tablet - 744px width) - when relevant

### What to Verify
- [ ] Text doesn't overflow or get clipped
- [ ] Cards/grids wrap properly without awkward gaps
- [ ] Icons and text look balanced (not too tiny or huge)
- [ ] Spacing feels consistent across devices
- [ ] Touch targets are adequate (min 48px)

---

## "Before Merge" Checklist

For any new screen or major layout change:

- [ ] Layout uses Flexbox & percentages (no unnecessary fixed pixel widths)
- [ ] Spacing uses `theme.spacing.*` tokens
- [ ] Typography uses `theme.typography.*` tokens
- [ ] Icons use `icon.*` tokens
- [ ] No direct use of `react-native-size-matters` in components
- [ ] No direct use of `Dimensions.get()` (use `useResponsive()` instead)
- [ ] Tested on at least small phone, mid-size phone, and (when relevant) tablet
- [ ] Text remains readable with system font scaling enabled

---

## Project Structure

### Theme Files
```
src/theme/
├── index.js          # Main theme export
├── scale.js          # moderateScale wrapper (don't import directly!)
├── typography.js     # Font tokens (uses moderateScale internally)
├── icon.js           # Icon size tokens (uses moderateScale internally)
├── spacing.js        # Spacing scale
├── colors.js         # Color palette
└── shadows.js        # Shadow styles
```

### Hooks
```
src/hooks/
└── useResponsive.js  # Responsive design hook
```

---

## Migration Guide for Existing Components

To update an existing component to the new responsive standards:

1. **Import theme and icon:**
   ```javascript
   import theme, { icon } from '../theme';
   import { useResponsive } from '../hooks/useResponsive';
   ```

2. **Replace hard-coded font sizes:**
   ```javascript
   // Before
   fontSize: 16,
   fontWeight: '600',

   // After
   ...theme.typography.styles.bodyMedium,
   ```

3. **Replace hard-coded icon sizes:**
   ```javascript
   // Before
   <Feather name="star" size={24} />

   // After
   <Feather name="star" size={icon.lg} />
   ```

4. **Convert fixed widths to percentages or flex:**
   ```javascript
   // Before
   width: (screenWidth - 64 - 16) / 2,

   // After
   width: '48%',
   ```

5. **Add responsive logic if needed:**
   ```javascript
   const { isTablet } = useResponsive();
   const cardWidth = isTablet ? '30%' : '48%';
   ```

---

## Summary

**Remember the golden rules:**

1. **Layout = Flex/Percentages** (not scaling)
2. **Typography = theme.typography.\*** (never direct fontSize)
3. **Icons = icon.\*** (never direct size numbers)
4. **Spacing = theme.spacing.\*** (never magic numbers)
5. **Device logic = useResponsive()** (never Dimensions.get)
6. **Never import react-native-size-matters directly** (only via theme)

This becomes the **project standard** going forward. All new code should follow these guidelines, and existing code should be migrated during normal maintenance cycles.

---

## Questions or Issues?

If you encounter edge cases not covered in this document, consult with the team to determine the best approach and update this document accordingly.
