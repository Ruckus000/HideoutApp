/**
 * AppNavigator.js
 *
 * Main navigation component for the HideOut Kava App.
 * Implements the navigation structure as defined in ui-ux.md spec 3.1.
 *
 * Architecture:
 * - Uses React Navigation v6 for navigation management
 * - Implements a bottom tab navigator with 4 tabs (Home, Rewards, Cart, Profile)
 * - Wraps the app in CartProvider for global cart state management
 * - Integrates FloatingCartBar component that floats above the tab bar
 *
 * Design Philosophy - Warm Minimalism:
 * - Clean, uncluttered navigation structure reduces cognitive load
 * - Warm color palette (primary.main) for active states creates welcoming feel
 * - Generous spacing and clear visual hierarchy maintains premium aesthetic
 * - Minimalist iconography (Ionicons outline style) follows design tokens
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Context Providers
import { CartProvider, useCart } from '../context/CartContext';

// Components
import FloatingCartBar from '../components/FloatingCartBar';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RewardsScreen from '../screens/RewardsScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import colors - Warm minimalist palette defined in design tokens
import colors from '../theme/colors';

// Create navigation instances
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Cart Badge Component
 *
 * Displays a badge overlay on the Cart tab icon showing the total number of items
 * in the cart. This provides immediate visual feedback to users about their cart status.
 *
 * Spec Reference: ui-ux.md Section 3.1 - "Cart: Order summary and checkout entry point.
 * Must support a 'badge' overlay to show item count."
 *
 * Implementation Details:
 * - Uses cartCount from CartContext to display total item quantity (not unique items)
 * - Hides when cart is empty (cartCount === 0) to maintain clean minimalist aesthetic
 * - Caps display at "99+" to prevent UI overflow on large quantities
 * - Positioned absolutely relative to the Cart tab icon
 * - Uses badge.background color (warm accent) for high contrast visibility
 *
 * Design Philosophy:
 * - Small, unobtrusive badge maintains warm minimalism
 * - High contrast background ensures visibility without visual clutter
 * - Bold typography provides clear readability
 */
/**
 * A badge component that displays the number of items in the cart.
 * It is designed to be placed on top of the cart tab icon.
 *
 * @returns {JSX.Element|null} The rendered badge component or null if the cart is empty.
 */
const CartTabBadge = () => {
  const { cartCount } = useCart();

  // Hide badge when cart is empty to maintain clean UI
  if (cartCount === 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {/* Cap at 99+ to prevent badge overflow */}
        {cartCount > 99 ? '99+' : cartCount}
      </Text>
    </View>
  );
};

/**
 * Bottom Tab Navigator
 *
 * Implements the primary navigation structure as defined in ui-ux.md Section 3.1.
 *
 * Spec Reference: ui-ux.md Section 3.1 - Primary Navigation
 * "Component: A persistent, native bottom tab bar.
 * Structure: The tab bar must contain the following four (4) items in this specific order:
 * - Home: Landing screen, discovery, and rewards summary.
 * - Rewards: Main loyalty program 'wallet' and redemption center.
 * - Cart: Order summary and checkout entry point. Must support a 'badge' overlay to show item count.
 * - Profile: Account settings, order history, etc."
 *
 * Design Philosophy - Warm Minimalism:
 * - Persistent bottom placement provides consistent, thumb-friendly navigation
 * - Four tabs (Home, Rewards, Cart, Profile) create clear information architecture
 * - Minimalist line-art icons (outline/filled) provide clear visual states
 * - Warm color palette (primary.main) for active states vs neutral for inactive
 * - Generous spacing (60px height) ensures touch targets are accessible
 * - No shadows/elevation maintains clean, flat aesthetic aligned with minimalism
 *
 * Implementation Details:
 * - Uses createBottomTabNavigator from React Navigation
 * - Dynamic icon selection: filled icon for focused state, outline for unfocused
 * - Icon colors controlled by theme: primary.main (warm) for active, textSecondary for inactive
 * - Tab bar styled with surface background and subtle border for depth
 * - Labels use medium font weight (600) for clear hierarchy
 * - Wraps tabs in View container to enable FloatingCartBar positioning
 */
/**
 * The main bottom tab navigator for the application.
 * It includes tabs for Home, Rewards, Cart, and Profile.
 *
 * @returns {JSX.Element} The rendered bottom tab navigator.
 */
const BottomTabNavigator = () => {
  return (
    <View style={styles.tabContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Hide screen headers - tabs provide primary navigation context
          headerShown: false,

          /**
           * Tab Bar Icon Configuration
           *
           * Uses Ionicons with filled/outline variants to indicate focus state.
           * This follows design token spec 2.3: "All icons must be a single,
           * consistent, minimalist, line-art style"
           *
           * Icon selection logic:
           * - Focused: Filled variant provides clear active state
           * - Unfocused: Outline variant maintains minimal visual weight
           */
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Map route names to appropriate Ionicons
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Rewards') {
              iconName = focused ? 'gift' : 'gift-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          /**
           * Tab Bar Styling - Warm Minimalist Theme
           *
           * Color choices follow ui-ux.md Section 2.2 color palette:
           * - Active: primary.main (Deep Olive Green/Terracotta) - warm, welcoming
           * - Inactive: light.textSecondary - subtle, doesn't compete for attention
           *
           * Design choices:
           * - Surface background maintains consistency with app aesthetic
           * - Subtle border provides visual separation without harsh lines
           * - 60px height ensures thumb-friendly touch targets (spec 2.4)
           * - No elevation/shadows keeps flat, minimal design
           */
          tabBarActiveTintColor: colors.primary.main,
          tabBarInactiveTintColor: colors.light.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.light.surface,
            borderTopColor: colors.light.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            elevation: 0, // No shadow on Android - maintains flat aesthetic
            shadowOpacity: 0, // No shadow on iOS - maintains flat aesthetic
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600', // Medium weight establishes clear hierarchy
          },
        })}
      >
        {/*
          Home Tab - Landing Screen
          Spec: "Landing screen, discovery, and rewards summary"
          Contains: Greeting, Rewards Widget, Category Carousel, Featured Banners
        */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />

        {/*
          Rewards Tab - Loyalty Program Center
          Spec: "Main loyalty program 'wallet' and redemption center"
          Contains: Points summary, tier progress, redeemable rewards, badges
        */}
        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarLabel: 'Rewards',
          }}
        />

        {/*
          Cart Tab - Order Summary & Checkout Entry
          Spec: "Order summary and checkout entry point. Must support a 'badge' overlay"

          Badge Implementation:
          - tabBarBadge renders CartTabBadge component with item count
          - Badge automatically hides when cart is empty
          - Positioned absolutely on top-right of cart icon
          - Uses transparent style to allow custom badge styling
        */}
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarBadge: () => <CartTabBadge />,
            tabBarBadgeStyle: styles.tabBarBadge, // Transparent to allow custom styling
          }}
        />

        {/*
          Profile Tab - Account Management
          Spec: "Account settings, order history, etc."
          Contains: Orders, Payment Methods, Account Details, Settings
        */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>

      {/*
        Floating Cart Bar - Persistent Cart Summary

        Spec Reference: ui-ux.md Section 4.2
        "Position: This component 'floats' persistently at the bottom of the screen.
        It must be positioned above the 4-icon main tab bar and below the screen's
        primary content area."

        Integration Strategy:
        - Rendered inside tabContainer View to enable absolute positioning
        - FloatingCartBar component handles its own positioning logic
        - Calculates bottom offset based on tab bar height + safe area insets
        - Uses z-index to layer above tab bar but below modals
        - Animates in/out based on cart state (see FloatingCartBar.js for details)

        Why this approach:
        - Placing it in the tab navigator ensures it's available across all tabs
        - Absolute positioning allows it to "float" without disrupting screen layouts
        - Component encapsulation keeps animation/visibility logic self-contained
      */}
      <FloatingCartBar />
    </View>
  );
};

/**
 * Root Stack Navigator
 *
 * Top-level navigation container that manages the overall app navigation hierarchy.
 * Uses Stack Navigator to enable modal presentations and full-screen overlays on top
 * of the main tab navigation.
 *
 * Architecture Rationale:
 * - Stack wraps Tabs to enable layering of full-screen experiences
 * - Tabs provide persistent bottom navigation across core screens
 * - Stack allows pushing detail screens, modals, and overlays
 *
 * Current Structure:
 * - MainTabs: The bottom tab navigator (Home, Rewards, Cart, Profile)
 * - Additional screens can be added as stack screens for modal presentations
 *
 * Example Use Cases for Additional Stack Screens:
 * - Product Detail Screen (modal or push presentation)
 * - Checkout Flow (full-screen, replaces tabs)
 * - Event Details (modal over tabs)
 * - Settings sub-screens (push from Profile)
 *
 * Design Philosophy:
 * - headerShown: false maintains clean, custom navigation headers
 * - presentation: 'card' provides smooth, native-feeling transitions
 * - Minimalist approach: only add screens when necessary
 */
/**
 * The root stack navigator that contains the main tab navigator and any additional
 * modal or full-screen views.
 *
 * @returns {JSX.Element} The rendered root stack navigator.
 */
const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Custom headers in each screen maintain design control
        presentation: 'card', // Native card transitions feel smooth and familiar
      }}
    >
      {/* Main Tab Navigation - Core App Experience */}
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

      {/*
        Additional Stack Screens

        Future screens can be added here for:
        - Modal presentations (presentation: 'modal')
        - Full-screen overlays (presentation: 'transparentModal')
        - Push navigation with custom transitions

        Example: Product Detail Screen as a modal
      */}
      {/* <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Product Details',
        }}
      /> */}
    </Stack.Navigator>
  );
};

/**
 * App Navigator - Root Component
 *
 * The top-level navigation component that initializes and wraps the entire app
 * with necessary providers and navigation containers.
 *
 * Provider Hierarchy (Outside to Inside):
 * 1. SafeAreaProvider - Handles device safe areas (notches, status bars, home indicators)
 * 2. CartProvider - Global cart state management (items, quantities, calculations)
 * 3. NavigationContainer - React Navigation state management and linking
 * 4. RootStack - The actual navigation tree
 *
 * Why this order:
 * - SafeAreaProvider must be outermost to provide insets to all components
 * - CartProvider wraps navigation so cart state persists across screen changes
 * - NavigationContainer manages navigation state and deep linking
 * - RootStack contains the actual screen hierarchy
 *
 * Context Strategy:
 * - CartProvider placed here makes cart accessible to all screens and components
 * - FloatingCartBar can access cart state from any screen in the navigation tree
 * - Cart badge on tab bar can update reactively when items are added/removed
 *
 * Design Philosophy:
 * - Clean provider hierarchy maintains separation of concerns
 * - Global cart state enables seamless cross-screen cart interactions
 * - Safe area handling ensures content respects device boundaries
 * - This structure supports the "warm minimalism" philosophy by keeping
 *   the architecture clean and purposeful - every wrapper has a clear role
 */
/**
 * The main application navigator, which sets up the navigation container and context providers.
 *
 * @returns {JSX.Element} The rendered application navigator.
 */
const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
};

/**
 * Styles
 *
 * Styling follows the warm minimalist design philosophy:
 * - Clean, purposeful layout with no unnecessary decoration
 * - Warm color palette from design tokens
 * - Clear visual hierarchy through size and contrast
 * - Generous spacing for reduced cognitive load
 */
const styles = StyleSheet.create({
  /**
   * Tab Container
   *
   * Wrapper for the tab navigator that enables FloatingCartBar positioning.
   *
   * Why position: 'relative'?
   * - Establishes positioning context for absolutely positioned FloatingCartBar
   * - FloatingCartBar uses absolute positioning with bottom offset
   * - This allows the cart bar to "float" above tabs without disrupting layout
   *
   * flex: 1 ensures container fills available space
   */
  tabContainer: {
    flex: 1,
    position: 'relative',
  },

  /**
   * Cart Tab Badge
   *
   * Small circular badge showing cart item count on the Cart tab icon.
   *
   * Design choices:
   * - Positioned absolutely (right: -10, top: -5) to overlay on top-right of icon
   * - badge.background color provides warm accent that stands out
   * - Circular shape (borderRadius: 10 with minWidth/height: 20) creates compact badge
   * - minWidth ensures single digits are centered in circle
   * - paddingHorizontal: 4 allows badge to expand for 2+ digit numbers
   * - zIndex: 1 ensures badge renders above icon
   *
   * Accessibility:
   * - Bold text ensures readability at small size
   * - High contrast between badge.background and badge.text
   */
  badge: {
    position: 'absolute',
    right: -10, // Offset right to position on edge of icon
    top: -5,    // Offset up to position on edge of icon
    backgroundColor: colors.badge.background, // Warm accent color for visibility
    borderRadius: 10, // Circular shape
    minWidth: 20,     // Ensures circle shape for single digits
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4, // Allows expansion for 2+ digits
    zIndex: 1, // Render above tab icon
  },

  /**
   * Badge Text
   *
   * Typography for the cart count number.
   *
   * - Small size (11) keeps badge compact and unobtrusive
   * - Bold weight ensures legibility despite small size
   * - badge.text color provides high contrast against badge.background
   */
  badgeText: {
    color: colors.badge.text,
    fontSize: 11,
    fontWeight: 'bold',
  },

  /**
   * Tab Bar Badge Style
   *
   * Transparent background allows our custom CartTabBadge component
   * to handle all styling. React Navigation's default badge is overridden
   * to give us full design control.
   */
  tabBarBadge: {
    backgroundColor: 'transparent',
  },
});

export default AppNavigator;
