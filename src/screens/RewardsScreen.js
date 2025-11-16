import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import theme from '../theme';

const { width } = Dimensions.get('window');

const RewardsScreen = () => {
  const [cartCount] = useState(2);

  const availableRewards = [
    {
      id: 1,
      name: 'Free Kava Shot',
      points: 500,
      description: 'Any size, any flavor',
      icon: '🥥',
      available: true,
      expiresIn: '30 days',
    },
    {
      id: 2,
      name: '$5 Off Purchase',
      points: 750,
      description: 'Minimum $15 order',
      icon: '💵',
      available: true,
      expiresIn: '30 days',
    },
    {
      id: 3,
      name: 'Free Add-In',
      points: 250,
      description: 'CBD, Extra Shot, or Flavor',
      icon: '✨',
      available: true,
      expiresIn: '30 days',
    },
    {
      id: 4,
      name: 'Birthday Special',
      points: 1000,
      description: 'Exclusive birthday drink',
      icon: '🎉',
      available: false,
      expiresIn: null,
    },
  ];

  const waysToEarn = [
    {
      title: 'Refer a Friend',
      points: '+250 pts',
      description: 'Both get rewards',
      icon: 'users',
    },
    {
      title: '2x Points Tuesdays',
      points: '2x',
      description: 'Every Tuesday all day',
      icon: 'calendar',
    },
    {
      title: 'Community Events',
      points: '+100 pts',
      description: 'Check in at events',
      icon: 'coffee',
    },
  ];

  const badges = [
    {
      name: 'Early Bird',
      description: '5 morning visits',
      earned: true,
      icon: '🌅',
    },
    {
      name: 'Kava Explorer',
      description: 'Tried 10 different drinks',
      earned: true,
      icon: '🗺️',
    },
    {
      name: 'Community Champion',
      description: 'Attended 3 events',
      earned: false,
      progress: 2,
      total: 3,
      icon: '🏆',
    },
    {
      name: 'Zen Master',
      description: '30-day streak',
      earned: false,
      progress: 12,
      total: 30,
      icon: '🧘',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards & Status</Text>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Enhanced Rewards Status Card */}
        <View style={styles.statusCardContainer}>
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statusCard}
          >
            <View style={styles.statusHeader}>
              <View>
                <Text style={styles.statusLabel}>MEMBER STATUS</Text>
                <Text style={styles.statusTier}>Gold Tier</Text>
              </View>
              <View style={styles.statusIconContainer}>
                <Feather name="award" size={24} color={theme.colors.white} />
              </View>
            </View>

            <View style={styles.pointsContainer}>
              <View style={styles.pointsRow}>
                <View>
                  <Text style={styles.pointsValue}>750</Text>
                  <Text style={styles.pointsLabel}>Community Points</Text>
                </View>
                <View style={styles.nextRewardContainer}>
                  <Text style={styles.nextRewardLabel}>Next Reward</Text>
                  <Text style={styles.nextRewardValue}>250 pts</Text>
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: '75%' }]} />
                </View>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Visits</Text>
              </View>
              <View style={[styles.statItem, styles.statItemBorder]}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Rewards</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>$89</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Redeemable Rewards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Redeem Rewards</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rewardsList}>
            {availableRewards.slice(0, 3).map((reward) => (
              <View key={reward.id} style={styles.rewardCard}>
                <View style={styles.rewardIconContainer}>
                  <Text style={styles.rewardIcon}>{reward.icon}</Text>
                </View>
                <View style={styles.rewardContent}>
                  <Text style={styles.rewardName}>{reward.name}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                  {reward.expiresIn && (
                    <Text style={styles.rewardExpiry}>Expires in {reward.expiresIn}</Text>
                  )}
                </View>
                <View style={styles.rewardAction}>
                  <TouchableOpacity
                    style={[
                      styles.redeemButton,
                      !reward.available && styles.redeemButtonDisabled,
                    ]}
                    disabled={!reward.available}
                  >
                    {reward.available ? (
                      <Text style={styles.redeemButtonText}>{reward.points} pts</Text>
                    ) : (
                      <Feather name="lock" size={16} color={theme.colors.gray400} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ways to Earn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ways to Earn</Text>
          <View style={styles.waysToEarnCard}>
            {waysToEarn.map((way, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.earnItem,
                  index < waysToEarn.length - 1 && styles.earnItemBorder,
                ]}
              >
                <View style={styles.earnIconContainer}>
                  <Feather name={way.icon} size={20} color={theme.colors.terracotta} />
                </View>
                <View style={styles.earnContent}>
                  <Text style={styles.earnTitle}>{way.title}</Text>
                  <Text style={styles.earnDescription}>{way.description}</Text>
                </View>
                <View style={styles.earnAction}>
                  <Text style={styles.earnPoints}>{way.points}</Text>
                  <Feather name="chevron-right" size={16} color={theme.colors.gray400} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Badges & Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges & Achievements</Text>
          <View style={styles.badgesGrid}>
            {badges.map((badge, index) => (
              <View
                key={index}
                style={[styles.badgeCard, !badge.earned && styles.badgeCardInactive]}
              >
                <Text
                  style={[styles.badgeIcon, !badge.earned && styles.badgeIconInactive]}
                >
                  {badge.icon}
                </Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                {!badge.earned && badge.progress && (
                  <View style={styles.badgeProgressContainer}>
                    <View style={styles.badgeProgressHeader}>
                      <Text style={styles.badgeProgressText}>
                        {badge.progress}/{badge.total}
                      </Text>
                      <Text style={styles.badgeProgressText}>
                        {Math.round((badge.progress / badge.total) * 100)}%
                      </Text>
                    </View>
                    <View style={styles.badgeProgressBarBackground}>
                      <View
                        style={[
                          styles.badgeProgressBarFill,
                          { width: (badge.progress / badge.total) * 100 + '%' },
                        ]}
                      />
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Cart Summary (when items in cart) */}
      {cartCount > 0 && (
        <View style={styles.floatingCartContainer}>
          <TouchableOpacity style={styles.floatingCartButton}>
            <View style={styles.floatingCartContent}>
              <View style={styles.floatingCartIconContainer}>
                <Feather name="shopping-bag" size={16} color={theme.colors.white} />
              </View>
              <View>
                <Text style={styles.floatingCartItems}>{cartCount} items</Text>
                <Text style={styles.floatingCartPrice}>$24.50</Text>
              </View>
            </View>
            <Text style={styles.floatingCartCTA}>View Cart →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.xxxl,
    fontWeight: theme.typography.bold,
    color: theme.colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Status Card
  statusCardContainer: {
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  statusCard: {
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.xl,
    ...theme.shadows.premium,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  statusLabel: {
    color: theme.colors.whiteTransparent80,
    fontSize: theme.typography.xs,
    fontWeight: theme.typography.medium,
    letterSpacing: 1,
    marginBottom: theme.spacing.xs,
  },
  statusTier: {
    color: theme.colors.white,
    fontSize: theme.typography.xxl,
    fontWeight: theme.typography.bold,
  },
  statusIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.whiteTransparent20,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsContainer: {
    backgroundColor: theme.colors.whiteTransparent10,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  pointsValue: {
    color: theme.colors.white,
    fontSize: theme.typography.xxl,
    fontWeight: theme.typography.bold,
  },
  pointsLabel: {
    color: theme.colors.whiteTransparent70,
    fontSize: theme.typography.sm,
  },
  nextRewardContainer: {
    alignItems: 'flex-end',
  },
  nextRewardLabel: {
    color: theme.colors.whiteTransparent70,
    fontSize: theme.typography.sm,
  },
  nextRewardValue: {
    color: theme.colors.white,
    fontSize: theme.typography.md,
    fontWeight: theme.typography.semibold,
  },
  progressBarContainer: {
    marginTop: theme.spacing.sm,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: theme.colors.whiteTransparent20,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.round,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.whiteTransparent20,
  },
  statValue: {
    color: theme.colors.white,
    fontSize: theme.typography.lg,
    fontWeight: theme.typography.bold,
  },
  statLabel: {
    color: theme.colors.whiteTransparent70,
    fontSize: theme.typography.xs,
  },

  // Section
  section: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.lg,
    fontWeight: theme.typography.semibold,
    color: theme.colors.primary,
  },
  viewAllButton: {
    color: theme.colors.accent,
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.medium,
  },

  // Rewards List
  rewardsList: {
    gap: theme.spacing.md,
  },
  rewardCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.soft,
  },
  rewardIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(107, 127, 71, 0.15)',
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  rewardIcon: {
    fontSize: 28,
  },
  rewardContent: {
    flex: 1,
  },
  rewardName: {
    fontSize: theme.typography.md,
    fontWeight: theme.typography.semibold,
    color: theme.colors.primary,
  },
  rewardDescription: {
    fontSize: theme.typography.sm,
    color: theme.colors.secondary,
    marginTop: 2,
  },
  rewardExpiry: {
    fontSize: theme.typography.xs,
    color: theme.colors.secondary,
    marginTop: 4,
  },
  rewardAction: {
    marginLeft: theme.spacing.sm,
  },
  redeemButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  redeemButtonDisabled: {
    backgroundColor: theme.colors.gray100,
  },
  redeemButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
  },

  // Ways to Earn
  waysToEarnCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
    ...theme.shadows.soft,
  },
  earnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  earnItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  earnIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(184, 101, 75, 0.15)',
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  earnContent: {
    flex: 1,
  },
  earnTitle: {
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
    color: theme.colors.primary,
  },
  earnDescription: {
    fontSize: theme.typography.xs,
    color: theme.colors.secondary,
    marginTop: 2,
  },
  earnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  earnPoints: {
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.bold,
    color: theme.colors.terracotta,
  },

  // Badges
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  badgeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    width: (width - theme.spacing.xl * 2 - theme.spacing.md) / 2,
    alignItems: 'center',
    ...theme.shadows.soft,
  },
  badgeCardInactive: {
    opacity: 0.75,
  },
  badgeIcon: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  badgeIconInactive: {
    opacity: 0.5,
  },
  badgeName: {
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: theme.typography.xs,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  badgeProgressContainer: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
  badgeProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badgeProgressText: {
    fontSize: theme.typography.xs,
    color: theme.colors.secondary,
  },
  badgeProgressBarBackground: {
    height: 6,
    backgroundColor: theme.colors.gray200,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  badgeProgressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.round,
  },

  // Floating Cart
  floatingCartContainer: {
    position: 'absolute',
    bottom: 80,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  floatingCartButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.float,
  },
  floatingCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  floatingCartIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.whiteTransparent10,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingCartItems: {
    color: theme.colors.white,
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
  },
  floatingCartPrice: {
    color: theme.colors.whiteTransparent70,
    fontSize: theme.typography.xs,
  },
  floatingCartCTA: {
    color: theme.colors.white,
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
  },
});

export default RewardsScreen;
