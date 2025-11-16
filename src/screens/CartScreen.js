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
        <Feather name="shopping-bag" size={48} color={colors.accent} />
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
      {/* Header */}
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
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Cart Items */}
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
                        <Feather name="trash-2" size={16} color={colors.error} />
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

            {/* Promo Code */}
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

            {/* Order Summary */}
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

            {/* Bottom padding for sticky button */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Sticky Checkout Button */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.xxxl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  clearButton: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${colors.accent}15`,
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
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  browseButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  itemsContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  cartItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    flexDirection: 'row',
    gap: spacing.lg,
    ...shadows.soft,
  },
  itemImageContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    backgroundColor: `${colors.accent}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    fontSize: 32,
  },
  itemDetails: {
    flex: 1,
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
    flex: 1,
  },
  removeButton: {
    padding: spacing.xs,
  },
  itemCategory: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginBottom: spacing.sm,
  },
  modificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  modificationTag: {
    backgroundColor: `${colors.accent}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.round,
  },
  modificationText: {
    fontSize: typography.xs,
    color: colors.accent,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHover,
    borderRadius: borderRadius.sm,
    padding: 4,
    gap: spacing.md,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft,
  },
  quantityText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.primary,
    minWidth: 20,
    textAlign: 'center',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    gap: spacing.md,
    ...shadows.soft,
  },
  promoInput: {
    flex: 1,
    fontSize: typography.base,
    color: colors.primary,
  },
  promoApplyButton: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    ...shadows.soft,
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
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  summaryValue: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: spacing.md,
  },
  summaryTotalLabel: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  summaryTotalValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  checkoutButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xxl,
    alignItems: 'center',
    ...shadows.premium,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
});

export default CartScreen;
