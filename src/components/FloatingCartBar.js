/**
 * FloatingCartBar.js
 *
 * Integrated cart summary bar that appears above the tab bar.
 * Provides immediate feedback when items are added to cart and quick access to cart screen.
 *
 * Design Reference: Dunkin', Uber Eats, DoorDash pattern
 *
 * Key Requirements:
 * - Position: Sits directly above the tab bar (integrated, not floating)
 * - Trigger: Animates in (slide up) when user taps "Add to Cart"
 * - Contents: Item count, running subtotal, "View Cart" CTA
 * - Action: Tapping navigates to Cart tab
 * - Dismissal: Animates out when cart is emptied or after checkout
 * - Aesthetic: Light background matching tab bar for seamless integration
 *
 * Design Philosophy - Warm Minimalism:
 * - Seamless visual integration with navigation (same background color)
 * - Non-intrusive feedback (slides in smoothly from below)
 * - Clear typography and spacing maintain readability
 * - Smooth animations feel premium and polished
 * - Single-purpose component reduces cognitive load
 *
 * Animation Behavior:
 * - Slide In: Spring animation (natural, bouncy feel) when cart gets first item
 * - Persistent: Remains visible as user navigates between tabs
 * - Slide Out: Smooth fade + slide when cart becomes empty
 * - Native Driver: Uses native animations for 60fps performance
 *
 * Implementation Note:
 * - Rendered inside CustomTabBar component (AppNavigator.js)
 * - No absolute positioning needed - normal component in render tree
 * - React Navigation handles layout and safe areas automatically
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import colors from '../theme/colors';
import { icon, typography } from '../theme';

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
   * Animation Interpolation
   *
   * Converts animation value (0-1) to actual pixel translation for slide effect.
   *
   * slideAnim: 0 to 1
   * translateY: 100px to 0px
   *
   * Values:
   * - slideAnim = 0: translateY = 100px (hidden below, slides down)
   * - slideAnim = 0.5: translateY = 50px (halfway)
   * - slideAnim = 1: translateY = 0px (fully visible)
   *
   * Why 100px?
   * - Cart bar height (~60-70px) + padding (~12-16px) = ~80-90px total
   * - 100px ensures complete hiding below the component's own height
   * - Slides up into view when cart has items, creating smooth emergence
   * - Works with normal component flow (no absolute positioning)
   */
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Slide up from below to visible position
  });

  /**
   * Render
   *
   * Component structure matches Dunkin' app pattern:
   * - Left section: Cart icon with badge + item count + subtotal
   * - Right section: "View Cart" CTA with chevron
   * - Light background matching nav bar for seamless integration
   * - Fully tappable surface
   * - Slides up from below when cart has items
   */
  return (
    <Animated.View
      style={[
        styles.container,
        {
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
              Color: light.textPrimary (dark color on light background)
              Badge: Small circle with item count
            */}
            <View style={styles.iconContainer}>
              <Ionicons name="cart" size={icon.md} color={colors.light.textPrimary} />
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
              size={icon.sm}
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
 * Styling matches Dunkin' app pattern with seamless nav bar integration.
 *
 * Key Design Principles:
 * - Light background matching nav bar (not dark/high-contrast)
 * - Subtle top border for minimal separation
 * - No shadows (flat design integrates with nav)
 * - Generous spacing for touch-friendly interaction
 * - Clear visual hierarchy through size and weight
 */
const styles = StyleSheet.create({
  /**
   * Container - Integrated Design
   *
   * Position:
   * - NO absolute positioning - normal component in render tree
   * - Rendered inside CustomTabBar component (above BottomTabBar)
   * - Full width - spans entire screen width naturally
   * - Background matches tab bar for seamless integration
   * - Subtle top border provides minimal visual separation
   *
   * Why no absolute positioning?
   * - React Navigation's CustomTabBar pattern handles layout
   * - Proper component hierarchy (cart bar above tab bar)
   * - No z-index or layering conflicts
   * - Tab bar remains fully interactive
   * - React Navigation handles safe areas automatically
   *
   * Why no shadows?
   * - Integrated design pattern doesn't need floating elevation
   * - Matches Dunkin' approach where cart bar sits ON the nav
   * - Cleaner, flatter design aesthetic
   * - Better performance
   *
   * Design Philosophy:
   * - Seamless visual integration through color matching
   * - Clean component hierarchy following React Navigation patterns
   * - Minimal border creates subtle separation without harshness
   */
  container: {
    backgroundColor: colors.light.surface, // Match nav bar background
    borderTopWidth: 1,
    borderTopColor: colors.light.border, // Subtle separation
  },

  /**
   * Touchable - Tap Surface
   *
   * No rounded corners - maintains flat, integrated appearance
   * Full-width tappable area for easy interaction
   *
   * Why no border radius?
   * - Matches nav bar's flat design (no rounded corners)
   * - Creates seamless visual integration
   * - Edges align with screen edges (no insets)
   */
  touchable: {
    // No border radius for seamless integration
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
   * - Transparent (inherits from container's light.surface)
   * - Matches nav bar background for seamless integration
   *
   * Padding:
   * - Horizontal: 16px matches nav bar padding for visual alignment
   * - Vertical: 12px creates comfortable touch target (48px min)
   *
   * No Border Radius: Maintains flat integration with nav
   */
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
   * Uses responsive typography from theme.
   */
  badgeText: {
    ...typography.styles.finePrint,
    fontWeight: '700',
    color: colors.badge.text,
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
   * Uses responsive typography from theme.
   *
   * Hierarchy: Secondary text, supports the more important subtotal below.
   * Color: Adapted for light background (dark text)
   */
  itemCountText: {
    ...typography.styles.body,
    color: colors.light.textSecondary,
    marginBottom: 2,
  },

  /**
   * Subtotal Text
   *
   * "$24.50" price display.
   * Uses responsive typography from theme.
   *
   * Hierarchy: Primary text, immediately shows user their cart total.
   * Color: Adapted for light background (dark text)
   */
  subtotalText: {
    ...typography.styles.h5,
    color: colors.light.textPrimary,
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
   * Uses responsive typography from theme.
   *
   * Design: Clear, actionable text that invites interaction.
   */
  ctaText: {
    ...typography.styles.button,
    color: colors.primary.contrast,
    marginRight: 4,
  },
});

export default FloatingCartBar;
