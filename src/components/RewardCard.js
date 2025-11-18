import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme, { icon } from '../theme';

/**
 * RewardCard - Reward item card component
 * Displays reward information with icon, name, description, points, and redeem button
 *
 * @param {string} icon - Emoji or icon for the reward
 * @param {string} name - Reward name
 * @param {string} description - Reward description
 * @param {number} points - Points required to redeem
 * @param {boolean} available - Whether the reward is available to redeem
 * @param {string} expiresIn - Expiration info (optional)
 * @param {function} onRedeem - Callback when redeem button is pressed
 * @param {object} style - Additional styles
 */
const RewardCard = ({
  icon = '🎁',
  name,
  description,
  points,
  available = true,
  expiresIn,
  onRedeem,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
          {expiresIn && (
            <Text style={styles.expiration}>Expires in {expiresIn}</Text>
          )}
        </View>

        {/* Redeem Button */}
        <TouchableOpacity
          onPress={onRedeem}
          disabled={!available}
          style={[
            styles.redeemButton,
            !available && styles.redeemButtonDisabled
          ]}
          activeOpacity={0.7}
        >
          {available ? (
            <Text style={styles.redeemButtonText}>{points} pts</Text>
          ) : (
            <Text style={styles.lockedIcon}>🔒</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.soft,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: theme.typography.sizes.xl, // Scaled responsive size
  },
  infoContainer: {
    flex: 1,
    marginLeft: theme.spacing.lg,
    marginRight: theme.spacing.md,
  },
  name: {
    ...theme.typography.styles.bodyLargeMedium,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  description: {
    ...theme.typography.styles.body,
    color: theme.colors.secondary,
  },
  expiration: {
    ...theme.typography.styles.caption,
    color: theme.colors.secondary,
    marginTop: 4,
  },
  redeemButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.accent,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemButtonDisabled: {
    backgroundColor: theme.colors.gray100,
  },
  redeemButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.white,
  },
  lockedIcon: {
    fontSize: icon.sm, // Scaled responsive size
  },
});

export default RewardCard;
