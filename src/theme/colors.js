/**
 * Warm Minimalist Color Palette
 * Based on Kava Community Hub UX/UI Design System
 */

const colors = {
  // Primary Colors
  primary: {
    main: '#6B7F47',        // Deep Olive Green
    light: '#8A9D66',       // Lighter Olive
    dark: '#5A6B3B',        // Darker Olive (matches mockup accent-dark)
    contrast: '#FFFFFF',    // Text on primary
  },

  // Accent Colors
  accent: {
    main: '#B8654B',        // Terracotta
    light: '#C9826D',       // Lighter Terracotta
    dark: '#A05940',        // Darker Terracotta (matches mockup terracotta-dark)
    contrast: '#FFFFFF',    // Text on accent
  },

  // Secondary Accent (Warm tones)
  secondary: {
    warmGold: '#D4A574',    // Warm Gold
    mutedOrange: '#D17A52', // Muted Orange
    earthyBrown: '#8B6F47', // Earthy Brown
  },

  // Light Mode Neutrals
  light: {
    background: '#FAFAF8',  // Warm Off-White
    surface: '#FFFFFF',     // Pure White
    surfaceVariant: '#F5F5F3', // Slightly darker surface
    textPrimary: '#1C1C1E', // Deep Charcoal
    textSecondary: '#8E8E93', // Gray
    textTertiary: '#C7C7CC', // Light Gray
    border: '#E5E5E3',      // Warm border color
    divider: '#F0F0EE',     // Subtle divider
    overlay: 'rgba(28, 28, 30, 0.4)', // Dark overlay
  },

  // Dark Mode Neutrals
  dark: {
    background: '#252824',  // Very Dark Charcoal/Deep Olive
    surface: '#3A3A3A',     // Dark Charcoal
    surfaceVariant: '#2D2D2D', // Darker surface variant
    textPrimary: '#FAFAF8', // Warm Off-White
    textSecondary: '#C7C7CC', // Light Gray
    textTertiary: '#8E8E93', // Medium Gray
    border: '#4A4A4A',      // Dark border
    divider: '#333333',     // Dark divider
    overlay: 'rgba(250, 250, 248, 0.1)', // Light overlay
  },

  // Semantic Colors
  semantic: {
    success: '#5FB17A',     // Warm green
    warning: '#E8A44C',     // Warm amber
    error: '#D14343',       // Warm red
    info: '#6B7F47',        // Using primary olive
  },

  // Special States
  states: {
    disabled: {
      light: '#E5E5E3',
      dark: '#4A4A4A',
    },
    pressed: {
      light: 'rgba(107, 127, 71, 0.1)',  // Primary with opacity
      dark: 'rgba(107, 127, 71, 0.2)',
    },
    focus: {
      light: 'rgba(107, 127, 71, 0.2)',
      dark: 'rgba(107, 127, 71, 0.3)',
    },
  },

  // Badge & Notification
  badge: {
    background: '#D14343',  // Warm red
    text: '#FFFFFF',
  },

  // Rewards & Gamification
  rewards: {
    bronze: '#B8654B',      // Terracotta
    silver: '#C7C7CC',      // Silver gray
    gold: '#D4A574',        // Warm gold
    platinum: '#8A9D66',    // Light olive
  },

  // Transparent variants (for overlays, cards, etc.)
  transparent: {
    white10: 'rgba(255, 255, 255, 0.1)',
    white20: 'rgba(255, 255, 255, 0.2)',
    white50: 'rgba(255, 255, 255, 0.5)',
    white80: 'rgba(255, 255, 255, 0.8)',
    black10: 'rgba(0, 0, 0, 0.1)',
    black20: 'rgba(0, 0, 0, 0.2)',
    black50: 'rgba(0, 0, 0, 0.5)',
    black80: 'rgba(0, 0, 0, 0.8)',
    primary10: 'rgba(107, 127, 71, 0.1)',
    primary20: 'rgba(107, 127, 71, 0.2)',
    primary50: 'rgba(107, 127, 71, 0.5)',
  },
};

export default colors;
