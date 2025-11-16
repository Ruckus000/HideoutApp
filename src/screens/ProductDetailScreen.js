/**
 * ProductDetailScreen Component
 *
 * Purpose:
 * This screen displays comprehensive product details and allows users to customize
 * their order before adding items to their cart. It implements the "Warm Minimalist"
 * design philosophy as specified in ui-ux.md Section 5.2.
 *
 * Key Features:
 * - Large, high-quality product image display
 * - Product information (name, category, price, description)
 * - Size selection with dynamic price adjustments
 * - Multiple add-on selections (Extra Shot, CBD, Flavor Boost)
 * - Quantity control with increment/decrement
 * - Real-time total price calculation
 * - Sticky "Add to Cart" button for thumb-friendly accessibility
 *
 * Design Alignment (ui-ux.md Section 5.2):
 * This screen follows the "BrewNow" visual grammar with warm kava-centric theming:
 * - Generous use of negative space for clean, uncluttered interface
 * - Warm color palette (#6B7F47 primary green, #FAFAF8 background)
 * - Clean typography hierarchy with consistent font weights
 * - Pill-based selection controls for intuitive interaction
 * - Thumb-friendly CTA placement at bottom of screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }) => {
  /**
   * Product Data
   *
   * The product object is passed via route.params from the previous screen.
   * Falls back to sample data for testing/development purposes.
   *
   * Structure:
   * - name: Product display name
   * - category: Product category (e.g., "Kava Cocktails")
   * - price: Base price (Medium size default)
   * - description: Detailed product description
   * - image: Product image URL or placeholder
   * - color: Brand color for visual theming
   */
  const product = route?.params?.product || {
    name: 'Sunset Serenity',
    category: 'Kava Cocktails',
    price: 12.00,
    description: 'A smooth blend of traditional kava root with coconut water, pineapple, and a hint of vanilla. This signature drink offers the perfect balance of earthy kava notes with tropical sweetness, creating a calming and delicious experience.',
    image: 'https://via.placeholder.com/400x400/A67B5B/FFFFFF?text=Sunset+Serenity',
    color: '#A67B5B',
  };

  /**
   * State Management
   *
   * selectedSize: Tracks the currently selected size option (Small, Medium, or Large)
   *   - Default: 'Medium' (base price, no upcharge)
   *   - Used in calculateTotal() to add size upcharge to final price
   *
   * selectedAddons: Array of add-on IDs that user has selected
   *   - Default: [] (empty array - no add-ons selected)
   *   - Supports multiple selections (user can select all three if desired)
   *   - Each selected add-on's price is added to the total
   *
   * quantity: Number of items to add to cart
   *   - Default: 1
   *   - Minimum: 1 (enforced in decrementQuantity)
   *   - Maximum: Unlimited (user can increment as needed)
   *   - Final total = (base + size + add-ons) × quantity
   */
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  /**
   * Size Options Configuration
   *
   * Defines available drink sizes with price adjustments:
   * - Small: No upcharge ($0.00) - typically smaller portion
   * - Medium: No upcharge ($0.00) - standard/default size (product.price is based on this)
   * - Large: +$2.00 upcharge - larger portion size
   *
   * Price Logic:
   * The product.price represents the Medium size. Small and Medium have $0 upcharge,
   * while Large adds $2.00 to the base price. This upcharge is applied in calculateTotal().
   *
   * UI Presentation:
   * Rendered as pill-shaped buttons with the upcharge displayed when > $0
   */
  const sizes = [
    { label: 'Small', price: 0 },
    { label: 'Medium', price: 0 },
    { label: 'Large', price: 2.00 },
  ];

  /**
   * Add-ons Configuration
   *
   * Defines optional product enhancements with individual pricing:
   * - Extra Shot: +$3.00 - Additional kava shot for stronger effect
   * - CBD: +$5.00 - Add CBD oil for enhanced relaxation
   * - Flavor Boost: +$1.50 - Extra flavoring for enhanced taste
   *
   * Selection Logic:
   * - Multiple add-ons can be selected simultaneously (not mutually exclusive)
   * - Each selected add-on's price is summed in calculateTotal()
   * - User can toggle add-ons on/off via toggleAddon()
   *
   * UI Presentation:
   * Rendered as pill-shaped toggle buttons that change appearance when selected
   */
  const addons = [
    { id: 'extra-shot', label: 'Extra Shot', price: 3.00 },
    { id: 'cbd', label: 'CBD', price: 5.00 },
    { id: 'flavor-boost', label: 'Flavor Boost', price: 1.50 },
  ];

  /**
   * Add-on Toggle Logic
   *
   * Purpose:
   * Handles toggling add-ons on/off when user taps an add-on pill.
   * Supports multiple simultaneous selections (user can select 0, 1, 2, or all 3 add-ons).
   *
   * Logic Flow:
   * 1. Check if addonId is already in selectedAddons array
   * 2. If YES (already selected):
   *    - Remove it from array using filter() → deselect the add-on
   * 3. If NO (not selected):
   *    - Add it to array using spread operator → select the add-on
   *
   * Example:
   * - selectedAddons = ['extra-shot']
   * - User taps 'CBD'
   * - Result: selectedAddons = ['extra-shot', 'cbd']
   * - User taps 'extra-shot' again
   * - Result: selectedAddons = ['cbd']
   */
  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)  // Remove if already selected
        : [...prev, addonId]                    // Add if not selected
    );
  };

  /**
   * Quantity Control Functions
   *
   * incrementQuantity:
   * - Increases quantity by 1 each time user taps the "+" button
   * - No maximum limit (user can order as many as needed)
   *
   * decrementQuantity:
   * - Decreases quantity by 1 each time user taps the "−" button
   * - Enforces minimum of 1 using Math.max(1, prev - 1)
   * - Prevents quantity from going below 1 (can't order 0 items)
   *
   * Impact on Total:
   * The quantity multiplier is applied in calculateTotal() as the final step,
   * ensuring that all upcharges and add-ons are properly multiplied.
   */
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  /**
   * Total Price Calculation Logic
   *
   * Purpose:
   * Calculates the complete order total based on all user selections.
   * This value is displayed in real-time on the sticky "Add to Cart" button.
   *
   * Calculation Steps:
   * 1. Start with base product price (e.g., $12.00 for Medium Sunset Serenity)
   * 2. Add size upcharge if applicable:
   *    - Small: +$0.00
   *    - Medium: +$0.00
   *    - Large: +$2.00
   * 3. Add all selected add-on prices:
   *    - Each add-on in selectedAddons array has its price added
   *    - Example: Extra Shot (+$3.00) + CBD (+$5.00) = +$8.00
   * 4. Multiply subtotal by quantity
   * 5. Format to 2 decimal places for currency display
   *
   * Example Calculation:
   * - Base: $12.00 (Medium)
   * - Size: +$2.00 (upgraded to Large)
   * - Add-ons: +$3.00 (Extra Shot) + $5.00 (CBD) = +$8.00
   * - Subtotal: $22.00
   * - Quantity: 2
   * - Total: $22.00 × 2 = $44.00
   *
   * Returns: String formatted as "44.00" (ready to display as "$44.00")
   */
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

  /**
   * Add to Cart Handler
   *
   * Purpose:
   * Processes the user's customized order and adds it to the cart.
   * Triggered when user taps the sticky "Add to Cart" button.
   *
   * Behavior:
   * 1. Constructs a complete cart item object with all selections:
   *    - Product details (name, price, image, etc.)
   *    - Selected size
   *    - Selected add-ons array
   *    - Quantity
   *    - Calculated total
   * 2. In production: Would dispatch to cart context/Redux store
   * 3. Currently: Logs to console for debugging
   * 4. Navigates back to previous screen (typically Home or Menu)
   *
   * Future Enhancement:
   * Should trigger the Floating Cart Bar animation (ui-ux.md Section 4.2)
   * to provide immediate visual feedback that item was added.
   */
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

  /**
   * ========================================
   * RENDER: USER INTERFACE
   * ========================================
   *
   * Layout Structure:
   * 1. SafeAreaView - Ensures content respects device safe areas (notch, status bar)
   * 2. Header - Fixed navigation bar with back button and title
   * 3. ScrollView - Scrollable content area for product details
   * 4. Sticky Button Container - Fixed "Add to Cart" button at bottom
   *
   * Warm Minimalist Design Elements:
   * - Background: #FAFAF8 (warm off-white from ui-ux.md Section 2.2)
   * - Generous whitespace between sections (32px margins)
   * - Clean typography hierarchy (32px product name, 28px price, 15px body)
   * - Subtle shadows for depth without harshness
   * - Primary green (#6B7F47) for CTAs and selected states
   */
  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar: Dark text on light background for optimal contrast */}
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAF8" />

      {/**
       * HEADER SECTION
       *
       * Purpose: Navigation control and screen identification
       *
       * Structure:
       * - Left: Circular back button (40×40px) with subtle shadow
       * - Center: "Details" title text
       * - Right: Empty spacer for visual balance (symmetry)
       *
       * Design Notes:
       * - Back button uses native-feeling circular design with soft shadow
       * - White button background (#FFFFFF) provides contrast against warm background
       * - Header is fixed (not part of ScrollView) for consistent navigation access
       */}
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

      {/**
       * SCROLLABLE CONTENT AREA
       *
       * Purpose: Contains all product details and customization options
       *
       * Design Decisions:
       * - showsVerticalScrollIndicator={false}: Cleaner look per minimalist design
       * - paddingBottom in scrollContent: Ensures content doesn't hide under sticky button
       * - All content scrollable except header and sticky button for optimal UX
       */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/**
         * PRODUCT IMAGE SECTION
         *
         * Purpose: Large, attention-grabbing visual of the product (ui-ux.md 5.2)
         *
         * Structure:
         * - Full-width container with 1:1 aspect ratio (square)
         * - Colored background (uses product.color with 20% opacity)
         * - Centered emoji as placeholder (in production, would use actual product image)
         *
         * Design Notes:
         * - Large size (full width) emphasizes the product visually
         * - Rounded corners (24px radius) maintain warm, friendly aesthetic
         * - Dynamic background color creates brand consistency across products
         * - 20px padding provides breathing room around image
         */}
        <View style={styles.imageContainer}>
          <View style={[styles.imageBg, { backgroundColor: product.color + '20' }]}>
            <Text style={styles.imageEmoji}>🥥</Text>
          </View>
        </View>

        {/**
         * PRODUCT INFORMATION SECTION
         *
         * Purpose: Displays core product details and all customization options
         *
         * Information Hierarchy (top to bottom):
         * 1. Category (13px, uppercase, gray) - Subtle context
         * 2. Product Name (32px, bold, dark) - Primary focus
         * 3. Price (28px, bold, green) - Secondary focus, brand color
         * 4. Description (15px, regular, gray) - Supporting details
         *
         * Typography Design:
         * - Uses font weights and sizes to establish clear visual hierarchy
         * - Negative letter spacing (-1px on name) for modern, tight look
         * - Line height (22px) on description ensures readability
         * - Colors follow warm minimalist palette (ui-ux.md 2.2)
         */}
        <View style={styles.contentContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/**
           * SIZE SELECTION SECTION
           *
           * Purpose: Allow user to select drink size (Small, Medium, Large)
           *
           * Selection Behavior:
           * - Single-selection only (radio button behavior)
           * - Tapping a size pill deselects the previous size and selects the new one
           * - Default: "Medium" (set in state initialization)
           *
           * Visual Feedback:
           * - Unselected pills: White background, gray border (#E5E5E7)
           * - Selected pill: Green background (#6B7F47), white text, enhanced shadow
           * - Selection state is instant and clear for user confidence
           *
           * Price Display Logic:
           * - Only shows upcharge text if size.price > 0
           * - Small & Medium: No upcharge shown (both $0.00)
           * - Large: Shows "+$2.00" to inform user of additional cost
           * - Upcharge is automatically included in calculateTotal()
           *
           * Design Alignment:
           * - Pill-shaped buttons per ui-ux.md Section 5.2
           * - Clean, minimal design with clear affordance (tappable appearance)
           * - Flexbox row with wrapping allows responsive layout
           */}
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

          {/**
           * ADD-ONS SELECTION SECTION
           *
           * Purpose: Allow user to select optional product enhancements
           *
           * Selection Behavior:
           * - Multi-selection (checkbox behavior, not radio)
           * - User can select 0, 1, 2, or all 3 add-ons simultaneously
           * - Tapping an add-on pill toggles it on/off (see toggleAddon function)
           * - Default: None selected (empty array)
           *
           * Available Add-ons:
           * - Extra Shot (+$3.00): Additional kava shot for stronger effect
           * - CBD (+$5.00): Add CBD oil for enhanced relaxation
           * - Flavor Boost (+$1.50): Extra flavoring for enhanced taste
           *
           * Visual Feedback:
           * - Unselected pills: White background, gray border, dark text
           * - Selected pills: Green background (#6B7F47), white text, enhanced shadow
           * - Toggle behavior provides instant visual confirmation
           *
           * Price Display:
           * - All add-ons show their upcharge price (always visible)
           * - Each selected add-on's price is summed in calculateTotal()
           * - User can see individual add-on costs before selecting
           *
           * UX Considerations:
           * - "(Optional)" in title indicates these are not required
           * - Clear pricing helps users make informed decisions
           * - Pill UI consistent with Size section for learned interaction pattern
           */}
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

          {/**
           * QUANTITY SELECTOR SECTION
           *
           * Purpose: Allow user to specify how many of this item to add to cart
           *
           * Structure:
           * - Left: Decrement button (−)
           * - Center: Current quantity display
           * - Right: Increment button (+)
           *
           * Behavior:
           * - Decrement (−): Reduces quantity by 1, minimum enforced at 1
           * - Increment (+): Increases quantity by 1, no maximum limit
           * - Default: 1 item
           *
           * Visual Design:
           * - Square buttons (48×48px) for easy tapping
           * - White background with subtle border for clean look
           * - Large, clear numbers for readability
           * - Consistent spacing (16px gap) between controls
           *
           * Price Impact:
           * - Quantity is the final multiplier in calculateTotal()
           * - Formula: (basePrice + sizeUpcharge + addonsPrices) × quantity
           * - Real-time total updates in sticky "Add to Cart" button
           *
           * UX Considerations:
           * - Standard +/− pattern is universally understood
           * - Minimum of 1 prevents adding "0 items" (which would be nonsensical)
           * - Large touch targets (48px) ensure thumb-friendly interaction
           */}
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

          {/**
           * SCROLL SPACER
           *
           * Purpose: Ensures bottom content is never hidden behind sticky button
           *
           * Height: 100px provides buffer so last section (Quantity) can be
           * scrolled fully into view above the sticky "Add to Cart" button.
           * Without this, the button would overlap the last bit of content.
           */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/**
       * ========================================
       * STICKY "ADD TO CART" BUTTON (PRIMARY CTA)
       * ========================================
       *
       * Purpose:
       * Primary call-to-action that finalizes user's selections and adds item to cart.
       * Required feature per ui-ux.md Section 5.2.
       *
       * Positioning - Why Sticky at Bottom:
       * 1. THUMB-FRIENDLY (ui-ux.md 2.4):
       *    - Bottom of screen is most accessible for one-handed mobile use
       *    - Users can reach with thumb without stretching or shifting grip
       *    - Critical for positive mobile UX on larger phones
       *
       * 2. ALWAYS ACCESSIBLE:
       *    - Fixed position (absolute) keeps button visible regardless of scroll position
       *    - User never has to scroll to find the CTA
       *    - Reduces friction in purchase flow
       *
       * 3. REAL-TIME FEEDBACK:
       *    - Displays live-updating total price: "Add to Cart • $XX.XX"
       *    - Price recalculates instantly when user changes size, add-ons, or quantity
       *    - User sees exact cost before committing to add to cart
       *
       * Visual Design (Warm Minimalist):
       * - LinearGradient: Deep to darker green (#6B7F47 → #5A6B3B)
       *   Creates depth and premium feel while staying in brand palette
       * - Full width with horizontal padding (24px) for generous tap target
       * - Large vertical padding (18px) ensures easy tapping
       * - Rounded corners (16px) match overall design language
       * - Strong shadow creates elevation, indicating primary importance
       * - White text with letter spacing (0.3px) ensures readability
       *
       * Behavior:
       * - onPress: Calls handleAddToCart() which constructs cart item and navigates back
       * - activeOpacity: 0.8 provides subtle press feedback without harshness
       * - Future: Should trigger Floating Cart Bar animation (ui-ux.md 4.2)
       *
       * Container Design:
       * - Positioned absolutely at bottom (bottom: 0, left: 0, right: 0)
       * - Warm background (#FAFAF8) matches app background for seamless look
       * - Top border (1px, #E5E5E7) subtly separates from content
       * - Top shadow creates floating effect above content
       * - Padding: 24px horizontal, 16px top, 24px bottom for spacing
       */}
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

/**
 * ========================================
 * STYLESHEET: WARM MINIMALIST DESIGN SYSTEM
 * ========================================
 *
 * This stylesheet implements the "Warm Minimalist" design philosophy
 * as specified in ui-ux.md Sections 2.0 and 5.2.
 *
 * Key Design Principles Applied:
 *
 * 1. WARM COLOR PALETTE (ui-ux.md 2.2):
 *    - Primary: #6B7F47 (Deep Olive Green) - CTAs, selected states
 *    - Background: #FAFAF8 (Warm Off-White) - Main app background
 *    - Surfaces: #FFFFFF (Pure White) - Cards, pills, buttons
 *    - Text Primary: #1C1C1E (Deep Charcoal) - Headings, important text
 *    - Text Secondary: #6C6C70, #8E8E93 (Gray tones) - Descriptions, labels
 *    - Borders: #E5E5E7 (Light Gray) - Subtle separation
 *
 * 2. GENEROUS NEGATIVE SPACE (ui-ux.md 2.4):
 *    - Section margins: 32px between major sections
 *    - Content padding: 24px horizontal padding throughout
 *    - Component gaps: 10-16px between related elements
 *    - Prevents cluttered feel, guides user's eye naturally
 *
 * 3. CLEAN TYPOGRAPHY HIERARCHY (ui-ux.md 2.1):
 *    - Font weights (700, 600, 500, 400) establish importance
 *    - Font sizes (32px → 28px → 18px → 15px → 13px) create clear levels
 *    - Letter spacing: Negative on large text (-1px, -0.5px) for modern feel
 *    - Line height: 22px on body text ensures readability
 *
 * 4. SUBTLE DEPTH & SHADOWS (ui-ux.md 2.0):
 *    - Light shadows (opacity 0.03-0.05) on unselected elements
 *    - Stronger shadows (opacity 0.2-0.25) on selected/primary elements
 *    - Shadows create depth without harshness, maintaining warmth
 *
 * 5. ROUNDED CORNERS (ui-ux.md 2.0):
 *    - Large images: 24px radius for friendly, approachable feel
 *    - Buttons/pills: 12-16px radius for modern, soft aesthetic
 *    - Circular elements: 20px radius for perfect circles (40×40 buttons)
 *
 * 6. THUMB-FRIENDLY INTERACTIONS (ui-ux.md 2.4):
 *    - Minimum touch targets: 48×48px (quantity buttons)
 *    - Primary CTA at bottom: Easy thumb reach on mobile devices
 *    - Full-width button with padding ensures no miss-taps
 */

const styles = StyleSheet.create({
  // Main container - sets warm background tone for entire screen
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',  // Warm Off-White per ui-ux.md 2.2
  },

  // Fixed header with navigation controls
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Back button left, title center, spacer right
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFAF8',  // Match container for seamless look
  },
  // Circular back button - Native iOS-style navigation element
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,  // Half of width/height for perfect circle
    backgroundColor: '#FFFFFF',  // White contrasts with warm background
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,  // Very subtle shadow for gentle elevation
    shadowRadius: 8,
    elevation: 2,  // Android shadow
  },
  backButtonText: {
    fontSize: 24,
    color: '#1C1C1E',  // Deep charcoal for contrast
    fontWeight: '400',  // Regular weight for the arrow symbol
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',  // Semi-bold for emphasis without heaviness
    color: '#1C1C1E',
    letterSpacing: -0.5,  // Slight negative spacing for modern feel
  },
  headerSpacer: {
    width: 40,  // Same as back button width for visual balance
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
  /**
   * Pill-style selection buttons (used for Sizes and Add-ons)
   * Clean, modern design that clearly shows selected vs unselected state
   */
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,  // Rounded for friendly, approachable feel
    backgroundColor: '#FFFFFF',  // White surface on warm background
    borderWidth: 1.5,
    borderColor: '#E5E5E7',  // Subtle gray border for definition
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,  // Space between label and price
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,  // Very subtle shadow in unselected state
    shadowRadius: 4,
    elevation: 1,  // Android shadow
  },
  // Selected state - transforms pill to brand green with enhanced shadow
  pillSelected: {
    backgroundColor: '#6B7F47',  // Primary brand color
    borderColor: '#6B7F47',  // Remove visual border by matching background
    shadowColor: '#6B7F47',  // Green shadow creates brand-colored glow
    shadowOffset: { width: 0, height: 4 },  // Larger offset for more elevation
    shadowOpacity: 0.2,  // Stronger shadow indicates "pressed" selection
    shadowRadius: 8,  // Larger radius creates softer, more diffused glow
    elevation: 4,  // Android: Higher elevation for selected state
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',  // Semi-bold for readability
    color: '#1C1C1E',  // Dark text on white background
  },
  pillTextSelected: {
    color: '#FFFFFF',  // White text on green background for contrast
  },
  pillPrice: {
    fontSize: 13,  // Slightly smaller than label for hierarchy
    fontWeight: '500',
    color: '#8E8E93',  // Muted gray for secondary information
  },
  pillPriceSelected: {
    color: '#FFFFFF',  // White text on green background
    opacity: 0.9,  // Slightly transparent to show it's secondary info
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
  /**
   * Sticky Button Container - Critical for thumb-friendly UX (ui-ux.md 2.4, 5.2)
   * Keeps primary CTA always visible and accessible at bottom of screen
   */
  stickyButtonContainer: {
    position: 'absolute',  // Fixed position, doesn't scroll with content
    bottom: 0,  // Anchored to bottom of screen
    left: 0,
    right: 0,  // Full width from edge to edge
    paddingHorizontal: 24,  // Generous horizontal padding for aesthetics
    paddingTop: 16,  // Space above button
    paddingBottom: 24,  // Extra bottom padding for safe area (home indicator)
    backgroundColor: '#FAFAF8',  // Match app background for seamless integration
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',  // Subtle top border separates from content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },  // Negative offset creates upward shadow
    shadowOpacity: 0.08,  // Moderate shadow for floating effect
    shadowRadius: 16,  // Large radius for soft, diffused shadow
    elevation: 8,  // Android: High elevation for prominence
  },
  // Primary CTA button with premium styling
  addToCartButton: {
    width: '100%',  // Full width of container (minus padding)
    borderRadius: 16,  // Rounded corners match design language
    overflow: 'hidden',  // Clips gradient to rounded corners
    shadowColor: '#6B7F47',  // Brand-colored shadow creates green glow
    shadowOffset: { width: 0, height: 8 },  // Large offset for strong elevation
    shadowOpacity: 0.25,  // Strong shadow indicates primary importance
    shadowRadius: 16,  // Large radius for soft, diffused brand-colored glow
    elevation: 8,  // Android: Match iOS shadow strength
  },
  // LinearGradient inner container (gradient applied here)
  gradientButton: {
    paddingVertical: 18,  // Large vertical padding ensures 48px+ touch target
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Button text showing CTA and dynamic total price
  addToCartText: {
    fontSize: 17,  // Large, easily readable on mobile
    fontWeight: '700',  // Bold for primary CTA emphasis
    color: '#FFFFFF',  // White text on green gradient for maximum contrast
    letterSpacing: 0.3,  // Slight positive spacing improves readability on mobile
  },
});

export default ProductDetailScreen;
