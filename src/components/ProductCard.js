import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../theme';

/**
 * ProductCard - Product display card component
 * Shows product image, category, name, price, and add button
 *
 * @param {string} image - Product image URL or emoji
 * @param {string} category - Product category label
 * @param {string} name - Product name
 * @param {string|number} price - Product price (formatted or number)
 * @param {string} backgroundColor - Background color for image area
 * @param {function} onAddPress - Callback when add button is pressed
 * @param {object} style - Additional styles for the card container
 */
const ProductCard = ({
  image,
  category,
  name,
  price,
  backgroundColor,
  onAddPress,
  style
}) => {
  const isEmoji = typeof image === 'string' && !image.startsWith('http');
  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <View style={[styles.container, style]}>
      {/* Product Image */}
      <View
        style={[
          styles.imageContainer,
          backgroundColor && { backgroundColor: backgroundColor + '20' }
        ]}
      >
        {isEmoji ? (
          <Text style={styles.emoji}>{image}</Text>
        ) : (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {category && (
          <Text style={styles.category} numberOfLines={1}>
            {category}
          </Text>
        )}
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        {/* Price and Add Button */}
        <View style={styles.footer}>
          <Text style={styles.price}>{formattedPrice}</Text>
          <TouchableOpacity
            onPress={onAddPress}
            style={styles.addButton}
            activeOpacity={0.7}
          >
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.soft,
  },
  imageContainer: {
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray100,
  },
  emoji: {
    fontSize: 50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: theme.spacing.lg,
  },
  category: {
    fontSize: theme.typography.xs,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  name: {
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.typography.base,
    fontWeight: theme.typography.bold,
    color: theme.colors.primary,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.soft,
  },
  addIcon: {
    fontSize: 18,
    fontWeight: theme.typography.bold,
    color: theme.colors.white,
    lineHeight: 20,
  },
});

export default ProductCard;
