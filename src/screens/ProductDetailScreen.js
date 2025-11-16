import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }) => {
  // Sample product data - can be passed via route.params
  const product = route?.params?.product || {
    name: 'Sunset Serenity',
    category: 'Kava Cocktails',
    price: 12.00,
    description: 'A smooth blend of traditional kava root with coconut water, pineapple, and a hint of vanilla. This signature drink offers the perfect balance of earthy kava notes with tropical sweetness, creating a calming and delicious experience.',
    image: 'https://via.placeholder.com/400x400/A67B5B/FFFFFF?text=Sunset+Serenity',
    color: '#A67B5B',
  };

  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const sizes = [
    { label: 'Small', price: 0 },
    { label: 'Medium', price: 0 },
    { label: 'Large', price: 2.00 },
  ];

  const addons = [
    { id: 'extra-shot', label: 'Extra Shot', price: 3.00 },
    { id: 'cbd', label: 'CBD', price: 5.00 },
    { id: 'flavor-boost', label: 'Flavor Boost', price: 1.50 },
  ];

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const calculateTotal = () => {
    let total = product.price;

    // Add size upcharge
    const sizeUpcharge = sizes.find((s) => s.label === selectedSize)?.price || 0;
    total += sizeUpcharge;

    // Add addons
    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    });

    return (total * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    // In a real app, this would add to cart context/state
    const cartItem = {
      ...product,
      size: selectedSize,
      addons: selectedAddons,
      quantity,
      total: calculateTotal(),
    };

    console.log('Adding to cart:', cartItem);

    // Show confirmation and navigate back or show cart
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAF8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={[styles.imageBg, { backgroundColor: product.color + '20' }]}>
            <Text style={styles.imageEmoji}>🥥</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Size Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Size</Text>
            <View style={styles.optionsRow}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.label}
                  style={[
                    styles.pill,
                    selectedSize === size.label && styles.pillSelected,
                  ]}
                  onPress={() => setSelectedSize(size.label)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      selectedSize === size.label && styles.pillTextSelected,
                    ]}
                  >
                    {size.label}
                  </Text>
                  {size.price > 0 && (
                    <Text
                      style={[
                        styles.pillPrice,
                        selectedSize === size.label && styles.pillPriceSelected,
                      ]}
                    >
                      +${size.price.toFixed(2)}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Add-ons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add-ons (Optional)</Text>
            <View style={styles.optionsRow}>
              {addons.map((addon) => (
                <TouchableOpacity
                  key={addon.id}
                  style={[
                    styles.pill,
                    selectedAddons.includes(addon.id) && styles.pillSelected,
                  ]}
                  onPress={() => toggleAddon(addon.id)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      selectedAddons.includes(addon.id) && styles.pillTextSelected,
                    ]}
                  >
                    {addon.label}
                  </Text>
                  <Text
                    style={[
                      styles.pillPrice,
                      selectedAddons.includes(addon.id) && styles.pillPriceSelected,
                    ]}
                  >
                    +${addon.price.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Spacer for sticky button */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Sticky Add to Cart Button */}
      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6B7F47', '#5A6B3B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.addToCartText}>
              Add to Cart • ${calculateTotal()}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFAF8',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1C1C1E',
    fontWeight: '400',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    padding: 20,
  },
  imageBg: {
    flex: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageEmoji: {
    fontSize: 120,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  category: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
    letterSpacing: -1,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6B7F47',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6C6C70',
    marginBottom: 32,
    fontWeight: '400',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5E7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  pillSelected: {
    backgroundColor: '#6B7F47',
    borderColor: '#6B7F47',
    shadowColor: '#6B7F47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
  pillPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
  },
  pillPriceSelected: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5E7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#1C1C1E',
  },
  quantityDisplay: {
    minWidth: 60,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5E7',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FAFAF8',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  addToCartButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6B7F47',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default ProductDetailScreen;
