/**
 * Navigation types for the HideOut Kava App
 * Defines the navigation structure and parameter lists
 */

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Bottom Tab Navigator
export type BottomTabParamList = {
  Home: undefined;
  Rewards: undefined;
  Cart: undefined;
  Profile: undefined;
};

// Root Stack Navigator (for future use with modals, etc.)
export type RootStackParamList = {
  MainTabs: undefined;
  // Add other screens here as needed (e.g., ProductDetail, Checkout, etc.)
};

// Navigation prop types
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

export type RewardsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Rewards'>,
  StackNavigationProp<RootStackParamList>
>;

export type CartScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Cart'>,
  StackNavigationProp<RootStackParamList>
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  StackNavigationProp<RootStackParamList>
>;
