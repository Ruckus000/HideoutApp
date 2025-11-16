import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

  const MenuDivider = () => <View style={styles.menuDivider} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
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

        {/* Orders Section */}
        <View style={styles.menuSection}>
          <MenuButton icon="package" label="My Orders" onPress={() => {}} />
          <MenuDivider />
          <MenuButton icon="clock" label="Order History" onPress={() => {}} />
        </View>

        {/* Payment Section */}
        <View style={styles.menuSection}>
          <MenuButton icon="credit-card" label="Payment Methods" onPress={() => {}} />
          <MenuDivider />
          <MenuButton icon="map-pin" label="Delivery Addresses" onPress={() => {}} />
        </View>

        {/* Preferences Section */}
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

        {/* Support Section */}
        <View style={styles.menuSection}>
          <MenuButton icon="help-circle" label="Help & Support" onPress={() => {}} />
          <MenuDivider />
          <MenuButton icon="shield" label="Privacy & Security" onPress={() => {}} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.xxxl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  userCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    ...shadows.premium,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.white,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: typography.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xs,
  },
  userMember: {
    fontSize: typography.xs,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  menuSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.soft,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  menuButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  menuButtonLabel: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.gray100,
    marginHorizontal: spacing.lg,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  languageText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  logoutButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    marginHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.soft,
  },
  logoutText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.error,
  },
});

export default ProfileScreen;
