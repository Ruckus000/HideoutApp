/**
 * Theme configuration for HideOut Kava App
 * Exports all theme-related utilities and constants
 */

import { colors } from './colors.types';
import { typography } from './typography.types';
import { spacing } from './spacing.types';

/**
 * The main theme object for the application.
 * This object consolidates all the design tokens, including colors, typography, spacing,
 * border radius, and shadows, into a single, easily accessible structure.
 *
 * @property {object} colors - The color palette.
 * @property {object} typography - Typography styles, including font families, sizes, and weights.
 * @property {object} spacing - Spacing units for layout and components.
 * @property {object} borderRadius - Border radius values for creating rounded corners.
 * @property {object} shadows - Shadow styles for creating depth and elevation.
 */
export const theme = {
  colors,
  typography,
  spacing,

  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export { colors, typography, spacing };

/**
 * A TypeScript type that represents the structure of the theme object.
 * This provides type safety and autocompletion when working with the theme in a TypeScript environment.
 */
export type Theme = typeof theme;
