/**
 * @fileoverview Defines the shadow system for the application, providing a set of
 * premium, soft shadows that align with the "Warm Minimalist" design philosophy.
 * This file includes shadow styles for iOS, Android (elevation), and CSS (for web),
 * as well as component-specific and dark mode variations.
 *
 * @see /docs/ui-ux.md for more details on the design system's approach to depth and elevation.
 */
const shadows = {
  // iOS-style shadows (for React Native)
  ios: {
    // Minimal shadow - for subtle depth
    minimal: {
      shadowColor: '#1C1C1E',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },

    // Soft shadow - for cards and containers
    soft: {
      shadowColor: '#1C1C1E',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },

    // Medium shadow - for floating elements
    medium: {
      shadowColor: '#1C1C1E',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },

    // Premium shadow - for elevated cards
    premium: {
      shadowColor: '#1C1C1E',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.12,
      shadowRadius: 12,
    },

    // Large shadow - for modals and overlays
    large: {
      shadowColor: '#1C1C1E',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.15,
      shadowRadius: 16,
    },

    // Extra large - for bottom sheets
    xlarge: {
      shadowColor: '#1C1C1E',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.18,
      shadowRadius: 24,
    },
  },

  // Android-style elevation (for React Native)
  android: {
    minimal: 1,
    soft: 2,
    medium: 4,
    premium: 6,
    large: 8,
    xlarge: 12,
  },

  // CSS box-shadow strings (for web)
  css: {
    minimal: '0 1px 2px rgba(28, 28, 30, 0.05)',
    soft: '0 2px 4px rgba(28, 28, 30, 0.08)',
    medium: '0 4px 8px rgba(28, 28, 30, 0.1)',
    premium: '0 6px 12px rgba(28, 28, 30, 0.12)',
    large: '0 8px 16px rgba(28, 28, 30, 0.15)',
    xlarge: '0 12px 24px rgba(28, 28, 30, 0.18)',

    // Warm-tinted shadows (using olive green tint)
    warmMinimal: '0 1px 2px rgba(107, 127, 71, 0.05)',
    warmSoft: '0 2px 4px rgba(107, 127, 71, 0.08)',
    warmMedium: '0 4px 8px rgba(107, 127, 71, 0.1)',
    warmPremium: '0 6px 12px rgba(107, 127, 71, 0.12)',

    // Inner shadows (for pressed states)
    innerSoft: 'inset 0 1px 2px rgba(28, 28, 30, 0.1)',
    innerMedium: 'inset 0 2px 4px rgba(28, 28, 30, 0.15)',
  },

  // Component-specific shadows
  components: {
    // Card shadows
    card: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },

    cardHover: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },

    // Button shadows (subtle for minimalist design)
    button: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },

    buttonPressed: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
    },

    // Floating cart bar (prominent shadow)
    floatingBar: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },

    // Tab bar shadow
    tabBar: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 4,
    },

    // Modal shadow
    modal: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 12,
    },

    // Dropdown shadow
    dropdown: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
    },

    // Toast/Snackbar shadow
    toast: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },

    // Product image shadow (very subtle)
    productImage: {
      shadowColor: '#1C1C1E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },

    // Rewards widget shadow
    rewardsWidget: {
      shadowColor: '#6B7F47', // Primary color
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
  },

  // Dark mode shadows (lighter shadows)
  dark: {
    minimal: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    soft: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
    premium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.45,
      shadowRadius: 12,
    },
  },

  // No shadow (for flat design elements)
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

export default shadows;
