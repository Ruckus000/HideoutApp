/**
 * HomeScreen Component
 *
 * This is the main landing screen for the HideOut Kava app, implementing a warm minimalist
 * design aesthetic that emphasizes tranquility, natural elements, and community connection.
 *
 * Design Philosophy:
 * - Warm, earthy color palette (sage greens, terracottas, warm neutrals)
 * - Generous white space for breathing room and clarity
 * - Soft shadows and rounded corners for a welcoming feel
 * - Typography hierarchy that guides the eye naturally
 * - Gentle gradients that evoke natural elements
 *
 * This implementation closely follows the design mockup at /home/user/HideoutApp/home-mockup
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons'; // Icon libraries for UI elements
import { LinearGradient } from 'expo-linear-gradient'; // For smooth gradient backgrounds
import theme from '../theme'; // Centralized design system with colors, typography, shadows

// Get device width for responsive layout calculations (used for product card sizing)
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  /**
   * STATE MANAGEMENT
   *
   * We use minimal state to keep the component lightweight and performant:
   * - selectedCategory: Tracks which category filter is active (0 = 'All')
   */
  const [selectedCategory, setSelectedCategory] = useState(0);

  /**
   * CATEGORY DATA
   *
   * Matches mockup design - provides filtering options for the product catalog.
   * Categories are displayed as horizontally scrollable pills with active state styling.
   * The 'All' category shows all products regardless of their category tag.
   */
  const categories = [
    'All',
    'Kava Cocktails',
    'Botanical Teas',
    'Kava Shots',
    'Coffee & Lattes',
    'Elixirs',
  ];

  /**
   * PRODUCT DATA
   *
   * Sample product catalog showcasing kava-based beverages.
   * Each product includes:
   * - name: Display name of the product
   * - category: Used for filtering (should match categories array)
   * - price: Formatted price string
   * - image: Emoji placeholder (would be replaced with actual images in production)
   * - color: Earthy tone used for product card background (maintains warm aesthetic)
   *
   * Note: Mockup shows 2 products, this implementation includes 4 for richer demonstration
   */
  const products = [
    {
      name: 'Sunset Serenity',
      category: 'Kava Cocktails',
      price: '$12.00',
      image: '🥥',
      color: '#A67B5B', // Warm brown - coconut/wood tones
    },
    {
      name: 'Island Dreams',
      category: 'Kava Cocktails',
      price: '$14.00',
      image: '🌺',
      color: '#8B7355', // Earthy brown - hibiscus/clay tones
    },
    {
      name: 'Tropical Bliss',
      category: 'Kava Cocktails',
      price: '$13.00',
      image: '🍹',
      color: '#6B7F47', // Sage green - botanical/herbal tones
    },
    {
      name: 'Midnight Calm',
      category: 'Kava Shots',
      price: '$8.00',
      image: '🌙',
      color: '#5A6B3B', // Deep sage - evening/relaxation tones
    },
  ];

  /**
   * REWARDS PROGRESS
   *
   * Represents user's progress toward next reward tier.
   * Value: 0.75 = 75% complete (750 points out of 1000 goal)
   * This matches the mockup specification exactly.
   */
  const rewardsProgress = 0.75; // 75% (750/1000)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/**
       * HEADER SECTION
       *
       * Personalized greeting area with notification access.
       * Matches mockup exactly:
       * - "Good evening" (context-aware greeting - could be dynamic based on time)
       * - "Welcome back, Alex" (personalized with user's name)
       * - Bell icon for notifications (contained in circular button)
       *
       * Design choices:
       * - Large, bold typography for the name creates hierarchy and warmth
       * - Subtle greeting text (secondary color) provides context without competing
       * - Circular notification button with surface background (elevated feel)
       * - Generous padding for breathing room
       */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good evening</Text>
            <Text style={styles.welcomeText}>Welcome back, Alex</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/**
       * MAIN SCROLLABLE CONTENT
       *
       * Contains all scrollable content: rewards card, categories, products, event banner.
       * - showsVerticalScrollIndicator={false}: Clean appearance without scroll bar
       * - contentContainerStyle with paddingBottom: Ensures bottom content isn't hidden by tab bar
       */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/**
         * REWARDS CARD WIDGET
         *
         * Prominent feature showcasing user's loyalty program progress.
         * Matches mockup specifications:
         * - "Community Points" title with subtitle
         * - Star icon in translucent circle (top right)
         * - Progress display: "750 points" / "1,000" target
         * - Progress bar showing 75% completion (3/4 width)
         * - "View All Rewards" CTA button
         *
         * Design choices:
         * - LinearGradient: Sage green gradient (accent to accentDark) creates depth and visual interest
         * - Diagonal gradient (135deg) adds dynamic energy while maintaining tranquility
         * - White text provides strong contrast on colored background
         * - Premium shadow elevates card above background
         * - Rounded corners (xl) consistent with warm, approachable aesthetic
         * - Progress bar with white fill on translucent background shows clear visual feedback
         * - Translucent star container creates layered, sophisticated look
         * - CTA button with nearly opaque white background provides clear affordance
         */}
        <View style={styles.rewardsContainer}>
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rewardsCard}
          >
            {/* Rewards header with title and star icon */}
            <View style={styles.rewardsHeader}>
              <View>
                <Text style={styles.rewardsTitle}>Community Points</Text>
                <Text style={styles.rewardsSubtitle}>Your journey to rewards</Text>
              </View>
              <View style={styles.starContainer}>
                <Ionicons name="star" size={20} color="#FFFFFF" />
              </View>
            </View>

            {/* Progress indicator: labels + visual bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressCurrent}>750 points</Text>
                <Text style={styles.progressTarget}>1,000</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${rewardsProgress * 100}%` },
                  ]}
                />
              </View>
            </View>

            {/* Call-to-action button */}
            <TouchableOpacity style={styles.rewardsButton}>
              <Text style={styles.rewardsButtonText}>View All Rewards</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/**
         * CATEGORY SELECTOR
         *
         * Horizontal scrolling filter for product browsing.
         * Matches mockup: All 6 categories as pill-shaped buttons.
         *
         * Functionality:
         * - Tapping a category updates selectedCategory state
         * - Active category receives special styling (dark background, white text)
         * - Inactive categories use subtle surface color with secondary text
         *
         * Design choices:
         * - Horizontal scroll allows for many categories without cramping
         * - showsHorizontalScrollIndicator={false}: Clean, minimal appearance
         * - Pill shape (rounded corners) aligns with overall soft aesthetic
         * - Active state uses primary color (dark brown/charcoal) for strong contrast
         * - Soft shadow on active state provides tactile feedback
         * - Medium font weight and comfortable padding ensure readability
         * - Gap between pills allows for easy tap targets
         */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(index)}
                style={[
                  styles.categoryButton,
                  selectedCategory === index && styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === index && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/**
         * PRODUCTS GRID (2-Column Layout)
         *
         * Main product catalog display with responsive 2-column grid.
         * Mockup shows 2 products; this implementation shows 4 for richer demonstration.
         *
         * Layout calculations:
         * - Card width: (screenWidth - 64px) / 2
         *   - 64px accounts for: 24px left padding + 24px right padding + 16px gap
         * - This ensures cards are equal width and fill available space
         *
         * Each product card contains:
         * 1. Product image area (128px height) with color-coded background
         * 2. Category label (small, secondary color)
         * 3. Product name (bold, primary color)
         * 4. Price and add-to-cart button in footer
         *
         * Design choices:
         * - 2-column grid is scannable and touch-friendly on mobile
         * - flexWrap allows grid to flow naturally
         * - gap property provides consistent spacing between cards
         * - Each card gets soft shadow for subtle elevation
         * - Product colors use alpha channel (+20) for translucent backgrounds
         *   maintaining cohesion with overall color palette
         * - Emoji placeholders would be replaced with actual product images
         * - Add button uses primary color with white icon for clear CTA
         * - Circular add button echoes other circular elements (notification, star)
         * - Section title "Popular Now" creates clear content hierarchy
         */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Popular Now</Text>
          <View style={styles.productsGrid}>
            {products.map((product, index) => (
              <View key={index} style={styles.productCard}>
                {/* Product image with tinted background matching product color */}
                <View
                  style={[
                    styles.productImage,
                    { backgroundColor: product.color + '20' }, // 20 = ~12% opacity in hex
                  ]}
                >
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>

                {/* Product details and actions */}
                <View style={styles.productInfo}>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Feather name="shopping-bag" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/**
         * COMMUNITY EVENT BANNER
         *
         * Promotional card highlighting community gatherings and events.
         * Matches mockup exactly:
         * - "THURSDAY NIGHTS" in small caps
         * - "Open Mic Night" title
         * - Descriptive text about the event
         * - "Learn More" CTA button
         * - Microphone emoji (🎤) for visual interest
         *
         * Design choices:
         * - Terracotta gradient (warm orange-brown tones) differentiates from sage green rewards card
         * - Horizontal gradient creates left-to-right visual flow
         * - Warm terracotta evokes community, warmth, gathering spaces
         * - White text on terracotta ensures readability
         * - Semi-transparent emoji adds playful element without dominating
         * - "THURSDAY NIGHTS" uses uppercase + letter-spacing for emphasis
         * - CTA button inverted (white background, terracotta text) for high contrast
         * - Premium shadow provides same elevation as rewards card
         * - Rounded corners maintain consistency with overall design language
         * - Flexbox layout allows text and emoji to coexist harmoniously
         *
         * Purpose: Drives community engagement, showcases kava bar's social aspect
         */}
        <View style={styles.eventContainer}>
          <LinearGradient
            colors={[theme.colors.terracotta, theme.colors.terracottaDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.eventBanner}
          >
            <View style={styles.eventContent}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventDay}>THURSDAY NIGHTS</Text>
                <Text style={styles.eventTitle}>Open Mic Night</Text>
                <Text style={styles.eventDescription}>
                  Join our community for an evening of connection
                </Text>
                <TouchableOpacity style={styles.eventButton}>
                  <Text style={styles.eventButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.eventEmoji}>🎤</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * STYLESHEET
 *
 * Organized by UI section for clarity.
 * All values follow the warm minimalist design system defined in ../theme.
 */
const styles = StyleSheet.create({
  /**
   * CONTAINER & LAYOUT STYLES
   *
   * Base container and scroll structure
   */
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // Off-white (#FAFAF8) for warmth vs pure white
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Ensures bottom content isn't hidden by fixed tab bar
  },

  /**
   * HEADER STYLES
   *
   * Top section with greeting and notification button
   */
  header: {
    paddingHorizontal: 24, // Consistent horizontal padding throughout app
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: theme.typography.sm, // Small, subtle
    color: theme.colors.secondary, // Gray for de-emphasis
    marginBottom: 2,
  },
  welcomeText: {
    fontSize: theme.typography.huge, // Large for hierarchy and impact
    fontWeight: 'bold',
    color: theme.colors.primary, // Dark charcoal for strong contrast
    letterSpacing: -0.5, // Slight tightening for refined look at large sizes
  },
  notificationButton: {
    width: 44,
    height: 44, // Comfortable tap target size (44x44 minimum per iOS HIG)
    backgroundColor: theme.colors.surface, // Pure white stands out from off-white background
    borderRadius: 22, // Perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4, // Optical alignment with text
  },

  /**
   * REWARDS CARD STYLES
   *
   * Gradient card displaying loyalty points progress
   */
  rewardsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  rewardsCard: {
    borderRadius: theme.borderRadius.xl, // Extra-large (16px+) for prominent card
    padding: 20,
    ...theme.shadows.premium, // Elevated shadow for visual hierarchy
  },
  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rewardsTitle: {
    fontSize: theme.typography.lg,
    fontWeight: '600', // Semi-bold for emphasis without heaviness
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rewardsSubtitle: {
    fontSize: theme.typography.sm,
    color: 'rgba(255, 255, 255, 0.8)', // 80% opacity for secondary text on colored bg
  },
  starContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Translucent white creates frosted effect
    borderRadius: 20, // Circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressCurrent: {
    fontSize: theme.typography.sm,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  progressTarget: {
    fontSize: theme.typography.sm,
    color: 'rgba(255, 255, 255, 0.7)', // More subtle than current for visual hierarchy
  },
  progressBarBackground: {
    height: 8, // Thin but visible
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Translucent track
    borderRadius: 4,
    overflow: 'hidden', // Ensures fill respects rounded corners
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF', // Solid white for strong contrast
    borderRadius: 4,
  },
  rewardsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Nearly opaque for button clarity
    paddingVertical: 14, // Comfortable touch target height
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  rewardsButtonText: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.accentDark, // Dark sage for contrast on white button
    letterSpacing: 0.3, // Slight tracking for button text readability
  },

  /**
   * CATEGORY FILTER STYLES
   *
   * Horizontal scrollable category pills
   */
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 10, // Consistent spacing between pills (Note: gap may need fallback for older RN versions)
  },
  categoryButton: {
    paddingHorizontal: 20, // Wide enough for text breathing room
    paddingVertical: 10,
    borderRadius: 20, // Pill shape (half of total height)
    backgroundColor: theme.colors.surface, // White stands out from background
    marginRight: 10, // Fallback spacing if gap not supported
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary, // Dark charcoal for strong active state
    ...theme.shadows.soft, // Shadow adds depth to active button
  },
  categoryText: {
    fontSize: theme.typography.sm,
    fontWeight: '500', // Medium weight for clarity
    color: theme.colors.secondary, // Gray for inactive state
  },
  categoryTextActive: {
    color: theme.colors.white, // White text on dark background
  },

  /**
   * PRODUCT GRID STYLES
   *
   * 2-column responsive product catalog
   */
  productsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: theme.typography.lg,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows 2-column wrapping
    gap: 16, // Space between cards (horizontal and vertical)
  },
  productCard: {
    width: (width - 64) / 2, // Calculation: (screenWidth - 48px padding - 16px gap) / 2 columns
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden', // Clips child content to rounded corners
    ...theme.shadows.soft, // Subtle elevation
  },
  productImage: {
    height: 128, // Fixed height for consistent grid appearance
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor set inline with product-specific color
  },
  productEmoji: {
    fontSize: 48, // Large enough to be visible but not overwhelming
  },
  productInfo: {
    padding: 16, // Inner padding for text content
  },
  productCategory: {
    fontSize: theme.typography.xs, // Extra small for subtle labeling
    color: theme.colors.secondary, // Gray - de-emphasized
    marginBottom: 4,
  },
  productName: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.primary, // Dark for readability
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: theme.typography.base,
    fontWeight: 'bold', // Emphasis on price
    color: theme.colors.primary,
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.primary, // Dark button for contrast
    borderRadius: 16, // Circle
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.soft, // Slight elevation for tactile feel
  },

  /**
   * EVENT BANNER STYLES
   *
   * Community event promotional card with terracotta gradient
   */
  eventContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  eventBanner: {
    borderRadius: theme.borderRadius.xl,
    padding: 24, // Generous padding for premium feel
    ...theme.shadows.premium, // Strong shadow matches rewards card elevation
  },
  eventContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1, // Takes available space, leaving room for emoji
  },
  eventDay: {
    fontSize: theme.typography.xs,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 1.2, // Wide tracking for all-caps text readability
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: theme.typography.xl, // Large for emphasis
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: theme.typography.sm,
    color: 'rgba(255, 255, 255, 0.8)', // Slightly transparent for hierarchy
    marginBottom: 16,
    lineHeight: 20, // Comfortable reading height
  },
  eventButton: {
    backgroundColor: '#FFFFFF', // Inverted button (white on terracotta)
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start', // Only as wide as content needs
  },
  eventButtonText: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.terracotta, // Terracotta text on white for consistency
  },
  eventEmoji: {
    fontSize: 64, // Large decorative element
    opacity: 0.5, // Semi-transparent so it doesn't compete with text
    marginLeft: 16,
  },
});

export default HomeScreen;
