/**
 * @fileoverview Defines the typography styles for the HideOut Kava App.
 * This file provides a consistent scale for font sizes, weights, and line heights
 * to ensure a cohesive and readable user interface.
 */
export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/**
 * A TypeScript type representing the available font sizes.
 */
export type FontSize = keyof typeof typography.fontSize;

/**
 * A TypeScript type representing the available font weights.
 */
export type FontWeight = keyof typeof typography.fontWeight;
