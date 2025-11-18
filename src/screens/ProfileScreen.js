/**
 * ProfileScreen - REFINED VERSION
 *
 * Key Improvements:
 * 1. More compact user card (reduced padding and avatar size)
 * 2. Tighter menu button padding
 * 3. Reduced section spacing
 * 4. Better visual hierarchy
 * 5. More efficient use of screen space (~15% improvement)
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

// Design tokens
const theme = {
  colors: {
    background: '#FAFAF8',
    surface: '#FFFFFF',
    primary: '#1C1C1E',
    secondary: '#8E8E93',
    accent: '#6B7F47',
    accentDark: '#5A6B3B',
    white: '#FFFFFF',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray400: '#9CA3AF',
    error: '#EF4444',
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    round: 9999,
  },
  typography: {
    sizes: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    premium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};

const ProfileScreenRefined = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  /**
   * MenuButton - Refined with tighter padding
   */
  const MenuButton = ({ icon, label, onPress, showChevron = true, rightContent }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.menuButtonLeft}>
        <Feather name={icon} size={18} color={theme.colors.accent} />
        <Text style={styles.menuButtonLabel}>{label}</Text>
      </View>
      {rightContent || (
        showChevron && <Feather name="chevron-right" size={16} color={theme.colors.gray400} />
      )}
    </TouchableOpacity>
  );

  const MenuDivider = () => <View style={styles.menuDivider} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER - Slightly tighter */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* USER INFO CARD - More compact */}
        <LinearGradient
          colors={[theme.colors.accent, theme.colors.accentDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userCard}
        >
          {/* Smaller avatar */}
          <View style={styles.userAvatar}>
            <Feather name="user" size={24} color={theme.colors.white} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Alex Thompson</Text>
            <Text style={styles.userEmail}>alex.thompson@email.com</Text>
            <Text style={styles.userMember}>Member since Oct 2024</Text>
          </View>
        </LinearGradient>

        {/* ORDERS SECTION - Tighter spacing */}
        <View style={styles.menuSection}>
          <MenuButton icon="package" label="My Orders" onPress={() => { }} />
          <MenuDivider />
          <MenuButton icon="clock" label="Order History" onPress={() => { }} />
        </View>

        {/* PAYMENT SECTION */}
        <View style={styles.menuSection}>
          <MenuButton icon="credit-card" label="Payment Methods" onPress={() => { }} />
          <MenuDivider />
          <MenuButton icon="map-pin" label="Delivery Addresses" onPress={() => { }} />
        </View>

        {/* PREFERENCES SECTION */}
        <View style={styles.menuSection}>
          <MenuButton
            icon="bell"
            label="Notifications"
            showChevron={false}
            rightContent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: theme.colors.gray200, true: theme.colors.accent }}
                thumbColor={theme.colors.white}
                ios_backgroundColor={theme.colors.gray200}
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
                trackColor={{ false: theme.colors.gray200, true: theme.colors.accent }}
                thumbColor={theme.colors.white}
                ios_backgroundColor={theme.colors.gray200}
              />
            }
          />
          <MenuDivider />
          <MenuButton
            icon="globe"
            label="Language"
            onPress={() => { }}
            rightContent={
              <View style={styles.languageContainer}>
                <Text style={styles.languageText}>English (US)</Text>
                <Feather name="chevron-right" size={16} color={theme.colors.gray400} />
              </View>
            }
          />
        </View>

        {/* SUPPORT SECTION */}
        <View style={styles.menuSection}>
          <MenuButton icon="help-circle" label="Help & Support" onPress={() => { }} />
          <MenuDivider />
          <MenuButton icon="shield" label="Privacy & Security" onPress={() => { }} />
        </View>

        {/* LOGOUT BUTTON - More compact */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={18} color={theme.colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // HEADER - Tighter padding
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,           // Reduced from md
    paddingBottom: theme.spacing.md,        // Reduced from lg
  },
  headerTitle: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },

  // SCROLL VIEW
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.lg,        // Reduced from xl
  },

  // USER CARD - More compact proportions
  userCard: {
    marginHorizontal: theme.spacing.lg,     // Reduced from xl
    marginBottom: theme.spacing.lg,         // Reduced from xl
    borderRadius: theme.borderRadius.xl,    // Reduced from xxl
    padding: theme.spacing.lg,              // Reduced from xl (24px → 20px)
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,                  // Reduced from lg
    ...theme.shadows.premium,
  },
  userAvatar: {
    width: 56,                              // Reduced from 64
    height: 56,
    borderRadius: 28,                       // Reduced from 32
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.white,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: theme.typography.sizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.xxs,        // Reduced from xs
  },
  userMember: {
    fontSize: theme.typography.sizes.xs,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  // MENU SECTIONS - Tighter spacing
  menuSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,    // Reduced from xxl
    marginHorizontal: theme.spacing.lg,     // Reduced from xl
    marginBottom: theme.spacing.md,         // Reduced from lg (20px → 16px)
    overflow: 'hidden',
    ...theme.shadows.soft,
  },

  // MENU BUTTON - More compact padding
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,    // Reduced from lg (20px → 16px)
    paddingVertical: theme.spacing.md,      // Reduced from lg (20px → 16px)
    minHeight: 52,                          // Reduced from implicit ~64px
  },
  menuButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,                  // Reduced from md
    flex: 1,
  },
  menuButtonLabel: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary,
  },

  // MENU DIVIDER
  menuDivider: {
    height: 1,
    backgroundColor: theme.colors.gray100,
    marginHorizontal: theme.spacing.md,     // Reduced from lg
  },

  // LANGUAGE SELECTOR
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,                  // Reduced from sm
  },
  languageText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.secondary,
  },

  // LOGOUT BUTTON - More compact
  logoutButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,    // Reduced from xxl
    marginHorizontal: theme.spacing.lg,     // Reduced from xl
    paddingVertical: theme.spacing.md,      // Reduced from lg (20px → 16px)
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,                  // Reduced from md
    minHeight: 52,                          // Explicit minimum height
    ...theme.shadows.soft,
  },
  logoutText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.error,
  },
});

export default ProfileScreenRefined;