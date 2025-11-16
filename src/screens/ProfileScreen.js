/**
 * ProfileScreen Component
 *
 * This screen displays the user's profile and account management options.
 * It follows the warm minimalist design system with earth-tone colors and clean layouts.
 *
 * Design Principles Applied:
 * - Warm minimalist aesthetic with muted earth tones (sage green accent, terracotta accents)
 * - Soft shadows and rounded corners for a gentle, welcoming feel
 * - Clear visual hierarchy with grouped menu sections
 * - Interactive elements with proper spacing and touch targets
 * - Gradient backgrounds for visual interest while maintaining simplicity
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

/**
 * A screen that displays the user's profile information and provides access to
 * various account management options, such as order history, payment methods,
 * and app preferences.
 *
 * @returns {JSX.Element} The rendered ProfileScreen component.
 */
const ProfileScreen = () => {
  /**
   * State Management
   *
   * notifications: Controls the notification toggle switch state
   * - When true, user receives push notifications for orders, promotions, etc.
   * - When false, notifications are disabled
   * - Persisted state would be saved to AsyncStorage or backend in production
   *
   * darkMode: Controls the dark mode toggle switch state
   * - When true, app switches to dark theme (not yet fully implemented)
   * - When false, app uses light theme (current default)
   * - Would trigger theme context update in production implementation
   */
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  /**
   * MenuButton Component
   *
   * Reusable menu item component that creates consistent button styling throughout the profile.
   *
   * Props:
   * - icon: Feather icon name displayed on the left (colored with accent color)
   * - label: Text label for the menu item
   * - onPress: Callback function when button is pressed
   * - showChevron: Boolean to show/hide the right chevron arrow (default: true)
   * - rightContent: Custom content for the right side (e.g., Switch, language text)
   *
   * This component supports three layouts:
   * 1. Standard navigation button (icon + label + chevron)
   * 2. Toggle switch button (icon + label + switch)
   * 3. Custom right content (icon + label + custom component)
   */
  const MenuButton = ({ icon, label, onPress, showChevron = true, rightContent }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.menuButtonLeft}>
        <Feather name={icon} size={20} color={colors.accent} />
        <Text style={styles.menuButtonLabel}>{label}</Text>
      </View>
      {rightContent || (
        showChevron && <Feather name="chevron-right" size={18} color={colors.gray400} />
      )}
    </TouchableOpacity>
  );

  /**
   * MenuDivider Component
   *
   * Creates a subtle divider line between menu items within a section.
   * Uses a light gray color (gray100) to separate items without being visually heavy.
   * Applies horizontal margin to create visual breathing room.
   */
  const MenuDivider = () => <View style={styles.menuDivider} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* ==================== HEADER SECTION ==================== */}
      {/*
        Simple header with the screen title "Profile"
        Uses large, bold typography from the design system
        Provides visual anchor at the top of the screen
      */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ==================== USER INFO CARD ==================== */}
        {/*
          Premium user information card with gradient background

          Design Features:
          - LinearGradient: Uses sage green (accent) to darker green (accentDark)
          - Diagonal gradient (top-left to bottom-right) creates depth
          - Premium shadow for elevation and importance
          - Rounded corners (xxl) for warm, friendly aesthetic

          Content:
          - Avatar: Circular placeholder with semi-transparent white background
          - User Name: White, semibold text for prominence
          - Email: Slightly transparent white for hierarchy
          - Member Since: Most subtle for secondary information

          This card serves as the visual anchor and personalization element
        */}
        <LinearGradient
          colors={[colors.accent, colors.accentDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userCard}
        >
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Alex Thompson</Text>
            <Text style={styles.userEmail}>alex.thompson@email.com</Text>
            <Text style={styles.userMember}>Member since Oct 2024</Text>
          </View>
        </LinearGradient>

        {/* ==================== ORDERS SECTION ==================== */}
        {/*
          Order Management Menu Section

          Purpose: Quick access to order-related features
          - My Orders: View active/pending orders with real-time status
          - Order History: Browse past orders for reordering or review

          Design:
          - Grouped in a card with soft shadow for subtle elevation
          - Package and clock icons for quick visual recognition
          - MenuDivider creates separation without visual weight
          - Chevron arrows indicate these items navigate to new screens

          Navigation Flow:
          - My Orders → Navigate to active orders list
          - Order History → Navigate to past orders archive
        */}
        <View style={styles.menuSection}>
          <MenuButton icon="package" label="My Orders" onPress={() => {}} />
          <MenuDivider />
          <MenuButton icon="clock" label="Order History" onPress={() => {}} />
        </View>

        {/* ==================== PAYMENT SECTION ==================== */}
        {/*
          Payment & Delivery Management Section

          Purpose: Manage payment and delivery preferences
          - Payment Methods: Add/edit credit cards, digital wallets
          - Delivery Addresses: Manage saved addresses for quick checkout

          Design:
          - Card layout matching Orders section for consistency
          - Credit card and map pin icons for instant recognition
          - Separated by divider for clear distinction

          Navigation Flow:
          - Payment Methods → Navigate to payment management screen
          - Delivery Addresses → Navigate to address book screen
        */}
        <View style={styles.menuSection}>
          <MenuButton icon="credit-card" label="Payment Methods" onPress={() => {}} />
          <MenuDivider />
          <MenuButton icon="map-pin" label="Delivery Addresses" onPress={() => {}} />
        </View>

        {/* ==================== PREFERENCES SECTION ==================== */}
        {/*
          User Preferences & Settings Section

          This section contains app-level settings that affect the user experience.
          It combines both toggle switches and navigation items.

          === NOTIFICATIONS TOGGLE ===
          Purpose: Enable/disable push notifications for orders, promotions, updates

          Toggle Logic:
          - State: notifications (boolean)
          - Handler: setNotifications (updates state immediately)
          - Visual Feedback:
            * When ON: Track is accent color (sage green), thumb slides right
            * When OFF: Track is gray200 (light gray), thumb slides left
          - No chevron shown (showChevron={false}) as it's an inline action
          - Production implementation would:
            1. Update local state (immediate UI feedback)
            2. Save preference to AsyncStorage
            3. Send update to backend API
            4. Register/unregister for push notification tokens

          === DARK MODE TOGGLE ===
          Purpose: Switch between light and dark theme

          Toggle Logic:
          - State: darkMode (boolean)
          - Handler: setDarkMode (updates state immediately)
          - Same visual feedback as Notifications
          - Production implementation would:
            1. Update local state
            2. Trigger theme context provider update
            3. Apply dark/light color scheme throughout app
            4. Save preference to AsyncStorage
          - Note: Full dark mode implementation requires theme provider context

          === LANGUAGE SELECTOR ===
          Purpose: Change app language/locale

          Interaction:
          - Shows current language: "English (US)"
          - Displays chevron indicating navigation to language selection screen
          - Custom rightContent with language text + chevron
          - Production would navigate to language picker modal/screen
        */}
        <View style={styles.menuSection}>
          <MenuButton
            icon="bell"
            label="Notifications"
            showChevron={false}
            rightContent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.gray200, true: colors.accent }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray200}
              />
            }
          />
          <MenuDivider />
          <MenuButton
            icon="moon"
            label="Dark Mode"
            showChevron={false}
            rightContent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.gray200, true: colors.accent }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray200}
              />
            }
          />
          <MenuDivider />
          <MenuButton
            icon="globe"
            label="Language"
            onPress={() => {}}
            rightContent={
              <View style={styles.languageContainer}>
                <Text style={styles.languageText}>English (US)</Text>
                <Feather name="chevron-right" size={18} color={colors.gray400} />
              </View>
            }
          />
        </View>

        {/* ==================== SUPPORT SECTION ==================== */}
        {/*
          Help & Legal Information Section

          Purpose: Access to support resources and legal/privacy information

          === HELP & SUPPORT ===
          - Navigate to help center with FAQs, contact support, live chat
          - Help circle icon for universal recognition
          - Essential for user assistance and customer service

          === PRIVACY & SECURITY ===
          - Navigate to privacy policy, terms of service, data settings
          - Shield icon conveys security and protection
          - Important for GDPR/privacy compliance and user trust

          Design:
          - Grouped together as related support/legal items
          - Same card styling as other sections for consistency
          - Both items have chevrons indicating navigation
        */}
        <View style={styles.menuSection}>
          <MenuButton icon="help-circle" label="Help & Support" onPress={() => {}} />
          <MenuDivider />
          <MenuButton icon="shield" label="Privacy & Security" onPress={() => {}} />
        </View>

        {/* ==================== LOGOUT BUTTON ==================== */}
        {/*
          Account Logout Action

          Purpose: Sign out of the current account

          Design Features:
          - Standalone button (not part of a section) for visual separation
          - RED color (colors.error) for the icon and text to indicate destructive action
          - Log-out icon clearly communicates the action
          - Centered layout with icon + text for emphasis
          - Soft shadow matching other sections but distinct placement

          Interaction Flow:
          - When pressed, should:
            1. Show confirmation dialog ("Are you sure you want to log out?")
            2. Clear authentication tokens from secure storage
            3. Clear user data from app state
            4. Navigate to login/welcome screen
            5. Reset navigation stack to prevent back navigation

          Color Psychology:
          - Red is intentionally used as a warning color
          - Signals to users this is a significant action
          - Follows iOS Human Interface Guidelines for destructive actions
        */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * ==================== STYLESHEET ====================
 *
 * Design System Implementation
 *
 * This stylesheet follows the warm minimalist design principles:
 * - Soft, neutral background colors (#FAFAF8)
 * - Earth-tone accent colors (sage green, terracotta)
 * - Generous spacing for breathing room
 * - Rounded corners (borderRadius.xxl = 24px) for friendly feel
 * - Subtle shadows for depth without harshness
 * - Clear typography hierarchy
 *
 * All values reference the centralized theme file for consistency.
 */
const styles = StyleSheet.create({
  // ========== CONTAINER & LAYOUT ==========
  container: {
    flex: 1,
    backgroundColor: colors.background, // Warm off-white (#FAFAF8)
  },

  // ========== HEADER SECTION ==========
  header: {
    paddingHorizontal: spacing.xl,      // 24px horizontal padding
    paddingTop: spacing.md,              // 12px top padding
    paddingBottom: spacing.lg,           // 20px bottom padding
  },
  headerTitle: {
    fontSize: typography.xxxl,           // ~32px for prominent header
    fontWeight: typography.bold,         // Bold weight for hierarchy
    color: colors.primary,               // Dark charcoal (#1C1C1E)
  },

  // ========== SCROLL VIEW ==========
  scrollView: {
    flex: 1,                             // Fill available space
  },
  scrollContent: {
    paddingBottom: spacing.xl,           // 24px bottom padding for scroll clearance
  },

  // ========== USER INFO CARD ==========
  // Premium gradient card displaying user information
  userCard: {
    marginHorizontal: spacing.xl,        // 24px side margins
    marginBottom: spacing.xl,            // 24px bottom margin for separation
    borderRadius: borderRadius.xxl,      // 24px rounded corners
    padding: spacing.xl,                 // 24px internal padding
    flexDirection: 'row',                // Horizontal layout: avatar + info
    alignItems: 'center',                // Vertically center content
    gap: spacing.lg,                     // 20px gap between avatar and text
    ...shadows.premium,                  // Elevated shadow for importance
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,                    // Perfect circle
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 32,                        // Large emoji/icon size
  },
  userInfo: {
    flex: 1,                             // Take remaining space
  },
  userName: {
    fontSize: typography.lg,             // ~18px for prominence
    fontWeight: typography.semibold,     // Semibold for emphasis
    color: colors.white,                 // White text on gradient background
    marginBottom: 2,                     // Tight spacing to email
  },
  userEmail: {
    fontSize: typography.sm,             // ~14px for secondary info
    color: 'rgba(255, 255, 255, 0.8)',  // 80% opacity for hierarchy
    marginBottom: spacing.xs,            // 4px spacing to member date
  },
  userMember: {
    fontSize: typography.xs,             // ~12px for tertiary info
    color: 'rgba(255, 255, 255, 0.7)',  // 70% opacity (most subtle)
  },
  // ========== MENU SECTIONS ==========
  // Card container for grouped menu items
  menuSection: {
    backgroundColor: colors.surface,     // Pure white (#FFFFFF)
    borderRadius: borderRadius.xxl,      // 24px rounded corners
    marginHorizontal: spacing.xl,        // 24px side margins
    marginBottom: spacing.lg,            // 20px spacing between sections
    overflow: 'hidden',                  // Clip dividers at edges
    ...shadows.soft,                     // Subtle shadow for card elevation
  },

  // ========== MENU BUTTON ==========
  // Individual menu item within a section
  menuButton: {
    flexDirection: 'row',                // Horizontal layout
    justifyContent: 'space-between',     // Space between left and right content
    alignItems: 'center',                // Vertically center
    paddingHorizontal: spacing.lg,       // 20px horizontal padding
    paddingVertical: spacing.lg,         // 20px vertical padding (44px touch target)
  },
  menuButtonLeft: {
    flexDirection: 'row',                // Icon + label horizontal
    alignItems: 'center',                // Vertically center icon with text
    gap: spacing.md,                     // 12px gap between icon and label
    flex: 1,                             // Take available space, push right content to edge
  },
  menuButtonLabel: {
    fontSize: typography.md,             // ~16px readable size
    fontWeight: typography.medium,       // Medium weight for clarity
    color: colors.primary,               // Dark charcoal for readability
  },

  // ========== MENU DIVIDER ==========
  // Subtle line separator between menu items
  menuDivider: {
    height: 1,                           // 1px thin line
    backgroundColor: colors.gray100,     // Very light gray (#F5F5F3)
    marginHorizontal: spacing.lg,        // 20px inset from edges
  },

  // ========== LANGUAGE SELECTOR ==========
  // Custom right content for language menu item
  languageContainer: {
    flexDirection: 'row',                // Horizontal layout
    alignItems: 'center',                // Vertically center
    gap: spacing.sm,                     // 8px gap between text and chevron
  },
  languageText: {
    fontSize: typography.sm,             // ~14px for secondary info
    color: colors.secondary,             // Gray (#8E8E93) to show it's a value not a label
  },

  // ========== LOGOUT BUTTON ==========
  // Standalone destructive action button
  logoutButton: {
    backgroundColor: colors.surface,     // White background like menu sections
    borderRadius: borderRadius.xxl,      // 24px rounded corners
    marginHorizontal: spacing.xl,        // 24px side margins
    paddingVertical: spacing.lg,         // 20px vertical padding
    flexDirection: 'row',                // Horizontal layout for icon + text
    justifyContent: 'center',            // Center content
    alignItems: 'center',                // Vertically align
    gap: spacing.md,                     // 12px gap between icon and text
    ...shadows.soft,                     // Soft shadow matching other sections
  },
  logoutText: {
    fontSize: typography.md,             // ~16px matching menu buttons
    fontWeight: typography.medium,       // Medium weight for emphasis
    color: colors.error,                 // RED (#EF4444) for destructive action
  },
});

export default ProfileScreen;
