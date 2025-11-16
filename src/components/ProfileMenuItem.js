import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';

/**
 * ProfileMenuItem - Menu item for profile screen
 * Displays an icon, label, optional value, and chevron indicator
 *
 * @param {React.Component} icon - Icon component to display
 * @param {string} label - Menu item label
 * @param {string} value - Optional value to display on the right
 * @param {function} onPress - Callback when item is pressed
 * @param {boolean} showChevron - Show chevron indicator (default: true)
 * @param {string} iconColor - Color for the icon (default: accent)
 * @param {object} style - Additional styles
 */
const ProfileMenuItem = ({
  icon: Icon,
  label,
  value,
  onPress,
  showChevron = true,
  iconColor = theme.colors.accent,
  style
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={styles.leftContent}>
        {Icon && (
          <View style={[styles.iconContainer, { color: iconColor }]}>
            {Icon}
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Right side */}
      <View style={styles.rightContent}>
        {value && <Text style={styles.value}>{value}</Text>}
        {showChevron && (
          <Text style={styles.chevron}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 20,
    height: 20,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: theme.typography.md,
    fontWeight: theme.typography.medium,
    color: theme.colors.primary,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: theme.typography.sm,
    color: theme.colors.secondary,
    marginRight: theme.spacing.sm,
  },
  chevron: {
    fontSize: 24,
    color: theme.colors.gray400,
    lineHeight: 24,
  },
});

export default ProfileMenuItem;
