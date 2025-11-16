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
 * Specification 4.2 from ui-ux.md:
 * - Floats at bottom above tab bar
 * - Shows item count and subtotal
 * - "View Cart" CTA button
 * - Animates in when item added
 * - Dismisses when cart empty
 * - High contrast background (dark)
 * - Tappable to navigate to Cart
 *
 * Position: Floats persistently at the bottom, above the 4-icon tab bar
 * Behavior:
 * - Hidden when cart is empty
 * - Animates in (slide up) when user taps "Add to Cart"
 * - Remains persistent as user navigates
 * - Dismisses when cart is emptied or after checkout
 */

const FloatingCartBar = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { cartItems, getCartTotal, getItemCount, isCartBarVisible } = useCart();

  // Animation value for slide up/down
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const itemCount = getItemCount();
  const subtotal = getCartTotal();
  const shouldShow = isCartBarVisible && itemCount > 0;

  useEffect(() => {
    if (shouldShow) {
      // Animate in
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 10,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [shouldShow]);

  // Don't render if cart is empty and animation is complete
  if (!shouldShow && slideAnim._value === 0) {
    return null;
  }

  const handlePress = () => {
    // Navigate to Cart tab
    navigation.navigate('Cart');
  };

  // Calculate bottom position (above tab bar)
  // Tab bar is typically 60-80px, we add safe area insets
  const bottomOffset = 60 + insets.bottom;

  // Interpolate animation values
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0], // Slide up from bottom
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomOffset,
          transform: [{ translateY }],
          opacity: fadeAnim,
        },
      ]}
      pointerEvents={shouldShow ? 'auto' : 'none'}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <View style={styles.content}>
          {/* Left: Item Count and Cart Icon */}
          <View style={styles.leftSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="cart" size={22} color={colors.dark.textPrimary} />
              {itemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemCountText}>
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
              </Text>
              <Text style={styles.subtotalText}>${subtotal.toFixed(2)}</Text>
            </View>
          </View>

          {/* Right: CTA Button */}
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>View Cart</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.primary.contrast} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 999,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.surfaceVariant, // High contrast dark background
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
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
  badgeText: {
    color: colors.badge.text,
    fontSize: 11,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  itemCountText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 2,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark.textPrimary,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 12,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary.contrast,
    marginRight: 4,
  },
});

export default FloatingCartBar;
