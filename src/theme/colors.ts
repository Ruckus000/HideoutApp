/**
 * @fileoverview Defines the primary color palette for the HideOut Kava App.
 * This file contains a simplified color scheme based on the application's UI/UX design system,
 * focusing on core brand, text, and status colors.
 *
 * @see /docs/ui-ux.md for the full design system details.
 */
export const colors = {
  // Primary colors
  primary: '#8B4513', // Kava brown
  primaryDark: '#5C2E0A',
  primaryLight: '#A0522D',

  // Accent colors
  accent: '#D4AF37', // Gold accent
  accentLight: '#F0E68C',

  // Background colors
  background: '#1a1a1a',
  backgroundLight: '#2a2a2a',
  backgroundCard: '#2c2c2c',

  // Text colors
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textMuted: '#808080',

  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // UI elements
  border: '#404040',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Transparent
  transparent: 'transparent',
};

/**
 * A TypeScript type that represents the names of the available colors in the palette.
 * This allows for type-safe usage of colors throughout the application.
 */
export type ColorName = keyof typeof colors;
