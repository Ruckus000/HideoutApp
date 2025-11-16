/**
 * Kava Community Hub - Warm Minimalist Design System
 *
 * This is the central theme export that combines all design tokens:
 * - Colors: Warm palette with olive green, terracotta, and neutral tones
 * - Typography: iOS SF Pro fonts with clear hierarchy
 * - Spacing: 8pt grid system with generous negative space
 * - Shadows: Premium, soft shadows for depth
 *
 * Based on UX/UI Design System Specification v1.0
 */

import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import shadows from './shadows';

// Theme modes
const lightTheme = {
  colors: {
    ...colors,
    mode: 'light',
    // Flattened color shortcuts for easy access
    background: colors.light.background,
    surface: colors.light.surface,
    surfaceHover: colors.light.surfaceVariant,
    primary: colors.light.textPrimary,
    secondary: colors.light.textSecondary,
    accent: colors.primary.main,
    accentDark: colors.primary.dark,
    terracotta: colors.accent.main,
    terracottaDark: colors.accent.dark,
    white: '#FFFFFF',
    whiteTransparent10: colors.transparent.white10,
    whiteTransparent20: colors.transparent.white20,
    whiteTransparent70: 'rgba(255, 255, 255, 0.7)',
    whiteTransparent80: colors.transparent.white80,
    gray100: '#F5F5F3',
    gray200: '#E5E5E3',
    gray400: '#A1A1A0',
  },
  typography: {
    ...typography,
    // Flattened font size shortcuts
    xs: typography.sizes.xxs,
    sm: typography.sizes.xs,
    base: typography.sizes.sm,
    md: typography.sizes.base,
    lg: typography.sizes.md,
    xl: typography.sizes.lg,
    xxl: typography.sizes.xl,
    xxxl: typography.sizes.xxl,
    // Flattened font weight shortcuts
    regular: typography.weights.regular,
    medium: typography.weights.medium,
    semibold: typography.weights.semiBold,
    bold: typography.weights.bold,
  },
  spacing: {
    ...spacing,
    // Keep direct access to spacing scale
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    xxxl: spacing.xxxl,
  },
  borderRadius: {
    ...spacing.radius,
    sm: spacing.radius.xs,
    md: spacing.radius.sm,
    lg: spacing.radius.md,
    xl: spacing.radius.lg,
    xxl: spacing.radius.xl,
    round: spacing.radius.full,
  },
  shadows: {
    ...shadows.components,
    // Add all shadow presets with Android elevation included
    minimal: shadows.components.card,
    soft: shadows.components.card,
    medium: shadows.components.cardHover,
    premium: shadows.components.rewardsWidget,
    large: shadows.components.floatingBar,
    // Add float alias for floating cart
    float: shadows.components.floatingBar,
  },
};

const darkTheme = {
  colors: {
    ...colors,
    mode: 'dark',
    // Flattened color shortcuts for easy access
    background: colors.dark.background,
    surface: colors.dark.surface,
    surfaceHover: colors.dark.surfaceVariant,
    primary: colors.dark.textPrimary,
    secondary: colors.dark.textSecondary,
    accent: colors.primary.main,
    accentDark: colors.primary.dark,
    terracotta: colors.accent.main,
    terracottaDark: colors.accent.dark,
    white: '#FFFFFF',
    whiteTransparent10: colors.transparent.white10,
    whiteTransparent20: colors.transparent.white20,
    whiteTransparent70: 'rgba(255, 255, 255, 0.7)',
    whiteTransparent80: colors.transparent.white80,
    gray100: '#4A4A4A',
    gray200: '#5A5A5A',
    gray400: '#8A8A8A',
  },
  typography: {
    ...typography,
    // Flattened font size shortcuts
    xs: typography.sizes.xxs,
    sm: typography.sizes.xs,
    base: typography.sizes.sm,
    md: typography.sizes.base,
    lg: typography.sizes.md,
    xl: typography.sizes.lg,
    xxl: typography.sizes.xl,
    xxxl: typography.sizes.xxl,
    // Flattened font weight shortcuts
    regular: typography.weights.regular,
    medium: typography.weights.medium,
    semibold: typography.weights.semiBold,
    bold: typography.weights.bold,
  },
  spacing: {
    ...spacing,
    // Keep direct access to spacing scale
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    xxxl: spacing.xxxl,
  },
  borderRadius: {
    ...spacing.radius,
    sm: spacing.radius.xs,
    md: spacing.radius.sm,
    lg: spacing.radius.md,
    xl: spacing.radius.lg,
    xxl: spacing.radius.xl,
    round: spacing.radius.full,
  },
  shadows: {
    ...shadows.components,
    // Use components shadows which include elevation for Android
    minimal: shadows.components.card,
    soft: shadows.components.card,
    medium: shadows.components.cardHover,
    premium: shadows.components.rewardsWidget,
    large: shadows.components.floatingBar,
    // Add float alias for floating cart
    float: shadows.components.floatingBar,
  },
};

// Default theme (light mode)
/**
 * The main theme object for the application.
 * It combines all design tokens (colors, typography, spacing, shadows) and provides
 * additional utilities like breakpoints, z-index layers, and animation settings.
 *
 * @property {object} colors - The color palette for the current theme mode.
 * @property {object} typography - Typography styles, including font sizes and weights.
 * @property {object} spacing - Spacing units for layout and components.
 * @property {object} borderRadius - Border radius values for creating rounded corners.
 * @property {object} shadows - Shadow styles for creating depth and elevation.
 * @property {object} dark - The dark theme configuration.
 * @property {function} getTheme - A helper function to get the theme configuration for a specific mode.
 * @property {object} breakpoints - Breakpoints for responsive design.
 * @property {object} zIndex - Z-index values for managing layers.
 * @property {object} animation - Animation duration settings.
 * @property {object} easing - Easing functions for animations.
 */
const theme = {
  ...lightTheme,

  // Include dark theme for switching
  dark: darkTheme,

  // Helper methods
  getTheme: (mode = 'light') => {
    return mode === 'dark' ? darkTheme : lightTheme;
  },

  // Breakpoints (for responsive design)
  breakpoints: {
    xs: 0,
    sm: 375,    // iPhone SE
    md: 414,    // iPhone Pro Max
    lg: 768,    // iPad
    xl: 1024,   // iPad Pro
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    overlay: 400,
    modal: 500,
    popover: 600,
    toast: 700,
    tooltip: 800,
  },

  // Animation durations (ms)
  animation: {
    fastest: 100,
    fast: 200,
    normal: 300,
    slow: 400,
    slowest: 500,
  },

  // Easing functions
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// Export individual modules
export { colors, typography, spacing, shadows };

// Export themes
export { lightTheme, darkTheme };

// Export default theme
export default theme;
