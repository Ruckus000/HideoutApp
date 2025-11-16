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

// Import colors
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Cart Badge Component
 * Shows the number of items in cart on the Cart tab icon
 */
const CartTabBadge = () => {
  const { cartCount } = useCart();

  if (cartCount === 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {cartCount > 99 ? '99+' : cartCount}
      </Text>
    </View>
  );
};

/**
 * Bottom Tab Navigator
 * Main navigation with 4 tabs: Home, Rewards, Cart, Profile
 * Based on spec 3.1 from ui-ux.md
 */
const BottomTabNavigator = () => {
  return (
    <View style={styles.tabContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

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
          tabBarActiveTintColor: colors.primary.main,
          tabBarInactiveTintColor: colors.light.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.light.surface,
            borderTopColor: colors.light.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarLabel: 'Rewards',
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarBadge: () => <CartTabBadge />,
            tabBarBadgeStyle: styles.tabBarBadge,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>

      {/* Floating Cart Bar - Above Tab Bar */}
      <FloatingCartBar />
    </View>
  );
};

/**
 * Root Stack Navigator
 * Includes tab navigator and any modal/full-screen stacks
 */
const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />

      {/* Additional screens can be added here */}
      {/* Example: Product Detail Screen as a modal or push */}
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
 * App Navigator
 * Main navigation component that wraps the entire app
 * Includes CartProvider for global cart state management
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

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: colors.badge.background,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  badgeText: {
    color: colors.badge.text,
    fontSize: 11,
    fontWeight: 'bold',
  },
  tabBarBadge: {
    backgroundColor: 'transparent',
  },
});

export default AppNavigator;
