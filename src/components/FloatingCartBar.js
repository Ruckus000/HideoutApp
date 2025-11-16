/**
 * FloatingCartBar.js
 *
 * Persistent floating cart summary bar that appears above the tab bar.
 * Provides immediate feedback when items are added to cart and quick access to cart screen.
 *
 * Spec Reference: ui-ux.md Section 4.2 - Global: Floating Cart Summary Bar
 *
 * Key Requirements from Spec:
 * - Position: Floats persistently at bottom, above the 4-icon tab bar
 * - Trigger: Animates in (slide up) when user taps "Add to Cart"
 * - Contents: Item count, running subtotal, "View Cart" CTA
 * - Action: Tapping navigates to Cart tab
 * - Dismissal: Animates out when cart is emptied or after checkout
 * - Aesthetic: High-contrast background (dark) for clear visibility
 *
 * Design Philosophy - Warm Minimalism:
 * - Non-intrusive feedback (slides in smoothly, doesn't block content)
 * - High contrast dark background stands out without being harsh
 * - Clear typography and spacing maintain readability
 * - Smooth animations feel premium and polished
 * - Single-purpose component reduces cognitive load
 *
 * Animation Behavior:
 * - Slide In: Spring animation (natural, bouncy feel) when cart gets first item
 * - Persistent: Remains visible as user navigates between tabs
 * - Slide Out: Smooth fade + slide when cart becomes empty
 * - Native Driver: Uses native animations for 60fps performance
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import colors from '../theme/colors';

/**
 * Floating Cart Bar Component
 *
 * Main component function that renders the floating cart summary bar.
 *
 * Component Architecture:
 * - Functional component using hooks
 * - No internal state (derives everything from CartContext)
 * - Uses refs for animation values (persist across renders)
 * - Automatic show/hide based on cart contents
 *
 * Dependencies:
 * - navigation: For navigating to Cart screen on tap
 * - insets: Safe area insets for proper positioning on devices with notches/home indicators
 * - useCart: Cart state (items, count, totals)
 *
 * Note: This component should be rendered in AppNavigator at the tab level
 * so it appears consistently across all tabs.
 */
const FloatingCartBar = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  /**
   * Cart State
   *
   * Access cart data from CartContext.
   *
   * Why these specific values?
   * - cartCount: Total quantity to display (e.g., "3 Items")
   * - calculateSubtotal: Running total to display (e.g., "$24.50")
   * - isCartEmpty: Determines whether bar should be visible
   *
   * Note: Using calculateSubtotal() function instead of pre-computed value
   * ensures we always show the most up-to-date total.
   */
  const { cartCount, calculateSubtotal, isCartEmpty } = useCart();

  /**
   * Animation Values
   *
   * Uses useRef to create persistent Animated.Value instances.
   * These values don't change identity across renders, which is essential
   * for smooth animations.
   *
   * slideAnim: Controls vertical slide (0 = hidden below, 1 = visible)
   * fadeAnim: Controls opacity (0 = transparent, 1 = fully visible)
   *
   * Why useRef?
   * - Animated.Value instances must persist across renders
   * - useState would create new instances, breaking animations
   * - .current property holds the actual Animated.Value
   */
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  /**
   * Computed Display Values
   *
   * Calculate values for display in the UI.
   */
  const itemCount = cartCount;
  const subtotal = calculateSubtotal();
  const shouldShow = !isCartEmpty; // Show bar when cart has items

  /**
   * Animation Effect
   *
   * Triggers animations when cart visibility changes (items added/removed).
   *
   * Animation Strategy:
   *
   * Animate In (when shouldShow becomes true):
   * - Uses spring animation for slide - creates natural, bouncy entrance
   * - Uses timing animation for fade - creates smooth fade-in
   * - Runs in parallel for simultaneous slide + fade effect
   * - Spring parameters: tension: 65, friction: 10 - creates gentle bounce
   * - Duration: 200ms for fade (quick but not jarring)
   *
   * Animate Out (when shouldShow becomes false):
   * - Uses timing for both slide and fade - smooth, controlled exit
   * - Slide duration: 200ms - matches entrance timing
   * - Fade duration: 150ms - slightly faster for snappy dismissal
   * - No spring on exit - clean disappearance without bounce
   *
   * Why Animated.parallel?
   * - Runs multiple animations simultaneously
   * - Creates cohesive entrance/exit effect
   * - More performant than sequential animations
   *
   * Why useNativeDriver: true?
   * - Offloads animations to native thread
   * - Achieves 60fps even with JS thread busy
   * - Essential for smooth animations on lower-end devices
   *
   * Design Philosophy:
   * - Spring entrance feels playful and engaging (warm)
   * - Smooth exit maintains premium feel (minimalist)
   * - Parallel animations create polished experience
   * - Native driver ensures performance
   */
  useEffect(() => {
    if (shouldShow) {
      // Animate in - Spring for playful entrance
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,    // Lower tension = slower, more bouncy
          friction: 10,   // Lower friction = more oscillation
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out - Timing for smooth exit
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150, // Slightly faster fade out
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [shouldShow]); // Re-run when visibility changes

  /**
   * Early Return Optimization
   *
   * Don't render component if cart is empty AND animation is complete.
   *
   * Why check slideAnim._value?
   * - While animating out, component needs to remain rendered
   * - Once slide animation reaches 0, component can be removed from tree
   * - Reduces unnecessary renders and DOM nodes
   *
   * Note: Accessing ._value directly is generally discouraged but acceptable
   * here for optimization. Alternative would be using onAnimationEnd callback.
   */
  if (!shouldShow && slideAnim._value === 0) {
    return null;
  }

  /**
   * Handle Press
   *
   * Navigates to Cart tab when bar is tapped.
   *
   * Spec Requirement: "Tapping anywhere on this bar (the card, the text, or
   * the CTA) must navigate the user directly to the 'Cart' tab."
   *
   * Why navigation.navigate('Cart')?
   * - Switches to Cart tab in bottom tab navigator
   * - If already on Cart tab, does nothing (no unnecessary navigation)
   * - Maintains navigation state (back button still works)
   */
  const handlePress = () => {
    navigation.navigate('Cart');
  };

  /**
   * Position Calculation
   *
   * Calculate bottom offset to position bar above tab bar.
   *
   * Tab Bar Height: 60px (set in AppNavigator.js tabBarStyle)
   * Safe Area Insets: Device-specific bottom safe area
   * Total Offset: Tab bar height + safe area insets
   *
   * Why insets.bottom?
   * - On devices with home indicator (iPhone X+), provides extra spacing
   * - On devices without, equals 0
   * - Ensures bar doesn't overlap with system UI
   *
   * Example Values:
   * - iPhone SE: 60px (no home indicator)
   * - iPhone 14: 60px + 34px = 94px (with home indicator)
   *
   * Spec Requirement: "This component 'floats' persistently at the bottom
   * of the screen. It must be positioned above the 4-icon main tab bar."
   */
  const bottomOffset = 60 + insets.bottom;

  /**
   * Animation Interpolation
   *
   * Converts animation value (0-1) to actual pixel translation.
   *
   * slideAnim: 0 to 1
   * translateY: 150px to 0px
   *
   * Values:
   * - slideAnim = 0: translateY = 150px (hidden below screen)
   * - slideAnim = 0.5: translateY = 75px (halfway up)
   * - slideAnim = 1: translateY = 0px (fully visible)
   *
   * Why 150px?
   * - Enough to completely hide the bar below viewport
   * - Bar height (~70px) + padding + extra buffer
   * - Ensures clean entrance from below
   */
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0], // Slide up from 150px below to final position
  });

  /**
   * Render
   *
   * Component structure follows spec 4.2 requirements:
   * - Left section: Cart icon with badge + item count + subtotal
   * - Right section: "View Cart" CTA with chevron
   * - Dark background for high contrast
   * - Fully tappable surface
   */
  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomOffset,           // Position above tab bar
          transform: [{ translateY }],    // Slide animation
          opacity: fadeAnim,              // Fade animation
        },
      ]}
      pointerEvents={shouldShow ? 'auto' : 'none'}  // Disable touch when hidden
    >
      {/*
        TouchableOpacity - Full-width tappable surface

        Spec: "Tapping anywhere on this bar must navigate to Cart tab"

        activeOpacity: 0.85
        - Slight darkening on press provides tactile feedback
        - Subtle enough to maintain premium feel
        - Matches warm minimalist aesthetic
      */}
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <View style={styles.content}>
          {/*
            Left Section - Cart Summary

            Contains:
            1. Cart icon with badge (visual anchor)
            2. Item count text (e.g., "3 Items")
            3. Subtotal amount (e.g., "$24.50")

            Layout: Horizontal row with icon on left, text on right
          */}
          <View style={styles.leftSection}>
            {/*
              Cart Icon with Badge

              Icon: Shopping cart from Ionicons
              Color: dark.textPrimary (light color on dark background)
              Badge: Small circle with item count
            */}
            <View style={styles.iconContainer}>
              <Ionicons name="cart" size={22} color={colors.dark.textPrimary} />
              {itemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
              )}
            </View>

            {/*
              Text Container - Item Count and Subtotal

              Item Count: "3 Items" (or "1 Item" for singular)
              Subtotal: "$24.50" (always 2 decimal places)

              Typography Hierarchy:
              - Item count: Secondary text (smaller, subdued)
              - Subtotal: Primary text (larger, bold)
            */}
            <View style={styles.textContainer}>
              <Text style={styles.itemCountText}>
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
              </Text>
              <Text style={styles.subtotalText}>${subtotal.toFixed(2)}</Text>
            </View>
          </View>

          {/*
            Right Section - CTA Button

            "View Cart" button with forward chevron.

            Spec: "A clear CTA (e.g., 'View Cart')"

            Visual Design:
            - Primary color background (warm olive/terracotta)
            - Contrast text color for readability
            - Rounded corners maintain soft aesthetic
            - Chevron indicates forward navigation
          */}
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>View Cart</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.primary.contrast}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Styles
 *
 * Styling follows warm minimalist design philosophy and spec 4.2 requirements.
 *
 * Key Design Principles:
 * - High contrast dark background for visibility
 * - Generous spacing for touch-friendly interaction
 * - Rounded corners maintain soft, approachable aesthetic
 * - Platform-specific shadows for depth perception
 * - Clear visual hierarchy through size and weight
 */
const styles = StyleSheet.create({
  /**
   * Container - Positioning and Shadows
   *
   * Position:
   * - Absolute positioning floats bar above content
   * - left/right: 16px insets create breathing room at edges
   * - bottom: Calculated dynamically (60px + safe area insets)
   * - zIndex: 999 ensures bar appears above content but below modals
   *
   * Shadows:
   * - iOS: Custom shadow with upward offset creates "floating" effect
   * - Android: elevation: 12 provides material design depth
   * - Shadow direction: Upward (height: -4) suggests bar floating above
   *
   * Why Platform.select?
   * - iOS uses shadow properties (shadowColor, shadowOffset, etc.)
   * - Android uses elevation property
   * - Different APIs for same visual effect
   *
   * Design Philosophy:
   * - Subtle shadow suggests depth without harshness
   * - High contrast background + shadow = clear visibility
   * - Generous horizontal insets (16px) prevent edge-to-edge feel
   */
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 999, // Above content, below modals
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 }, // Shadow above (floating effect)
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 12, // Material design shadow
      },
    }),
  },

  /**
   * Touchable - Tap Surface
   *
   * borderRadius: 16px creates soft, rounded corners
   * overflow: 'hidden' ensures content respects rounded corners
   *
   * Why separate from content?
   * - TouchableOpacity applies press effect to entire surface
   * - Wrapping content in touchable makes whole bar tappable
   */
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },

  /**
   * Content - Main Bar Container
   *
   * Layout:
   * - flexDirection: 'row' arranges left/right sections horizontally
   * - justifyContent: 'space-between' pushes sections to edges
   * - alignItems: 'center' vertically centers content
   *
   * Background:
   * - dark.surfaceVariant provides high contrast against light screens
   * - Spec requirement: "Must have a high-contrast background"
   *
   * Padding:
   * - Horizontal: 20px provides breathing room for content
   * - Vertical: 16px ensures adequate touch target height
   *
   * Border Radius: 16px maintains rounded corners
   */
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.surfaceVariant, // High contrast dark background
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },

  /**
   * Left Section - Cart Summary
   *
   * Contains cart icon and text in horizontal row.
   * flex: 1 allows section to grow and fill available space.
   */
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  /**
   * Icon Container - Cart Icon with Badge
   *
   * position: 'relative' establishes positioning context for badge
   * marginRight: 12px creates space between icon and text
   */
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },

  /**
   * Badge - Item Count Indicator
   *
   * Small circular badge overlaying cart icon.
   *
   * Position:
   * - Absolute positioning relative to iconContainer
   * - top: -6, right: -6 positions on top-right edge of icon
   *
   * Shape:
   * - borderRadius: 10 with minWidth/height: 20 creates circle
   * - minWidth ensures single digits are centered
   * - paddingHorizontal: 4 allows expansion for 2+ digits
   *
   * Colors:
   * - badge.background: Warm accent color
   * - badge.text: High contrast for readability
   */
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.badge.background,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  /**
   * Badge Text
   *
   * Small, bold number showing item count.
   * fontSize: 11px keeps badge compact
   * fontWeight: 'bold' ensures legibility despite small size
   */
  badgeText: {
    color: colors.badge.text,
    fontSize: 11,
    fontWeight: 'bold',
  },

  /**
   * Text Container
   *
   * Holds item count and subtotal text.
   * flex: 1 allows text to fill available space.
   */
  textContainer: {
    flex: 1,
  },

  /**
   * Item Count Text
   *
   * "3 Items" or "1 Item" text.
   *
   * Typography:
   * - fontSize: 14px (secondary information)
   * - color: dark.textSecondary (subdued, less prominent)
   * - marginBottom: 2px creates small gap before subtotal
   *
   * Hierarchy: Secondary text, supports the more important subtotal below.
   */
  itemCountText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 2,
  },

  /**
   * Subtotal Text
   *
   * "$24.50" price display.
   *
   * Typography:
   * - fontSize: 18px (prominent, primary information)
   * - fontWeight: 'bold' emphasizes importance
   * - color: dark.textPrimary (high contrast, most visible)
   *
   * Hierarchy: Primary text, immediately shows user their cart total.
   */
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.textPrimary,
  },

  /**
   * CTA Button - "View Cart" Button
   *
   * Spec: "A clear CTA (e.g., 'View Cart')"
   *
   * Layout:
   * - flexDirection: 'row' arranges text and chevron horizontally
   * - alignItems: 'center' vertically centers content
   *
   * Visual:
   * - backgroundColor: primary.main (warm olive/terracotta)
   * - paddingVertical: 10px, paddingHorizontal: 16px creates touch target
   * - borderRadius: 12px maintains rounded aesthetic
   * - marginLeft: 12px separates from left section
   *
   * Design Philosophy:
   * - Primary color draws attention (warm, inviting)
   * - Adequate padding ensures thumb-friendly interaction
   * - Rounded corners align with warm minimalism
   * - Chevron indicates forward navigation (common pattern)
   */
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 12,
  },

  /**
   * CTA Text - "View Cart" Label
   *
   * Typography:
   * - fontSize: 15px (readable, prominent)
   * - fontWeight: '600' (semi-bold, confident)
   * - color: primary.contrast (high contrast against primary.main)
   * - marginRight: 4px creates space before chevron
   *
   * Design: Clear, actionable text that invites interaction.
   */
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary.contrast,
    marginRight: 4,
  },
});

export default FloatingCartBar;
