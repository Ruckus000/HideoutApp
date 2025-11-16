/**
 * Typography System
 * Based on iOS SF Pro Display/Text
 * Warm Minimalist Design - Hierarchy through weight and size
 */

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

  // Font Sizes (8pt grid system)
  sizes: {
    xxxl: 40,   // Hero/Display
    xxl: 32,    // Large headers
    xl: 28,     // Section headers
    lg: 24,     // Card headers
    md: 20,     // Subheaders
    base: 17,   // Body text (iOS default)
    sm: 15,     // Secondary text
    xs: 13,     // Captions
    xxs: 11,    // Fine print
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

  // Predefined Text Styles
  styles: {
    // Headers
    h1: {
      fontFamily: 'SF Pro Display Bold',
      fontSize: 40,
      fontWeight: '700',
      lineHeight: 48,
      letterSpacing: -0.5,
    },
    h2: {
      fontFamily: 'SF Pro Display Bold',
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h3: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: 28,
      fontWeight: '600',
      lineHeight: 36,
      letterSpacing: -0.3,
    },
    h4: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
      letterSpacing: 0,
    },
    h5: {
      fontFamily: 'SF Pro Display Medium',
      fontSize: 20,
      fontWeight: '500',
      lineHeight: 28,
      letterSpacing: 0,
    },
    h6: {
      fontFamily: 'SF Pro Display Medium',
      fontSize: 17,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: 0,
    },

    // Body Text
    bodyLarge: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 26,
      letterSpacing: 0,
    },
    body: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 22,
      letterSpacing: 0,
    },
    bodySmall: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 18,
      letterSpacing: 0,
    },

    // Body Bold variants
    bodyLargeBold: {
      fontFamily: 'SF Pro Text Bold',
      fontSize: 17,
      fontWeight: '700',
      lineHeight: 26,
      letterSpacing: 0,
    },
    bodyBold: {
      fontFamily: 'SF Pro Text Bold',
      fontSize: 15,
      fontWeight: '700',
      lineHeight: 22,
      letterSpacing: 0,
    },

    // Body Medium variants
    bodyLargeMedium: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: 17,
      fontWeight: '500',
      lineHeight: 26,
      letterSpacing: 0,
    },
    bodyMedium: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 22,
      letterSpacing: 0,
    },

    // Captions
    caption: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 18,
      letterSpacing: 0,
    },
    captionBold: {
      fontFamily: 'SF Pro Text Bold',
      fontSize: 13,
      fontWeight: '700',
      lineHeight: 18,
      letterSpacing: 0,
    },
    captionMedium: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 18,
      letterSpacing: 0,
    },

    // Fine Print
    finePrint: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: 11,
      fontWeight: '400',
      lineHeight: 14,
      letterSpacing: 0,
    },

    // Buttons
    buttonLarge: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
      letterSpacing: 0.5,
    },
    button: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: 15,
      fontWeight: '600',
      lineHeight: 20,
      letterSpacing: 0.5,
    },
    buttonSmall: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: 13,
      fontWeight: '600',
      lineHeight: 18,
      letterSpacing: 0.3,
    },

    // Labels
    label: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 20,
      letterSpacing: 0,
    },
    labelSmall: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 18,
      letterSpacing: 0,
    },

    // Input Fields
    input: {
      fontFamily: 'SF Pro Text Regular',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
      letterSpacing: 0,
    },
    inputLabel: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 18,
      letterSpacing: 0,
    },

    // Navigation
    navTitle: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
      letterSpacing: 0,
    },
    tabLabel: {
      fontFamily: 'SF Pro Text Medium',
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 14,
      letterSpacing: 0,
    },

    // Price
    priceLarge: {
      fontFamily: 'SF Pro Display Bold',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
      letterSpacing: -0.3,
    },
    price: {
      fontFamily: 'SF Pro Display SemiBold',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 26,
      letterSpacing: 0,
    },
    priceSmall: {
      fontFamily: 'SF Pro Text SemiBold',
      fontSize: 15,
      fontWeight: '600',
      lineHeight: 20,
      letterSpacing: 0,
    },
  },
};

export default typography;
