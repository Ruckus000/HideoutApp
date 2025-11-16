import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../theme';

/**
 * A card component that displays product information, including an image or emoji,
 * category, name, and price. It also features an "add" button to allow users to
 * add the product to their cart.
 *
 * @param {object} props - The component props.
 * @param {string} props.image - The URL of the product image or an emoji to display.
 * @param {string} props.category - The category of the product.
 * @param {string} props.name - The name of the product.
 * @param {string|number} props.price - The price of the product, either as a formatted string or a number.
 * @param {string} props.backgroundColor - The background color for the image container.
 * @param {function} props.onAddPress - The function to call when the add button is pressed.
 * @param {object} props.style - Additional styles to apply to the card container.
 * @returns {JSX.Element} The rendered ProductCard component.
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
