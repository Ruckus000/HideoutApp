/**
 * @fileoverview Defines the spacing system for the HideOut Kava App.
 * This file provides a consistent scale for margins, padding, and other layout dimensions
 * to ensure visual harmony throughout the application.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

/**
 * A TypeScript type that represents the available spacing sizes.
 * This allows for type-safe usage of spacing values in component props.
 */
export type SpacingSize = keyof typeof spacing;
