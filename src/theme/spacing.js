/**
 * @fileoverview Defines the spacing system for the application, based on an 8pt grid.
 * This system promotes consistency and visual harmony by providing a predefined scale
 * for margins, padding, and layout dimensions. It is a key part of the "Warm Minimalist"
 * design philosophy, which emphasizes generous use of negative space.
 *
 * @see /docs/ui-ux.md for more details on the 8pt grid system.
 */
const spacing = {
  // Base unit (8pt)
  base: 8,

  // Spacing Scale (8pt grid system)
  none: 0,
  xxxs: 2,    // 0.25x - Micro spacing
  xxs: 4,     // 0.5x  - Extra extra small
  xs: 8,      // 1x    - Extra small
  sm: 12,     // 1.5x  - Small
  md: 16,     // 2x    - Medium (most common)
  lg: 24,     // 3x    - Large
  xl: 32,     // 4x    - Extra large
  xxl: 40,    // 5x    - Extra extra large
  xxxl: 48,   // 6x    - Maximum spacing
  huge: 64,   // 8x    - Hero sections
  massive: 80, // 10x  - Special cases

  // Component-specific spacing
  components: {
    // Screen padding
    screenHorizontal: 16,
    screenVertical: 24,
    screenTop: 16,
    screenBottom: 24,

    // Card spacing
    cardPadding: 16,
    cardMargin: 12,
    cardGap: 16,

    // List spacing
    listItemPadding: 16,
    listItemGap: 12,
    listSectionGap: 24,

    // Form spacing
    formFieldGap: 16,
    formSectionGap: 24,
    inputPadding: 12,
    inputHorizontal: 16,

    // Button spacing
    buttonPaddingVertical: 12,
    buttonPaddingHorizontal: 24,
    buttonGap: 12,

    // Icon spacing
    iconMargin: 8,
    iconPadding: 4,

    // Tab bar
    tabBarHeight: 80,
    tabBarPadding: 8,
    tabBarIconSpacing: 4,

    // Floating cart bar
    floatingBarHeight: 64,
    floatingBarPadding: 16,
    floatingBarBottom: 88, // Above tab bar (80) + spacing (8)

    // Header
    headerHeight: 56,
    headerPadding: 16,

    // Product card
    productImageHeight: 200,
    productPadding: 16,

    // Rewards widget
    rewardsWidgetPadding: 20,
    rewardsWidgetMargin: 16,
    progressBarHeight: 6,

    // Badge
    badgeSize: 20,
    badgeOffset: -8,

    // Divider
    dividerHeight: 1,
    dividerMargin: 16,

    // Modal
    modalPadding: 24,
    modalRadius: 16,

    // Toast/Snackbar
    toastPadding: 16,
    toastMargin: 16,
  },

  // Border Radius (aligned with 8pt grid)
  radius: {
    none: 0,
    xs: 4,      // Small elements (badges, chips)
    sm: 8,      // Buttons, inputs
    md: 12,     // Cards
    lg: 16,     // Large cards, modals
    xl: 24,     // Hero elements
    full: 9999, // Pills, circular elements
  },

  // Insets (for ScrollView, SafeAreaView)
  insets: {
    screen: {
      top: 16,
      right: 16,
      bottom: 24,
      left: 16,
    },
    card: {
      top: 16,
      right: 16,
      bottom: 16,
      left: 16,
    },
    compact: {
      top: 8,
      right: 8,
      bottom: 8,
      left: 8,
    },
    comfortable: {
      top: 24,
      right: 24,
      bottom: 24,
      left: 24,
    },
  },

  // Layout grid
  grid: {
    columns: 12,
    gutter: 16,
    margin: 16,
    maxWidth: 1200,
  },

  // Thumb-friendly zones (for CTAs)
  thumbZone: {
    minHeight: 48,      // Minimum touch target
    minWidth: 48,
    recommended: 56,    // Recommended touch target
    comfortable: 64,    // Comfortable touch target
  },

  // Negative space helpers
  negativeSpace: {
    minimal: 8,
    comfortable: 16,
    generous: 24,
    spacious: 32,
    luxurious: 48,
  },
};

export default spacing;
