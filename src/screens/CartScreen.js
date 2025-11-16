/**
 * CartScreen Component
 *
 * Displays the shopping cart with the ability to:
 * - View all items added to cart
 * - Adjust item quantities with +/- controls
 * - Remove individual items or clear entire cart
 * - Apply promo codes for discounts
 * - View order summary with subtotal, delivery fee, tax, and total
 * - Proceed to checkout
 * - Handle empty cart state with CTA to browse menu
 *
 * Design Philosophy: Warm Minimalist
 * - Soft, muted color palette (sage green accent, terracotta secondary)
 * - Generous whitespace and rounded corners for approachability
 * - Subtle shadows for depth without heaviness
 * - Clean typography hierarchy for easy scanning
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

const CartScreen = () => {
  /**
   * Cart Items State Management
   *
   * Stores an array of cart items, each containing:
   * - id: Unique identifier for the item
   * - name: Display name of the kava drink
   * - category: Type/category (e.g., "Kava Cocktail")
   * - price: Unit price of the item (price per single item)
   * - quantity: Number of items in cart
   * - image: Emoji representation of the drink
   * - modifications: Array of customizations (size, add-ons, etc.)
   *
   * Mock data is used for demonstration. In production, this would be
   * managed by a global state manager (Redux, Context API, etc.)
   */
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sunset Serenity',
      category: 'Kava Cocktail',
      price: 12.00,
      quantity: 2,
      image: '🥥',
      modifications: ['Large', 'Extra Shot'],
    },
    {
      id: 2,
      name: 'Island Dreams',
      category: 'Kava Cocktail',
      price: 14.00,
      quantity: 1,
      image: '🌺',
      modifications: ['Medium'],
    },
  ]);

  /**
   * Promo Code State
   * Stores the user-entered promo code text
   * In production, this would be validated and applied to order calculations
   */
  const [promoCode, setPromoCode] = useState('');

  /**
   * Update Quantity Handler
   *
   * Handles the +/- button clicks to adjust item quantities.
   *
   * Logic Flow:
   * 1. Find the item by id
   * 2. Calculate new quantity (current + change)
   * 3. Use Math.max(0, newQty) to prevent negative quantities
   * 4. If new quantity is 0, return null (item will be removed)
   * 5. Otherwise, update the item with new quantity
   * 6. Filter out null values to remove items with 0 quantity
   *
   * @param {number} id - The id of the cart item to update
   * @param {number} change - The quantity change (+1 or -1)
   *
   * Example: User has 2 items, clicks minus button
   * - change = -1
   * - newQty = 2 + (-1) = 1
   * - Item quantity updates to 1
   *
   * Example: User has 1 item, clicks minus button
   * - change = -1
   * - newQty = 1 + (-1) = 0
   * - Item is removed from cart
   */
  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.quantity + change);
            return newQty === 0 ? null : { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  /**
   * Remove Item Handler
   *
   * Immediately removes an item from the cart when the trash icon is clicked.
   * Uses array filter to create a new array excluding the item with matching id.
   *
   * @param {number} id - The id of the cart item to remove
   */
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * Clear All Handler
   *
   * Removes all items from the cart at once when "Clear All" is clicked.
   * Sets cartItems to an empty array, triggering the empty cart state.
   */
  const clearAll = () => {
    setCartItems([]);
  };

  /**
   * Order Calculations
   *
   * Subtotal: Sum of (price × quantity) for all items in cart
   * - Uses reduce() to accumulate total price
   * - Example: (12.00 × 2) + (14.00 × 1) = 24.00 + 14.00 = 38.00
   *
   * Delivery Fee: Flat rate of $3.00
   * - In production, this might vary based on distance or order size
   *
   * Tax: Calculated as 8% of subtotal
   * - Formula: subtotal × 0.08
   * - Example: 38.00 × 0.08 = 3.04
   *
   * Total: Sum of subtotal + delivery fee + tax
   * - Example: 38.00 + 3.00 + 3.04 = 44.04
   *
   * All values are formatted to 2 decimal places when displayed
   */
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 3.0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  /**
   * Empty Cart Component
   *
   * Displayed when cartItems.length === 0
   *
   * Features:
   * - Large shopping bag icon in a circular container with accent color
   * - Friendly message explaining cart is empty
   * - Call-to-action button to browse the menu
   *
   * Warm Minimalist Design Elements:
   * - Icon container uses accent color with 15% opacity for soft background
   * - Centered layout with generous spacing
   * - Rounded button with accent background color
   * - Encourages user action without being pushy
   */
  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      {/* Icon Container - Circular background with shopping bag icon */}
      <View style={styles.emptyIconContainer}>
        <Feather name="shopping-bag" size={48} color={colors.accent} />
      </View>
      {/* Primary Message */}
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      {/* Secondary Message */}
      <Text style={styles.emptyText}>Add some kava goodness to get started</Text>
      {/* Call-to-Action Button */}
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse Menu</Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Main Render
   *
   * Conditional rendering based on cart state:
   * - If cart is empty: Show EmptyCart component
   * - If cart has items: Show scrollable list with items, promo, summary, and checkout
   *
   * Layout Structure:
   * 1. SafeAreaView container (respects device safe areas)
   * 2. Header with title and optional "Clear All" button
   * 3. Conditional content (empty state OR cart items)
   * 4. Sticky checkout button (positioned absolutely at bottom)
   */
  return (
    <SafeAreaView style={styles.container}>
      {/* ========================================
          HEADER SECTION
          - Shows "Cart" title
          - Conditionally shows "Clear All" button when items exist
          - Uses flexbox for space-between alignment
          ======================================== */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ========================================
          CONDITIONAL CONTENT
          - Empty cart: Show EmptyCart component
          - Has items: Show ScrollView with all cart content
          ======================================== */}
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* ========================================
                CART ITEMS SECTION
                Maps through cartItems array to display each item

                Item Structure:
                1. Image container with emoji
                2. Item details (name, category, modifications)
                3. Remove button (trash icon)
                4. Footer with price and quantity controls

                Warm Minimalist Design:
                - Rounded cards with soft shadows
                - Gentle spacing between items
                - Accent color for interactive elements
                ======================================== */}
            <View style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  {/* Item Image - Emoji in rounded container */}
                  <View style={styles.itemImageContainer}>
                    <Text style={styles.itemImage}>{item.image}</Text>
                  </View>

                  {/* Item Details Section */}
                  <View style={styles.itemDetails}>
                    {/* Item Header - Name and Remove Button */}
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={() => removeItem(item.id)}
                        style={styles.removeButton}
                      >
                        <Feather name="trash-2" size={16} color={colors.error} />
                      </TouchableOpacity>
                    </View>

                    {/* Item Category */}
                    <Text style={styles.itemCategory}>{item.category}</Text>

                    {/* Modifications Tags
                        - Displays customizations like size, add-ons
                        - Each tag has accent background with rounded corners
                        - Wraps to multiple lines if needed */}
                    <View style={styles.modificationsContainer}>
                      {item.modifications.map((mod, index) => (
                        <View key={index} style={styles.modificationTag}>
                          <Text style={styles.modificationText}>{mod}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Item Footer - Price and Quantity Controls */}
                    <View style={styles.itemFooter}>
                      {/* Total Price - Calculated as (unit price × quantity) */}
                      <Text style={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>

                      {/* Quantity Controls
                          - Minus button: Decreases quantity by 1 (removes if reaches 0)
                          - Quantity display: Shows current quantity
                          - Plus button: Increases quantity by 1

                          Design: Elevated white buttons on light background
                          for clear affordance */}
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, -1)}
                          style={styles.quantityButton}
                        >
                          <Feather name="minus" size={16} color={colors.primary} />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, 1)}
                          style={styles.quantityButton}
                        >
                          <Feather name="plus" size={16} color={colors.primary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* ========================================
                PROMO CODE SECTION
                Allows users to enter and apply discount codes

                Features:
                - Percent icon (terracotta color for visual interest)
                - Text input for code entry
                - Apply button to submit code

                Design:
                - Rounded card matching cart items
                - Horizontal layout with icon, input, and button
                - Uses terracotta accent to stand out from main accent color
                ======================================== */}
            <View style={styles.promoContainer}>
              <Feather name="percent" size={20} color={colors.terracotta} />
              <TextInput
                style={styles.promoInput}
                placeholder="Add promo code"
                placeholderTextColor={colors.secondary}
                value={promoCode}
                onChangeText={setPromoCode}
              />
              <TouchableOpacity>
                <Text style={styles.promoApplyButton}>Apply</Text>
              </TouchableOpacity>
            </View>

            {/* ========================================
                ORDER SUMMARY SECTION
                Displays cost breakdown and total

                Breakdown:
                1. Subtotal - Sum of all item prices × quantities
                2. Delivery Fee - Flat $3.00 charge
                3. Tax - 8% of subtotal
                4. Divider line for visual separation
                5. Total - Sum of all above

                Design:
                - Rounded card with generous padding
                - Secondary color for labels, primary for values
                - Larger, bolder text for total to emphasize
                - Gray divider creates hierarchy
                ======================================== */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              {/* Subtotal Row */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              {/* Delivery Fee Row */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>

              {/* Tax Row */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>

              {/* Visual Divider */}
              <View style={styles.summaryDivider} />

              {/* Total Row - Emphasized with larger font and bold weight */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            {/* Bottom padding to ensure content is not hidden behind sticky button */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* ========================================
              STICKY CHECKOUT BUTTON
              Positioned absolutely at bottom of screen

              Features:
              - Always visible while scrolling
              - Full-width button with premium shadow
              - Accent color background for clear call-to-action
              - Border top to separate from content

              Design Strategy:
              - Absolute positioning keeps it fixed
              - Background color matches screen to create floating effect
              - Premium shadow adds depth and importance
              - In production, this would navigate to checkout flow
              ======================================== */}
          <View style={styles.checkoutContainer}>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Continue to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

/**
 * STYLESHEET
 *
 * Warm Minimalist Design System Applied:
 *
 * COLOR PALETTE:
 * - Background: #FAFAF8 (soft off-white, easy on eyes)
 * - Surface: #FFFFFF (clean white for cards)
 * - Primary: #1C1C1E (near black for text, high contrast)
 * - Secondary: #8E8E93 (muted gray for supporting text)
 * - Accent: #6B7F47 (sage green, calming and natural)
 * - Terracotta: #B8654B (warm orange-brown for variety)
 *
 * SPACING STRATEGY:
 * - Generous padding creates breathing room
 * - Consistent spacing values from theme
 * - More space = more calm, less cluttered feel
 *
 * SHADOWS:
 * - Soft shadows for subtle depth
 * - Premium shadows for important actions
 * - Never harsh or heavy
 *
 * TYPOGRAPHY:
 * - Clear hierarchy with size and weight
 * - High contrast for readability
 * - Generous line spacing
 *
 * BORDER RADIUS:
 * - Rounded corners throughout (xl, xxl)
 * - Creates friendly, approachable feel
 * - Never sharp or aggressive
 */
const styles = StyleSheet.create({
  /* ============================================
     LAYOUT CONTAINERS
     ============================================ */
  container: {
    flex: 1,
    backgroundColor: colors.background, // Soft off-white background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl, // Generous horizontal padding
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.xxxl, // Large, bold title
    fontWeight: typography.bold,
    color: colors.primary, // High contrast for readability
  },
  clearButton: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent, // Sage green for interactive element
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl, // Extra padding at bottom
  },

  /* ============================================
     EMPTY CART STATE
     Centered, friendly, encouraging design
     ============================================ */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // Perfect circle
    backgroundColor: `${colors.accent}15`, // 15% opacity for soft tint
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.xl,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.base,
    color: colors.secondary, // Muted gray for secondary message
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  browseButton: {
    backgroundColor: colors.accent, // Sage green for CTA
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl, // Rounded for friendly feel
  },
  browseButtonText: {
    color: colors.white,
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  /* ============================================
     CART ITEMS
     Card-based design with soft shadows
     ============================================ */
  itemsContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg, // Space between cart item cards
  },
  cartItem: {
    backgroundColor: colors.surface, // Clean white cards
    borderRadius: borderRadius.xxl, // Extra rounded corners
    padding: spacing.lg, // Generous internal padding
    flexDirection: 'row',
    gap: spacing.lg,
    ...shadows.soft, // Subtle elevation without harshness
  },
  itemImageContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl, // Rounded container
    backgroundColor: `${colors.accent}15`, // Soft sage green tint
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    fontSize: 32, // Large emoji for visual interest
  },
  itemDetails: {
    flex: 1, // Takes remaining space
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  itemName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    flex: 1, // Allows text to wrap if needed
  },
  removeButton: {
    padding: spacing.xs, // Touchable area larger than icon
  },
  itemCategory: {
    fontSize: typography.xs,
    color: colors.secondary, // Muted gray for supporting info
    marginBottom: spacing.sm,
  },
  modificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wraps to multiple lines if needed
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  modificationTag: {
    backgroundColor: `${colors.accent}15`, // Soft sage green background
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.round, // Pill-shaped tags
  },
  modificationText: {
    fontSize: typography.xs,
    color: colors.accent, // Sage green text
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.primary, // Emphasize price
  },

  /* ============================================
     QUANTITY CONTROLS
     Elevated buttons on light background
     ============================================ */
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHover, // Slightly darker than white
    borderRadius: borderRadius.sm,
    padding: 4,
    gap: spacing.md,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: colors.white, // Elevated white buttons
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft, // Subtle shadow for depth
  },
  quantityText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.primary,
    minWidth: 20,
    textAlign: 'center',
  },
  /* ============================================
     PROMO CODE SECTION
     Terracotta accent for visual variety
     ============================================ */
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface, // White card
    borderRadius: borderRadius.xxl, // Extra rounded
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    gap: spacing.md,
    ...shadows.soft, // Subtle elevation
  },
  promoInput: {
    flex: 1, // Takes available space
    fontSize: typography.base,
    color: colors.primary,
  },
  promoApplyButton: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent, // Sage green for action
  },

  /* ============================================
     ORDER SUMMARY
     Clean breakdown of costs with hierarchy
     ============================================ */
  summaryContainer: {
    backgroundColor: colors.surface, // White card
    borderRadius: borderRadius.xxl, // Extra rounded
    padding: spacing.xl, // More padding for importance
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    ...shadows.soft, // Subtle elevation
  },
  summaryTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md, // Consistent spacing between rows
  },
  summaryLabel: {
    fontSize: typography.sm,
    color: colors.secondary, // Muted gray for labels
  },
  summaryValue: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary, // High contrast for values
  },
  summaryDivider: {
    height: 1, // Thin divider line
    backgroundColor: colors.gray200, // Light gray
    marginVertical: spacing.md,
  },
  summaryTotalLabel: {
    fontSize: typography.md, // Larger than other labels
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  summaryTotalValue: {
    fontSize: typography.lg, // Largest font size
    fontWeight: typography.bold, // Boldest weight
    color: colors.primary, // Emphasizes final total
  },

  /* ============================================
     STICKY CHECKOUT BUTTON
     Always visible, premium feel
     ============================================ */
  checkoutContainer: {
    position: 'absolute', // Positioned absolutely for sticky effect
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background, // Matches screen background
    borderTopWidth: 1,
    borderTopColor: colors.gray200, // Subtle separator
  },
  checkoutButton: {
    backgroundColor: colors.accent, // Sage green for primary action
    paddingVertical: spacing.lg, // Tall, easy to tap
    borderRadius: borderRadius.xxl, // Extra rounded for friendly feel
    alignItems: 'center',
    ...shadows.premium, // Stronger shadow for importance
  },
  checkoutButtonText: {
    color: colors.white, // High contrast on sage green
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
});

export default CartScreen;
