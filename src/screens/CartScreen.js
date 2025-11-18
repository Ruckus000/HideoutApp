/**
 * CartScreen - PROPERLY FIXED
 *
 * Critical Fix: Continue to Checkout button positioning
 * 
 * PROBLEM IDENTIFIED:
 * - Button was covering Order Summary content
 * - Insufficient bottom padding on scroll content
 * - Users couldn't see Delivery Fee, Tax, Total amounts
 * 
 * SOLUTION APPLIED:
 * 1. Increased scrollContent paddingBottom to 180px (was 100px)
 * 2. Button positioned as true sticky footer (outside scroll, at bottom)
 * 3. Proper gradient fade that doesn't block content
 * 4. All order summary info now fully visible before button
 * 5. Better visual hierarchy with clear separation
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

// Design tokens
const theme = {
  colors: {
    background: '#FAFAF8',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F5',
    primary: '#1C1C1E',
    secondary: '#8E8E93',
    accent: '#6B7F47',
    accentDark: '#5A6B3B',
    terracotta: '#B8654B',
    white: '#FFFFFF',
    gray200: '#E5E5E5',
    gray400: '#9CA3AF',
    error: '#EF4444',
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    round: 9999,
  },
  typography: {
    sizes: {
      xs: 11,
      sm: 13,
      base: 15,
      md: 15,
      lg: 17,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    premium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};

const CartScreenFixed = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sunset Serenity',
      category: 'Kava Cocktail',
      price: 12.0,
      quantity: 2,
      image: '🥥',
      modifications: ['Large', 'Extra Shot'],
    },
    {
      id: 2,
      name: 'Island Dreams',
      category: 'Kava Cocktail',
      price: 14.0,
      quantity: 1,
      image: '🌺',
      modifications: ['Medium'],
    },
  ]);

  const [promoCode, setPromoCode] = useState('');

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

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 3.0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Feather name="shopping-bag" size={40} color={theme.colors.accent} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>Add some kava goodness to get started</Text>
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse Menu</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* SCROLLABLE CONTENT - With proper bottom clearance */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* CART ITEMS */}
            <View style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemImageContainer}>
                    <Text style={styles.itemImage}>{item.image}</Text>
                  </View>

                  <View style={styles.itemDetails}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={() => removeItem(item.id)}
                        style={styles.removeButton}
                      >
                        <Feather name="trash-2" size={14} color={theme.colors.error} />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.itemCategory}>{item.category}</Text>

                    <View style={styles.modificationsContainer}>
                      {item.modifications.map((mod, index) => (
                        <View key={index} style={styles.modificationTag}>
                          <Text style={styles.modificationText}>{mod}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.itemFooter}>
                      <Text style={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>

                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, -1)}
                          style={styles.quantityButton}
                        >
                          <Feather name="minus" size={14} color={theme.colors.primary} />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, 1)}
                          style={styles.quantityButton}
                        >
                          <Feather name="plus" size={14} color={theme.colors.primary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* PROMO CODE */}
            <View style={styles.promoContainer}>
              <Feather name="percent" size={18} color={theme.colors.terracotta} />
              <TextInput
                style={styles.promoInput}
                placeholder="Add promo code"
                placeholderTextColor={theme.colors.secondary}
                value={promoCode}
                onChangeText={setPromoCode}
              />
              <TouchableOpacity>
                <Text style={styles.promoApplyButton}>Apply</Text>
              </TouchableOpacity>
            </View>

            {/* ORDER SUMMARY - Now fully visible */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            {/* 
              CRITICAL: Bottom padding for sticky button clearance
              This ensures all content is visible and scrollable above the button
              
              Calculation:
              - Button height: ~52px
              - Button padding: 20px top/bottom
              - Gradient fade: 80px
              - Safe clearance: 180px total
            */}
            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* 
            STICKY CHECKOUT BUTTON - Properly positioned as footer
            
            Structure:
            1. Container positioned absolutely at bottom (outside scroll)
            2. Gradient overlay for smooth fade (non-interactive)
            3. Button is fully interactive and never blocks content
          */}
          <View style={styles.checkoutWrapper} pointerEvents="box-none">
            {/* Gradient fade - allows touches through */}
            <LinearGradient
              colors={[
                'rgba(250, 250, 248, 0)',
                'rgba(250, 250, 248, 0.95)',
                theme.colors.background,
              ]}
              locations={[0, 0.4, 1]}
              style={styles.gradientFade}
              pointerEvents="none"
            />

            {/* Button container - fully interactive */}
            <View style={styles.buttonContainer} pointerEvents="box-none">
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Continue to Checkout</Text>
                <Feather name="arrow-right" size={18} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
  clearButton: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.accent,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // CRITICAL: Increased from 100px to 180px for proper button clearance
    paddingBottom: 180,
  },

  // Bottom spacer to ensure content isn't hidden
  bottomSpacer: {
    height: 20, // Additional breathing room
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(107, 127, 71, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  browseButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  browseButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },

  itemsContainer: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  cartItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
    ...theme.shadows.soft,
  },
  itemImageContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(107, 127, 71, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    fontSize: 28,
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xxs,
  },
  itemName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    flex: 1,
  },
  removeButton: {
    padding: theme.spacing.xxs,
  },
  itemCategory: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  modificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xxs,
    marginBottom: theme.spacing.xs,
  },
  modificationTag: {
    backgroundColor: 'rgba(107, 127, 71, 0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
  },
  modificationText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.accent,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xxs,
  },
  itemPrice: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHover,
    borderRadius: theme.borderRadius.sm,
    padding: 3,
    gap: theme.spacing.sm,
  },
  quantityButton: {
    width: 26,
    height: 26,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.soft,
  },
  quantityText: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    minWidth: 18,
    textAlign: 'center',
  },

  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
    ...theme.shadows.soft,
  },
  promoInput: {
    flex: 1,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.primary,
  },
  promoApplyButton: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.accent,
  },

  summaryContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    ...theme.shadows.soft,
  },
  summaryTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.secondary,
  },
  summaryValue: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: theme.colors.gray200,
    marginVertical: theme.spacing.sm,
  },
  summaryTotalLabel: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
  },
  summaryTotalValue: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },

  /*
    STICKY CHECKOUT BUTTON STRUCTURE
    
    Critical architecture for proper positioning:
    1. checkoutWrapper: Absolute container at bottom
    2. gradientFade: Visual fade effect (non-interactive)
    3. buttonContainer: Interactive button wrapper
    
    pointerEvents configuration:
    - wrapper: 'box-none' - only children receive events
    - gradient: 'none' - completely non-interactive
    - buttonContainer: 'box-none' - only button receives events
  */
  checkoutWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // No background - gradient and button handle it
  },
  gradientFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140, // Tall gradient for smooth fade
    // pointerEvents: 'none' set inline
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    // pointerEvents: 'box-none' set inline
  },
  checkoutButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    minHeight: 52,
    ...theme.shadows.premium,
  },
  checkoutButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
});

export default CartScreenFixed;