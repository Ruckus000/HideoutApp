/**
 * Navigation types for the HideOut Kava App
 * Defines the navigation structure and parameter lists
 */

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Defines the parameters for each screen in the bottom tab navigator.
 * `undefined` means the route takes no parameters.
 */
export type BottomTabParamList = {
  Home: undefined;
  Rewards: undefined;
  Cart: undefined;
  Profile: undefined;
};

/**
 * Defines the parameters for each screen in the root stack navigator.
 * This is where you would add screens for modals, detail views, etc.
 */
export type RootStackParamList = {
  MainTabs: undefined;
  // Example: ProductDetail: { productId: string };
};

/**
 * Type definition for the navigation prop in the HomeScreen.
 * It combines the bottom tab navigation prop with the root stack navigation prop.
 */
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

/**
 * Type definition for the navigation prop in the RewardsScreen.
 */
export type RewardsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Rewards'>,
  StackNavigationProp<RootStackParamList>
>;

/**
 * Type definition for the navigation prop in the CartScreen.
 */
export type CartScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Cart'>,
  StackNavigationProp<RootStackParamList>
>;

/**
 * Type definition for the navigation prop in the ProfileScreen.
 */
export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  StackNavigationProp<RootStackParamList>
>;
