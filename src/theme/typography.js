/**
 * @fileoverview Defines the typography system for the application, based on the iOS
 * SF Pro Display/Text fonts. This system establishes a clear visual hierarchy through
 * a consistent scale of font sizes, weights, and predefined text styles, aligning with
 * the "Warm Minimalist" design philosophy.
 *
 * All font sizes use moderateScale() to ensure appropriate sizing across all device types.
 * Components should ALWAYS use these typography tokens, never hard-code font sizes.
 *
 * @see /docs/ui-ux.md for more details on the typography guidelines.
 * @see /docs/responsive-design-standards.md for responsive design standards.
 */

import { moderateScale } from './scale';

const typography = {
  // Font Families
  fonts: {
    // iOS System Fonts
    displayBold: 'SF Pro Display Bold',
    displaySemiBold: 'SF Pro Display SemiBold',
    displayMedium: 'SF Pro Display Medium',
    displayRegular: 'SF Pro Display Regular',

    textBold: 'SF Pro Text Bold',
    textSemiBold: 'SF Pro Text SemiBold',
    textMedium: 'SF Pro Text Medium',
    textRegular: 'SF Pro Text Regular',

    // Fallback for React Native
    default: 'System',
  },

  // Font Weights
  weights: {
    bold: '700',
    semiBold: '600',
    medium: '500',
    regular: '400',
    light: '300',
  },

  // Font Sizes (8pt grid system with responsive scaling)
  // These sizes are scaled using moderateScale for device responsiveness
  sizes: {
    xxxl: moderateScale(40),   // Hero/Display
    xxl: moderateScale(32),    // Large headers
    xl: moderateScale(28),     // Section headers
    lg: moderateScale(24),     // Card headers
    md: moderateScale(20),     // Subheaders
    base: moderateScale(17),   // Body text (iOS default)
    sm: moderateScale(15),     // Secondary text
    xs: moderateScale(13),     // Captions
    xxs: moderateScale(11),    // Fine print
  },

  // Line Heights (optimized for readability)
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },

  // Predefined Text Styles (with responsive scaling)
  styles: {
    // Headers
    h1: {
      fontFamily: 'SF Pro Display Bold',
      fontSize: moderateScale(40),
      fontWeight: '700',
      lineHeight: moderateScale(48),
      letterSpacing: -0.5,
    },
    h2: {
      fontFamily: 'SF Pro Display Bold',
      fontSize: moderateScale(32),
      fontWeight: '700',
      lineHeight: moderateScale(40),
      letterSpacing: -0.5,
    },
    h3: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: moderateScale(28),
      fontWeight: '600',
      lineHeight: moderateScale(36),
      letterSpacing: -0.3,
    },
    h4: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: moderateScale(24),
      fontWeight: '600',
      lineHeight: moderateScale(32),
      letterSpacing: 0,
    },
    h5: {
      fontFamily: 'SF Pro Display Medium',
      fontSize: moderateScale(20),
      fontWeight: '500',
      lineHeight: moderateScale(28),
      letterSpacing: 0,
    },
    h6: {
      fontFamily: 'SF Pro Display Medium',
      fontSize: moderateScale(17),
      fontWeight: '500',
      lineHeight: moderateScale(24),
      letterSpacing: 0,
    },

    // Body Text
    bodyLarge: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: moderateScale(17),
      fontWeight: '400',
      lineHeight: moderateScale(26),
      letterSpacing: 0,
    },
    body: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: moderateScale(15),
      fontWeight: '400',
      lineHeight: moderateScale(22),
      letterSpacing: 0,
    },
    bodySmall: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: moderateScale(13),
      fontWeight: '400',
      lineHeight: moderateScale(18),
      letterSpacing: 0,
    },

    // Body Bold variants
    bodyLargeBold: {
      fontFamily: 'SF Pro Text Bold',
      fontSize: moderateScale(17),
      fontWeight: '700',
      lineHeight: moderateScale(26),
      letterSpacing: 0,
    },
    bodyBold: {
      fontFamily: 'SF Pro Text Bold',
      fontSize: moderateScale(15),
      fontWeight: '700',
      lineHeight: moderateScale(22),
      letterSpacing: 0,
    },

    // Body Medium variants
    bodyLargeMedium: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: moderateScale(17),
      fontWeight: '500',
      lineHeight: moderateScale(26),
      letterSpacing: 0,
    },
    bodyMedium: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: moderateScale(15),
      fontWeight: '500',
      lineHeight: moderateScale(22),
      letterSpacing: 0,
    },

    // Captions
    caption: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: moderateScale(13),
      fontWeight: '400',
      lineHeight: moderateScale(18),
      letterSpacing: 0,
    },
    captionBold: {
      fontFamily: 'SF Pro Text Bold',
      fontSize: moderateScale(13),
      fontWeight: '700',
      lineHeight: moderateScale(18),
      letterSpacing: 0,
    },
    captionMedium: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: moderateScale(13),
      fontWeight: '500',
      lineHeight: moderateScale(18),
      letterSpacing: 0,
    },

    // Fine Print
    finePrint: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: moderateScale(11),
      fontWeight: '400',
      lineHeight: moderateScale(14),
      letterSpacing: 0,
    },

    // Buttons
    buttonLarge: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: moderateScale(17),
      fontWeight: '600',
      lineHeight: moderateScale(22),
      letterSpacing: 0.5,
    },
    button: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: moderateScale(15),
      fontWeight: '600',
      lineHeight: moderateScale(20),
      letterSpacing: 0.5,
    },
    buttonSmall: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: moderateScale(13),
      fontWeight: '600',
      lineHeight: moderateScale(18),
      letterSpacing: 0.3,
    },

    // Labels
    label: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: moderateScale(15),
      fontWeight: '500',
      lineHeight: moderateScale(20),
      letterSpacing: 0,
    },
    labelSmall: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: moderateScale(13),
      fontWeight: '500',
      lineHeight: moderateScale(18),
      letterSpacing: 0,
    },

    // Input Fields
    input: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: moderateScale(17),
      fontWeight: '400',
      lineHeight: moderateScale(22),
      letterSpacing: 0,
    },
    inputLabel: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: moderateScale(13),
      fontWeight: '500',
      lineHeight: moderateScale(18),
      letterSpacing: 0,
    },

    // Navigation
    navTitle: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: moderateScale(17),
      fontWeight: '600',
      lineHeight: moderateScale(22),
      letterSpacing: 0,
    },
    tabLabel: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: moderateScale(11),
      fontWeight: '500',
      lineHeight: moderateScale(14),
      letterSpacing: 0,
    },

    // Price
    priceLarge: {
      fontFamily: 'SF Pro Display Bold',
      fontSize: moderateScale(28),
      fontWeight: '700',
      lineHeight: moderateScale(34),
      letterSpacing: -0.3,
    },
    price: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: moderateScale(20),
      fontWeight: '600',
      lineHeight: moderateScale(26),
      letterSpacing: 0,
    },
    priceSmall: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: moderateScale(15),
      fontWeight: '600',
      lineHeight: moderateScale(20),
      letterSpacing: 0,
    },
  },
};

export default typography;
