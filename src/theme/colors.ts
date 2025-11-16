/**
 * Color palette for HideOut Kava App
 * Based on the UI/UX design system
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

export type ColorName = keyof typeof colors;
