/**
 * RewardsScreen Component
 *
 * This screen displays the user's rewards program status and available benefits.
 * It implements a comprehensive loyalty system featuring:
 * - Tiered membership status (Bronze, Silver, Gold, Platinum)
 * - Points accumulation and tracking
 * - Redeemable rewards catalog
 * - Achievement badges with progress tracking
 * - Multiple ways to earn points
 *
 * Design Philosophy:
 * Follows the HideOut Kava app's warm minimalist design system with:
 * - Earthy color palette (sage green #6B7F47, terracotta #B8654B)
 * - Generous whitespace and breathing room
 * - Soft shadows for depth without harshness
 * - Clear visual hierarchy with bold typography
 * - Smooth gradients and rounded corners for approachability
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import theme, { icon } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

/**
 * A screen that displays the user's loyalty rewards status, including their current tier,
 * points, redeemable rewards, and achievement badges. It also shows different ways
 * for the user to earn more points.
 *
 * @returns {JSX.Element} The rendered RewardsScreen component.
 */
const RewardsScreen = () => {
  // Responsive design hook for device-aware layouts
  const { isTablet, wp } = useResponsive();

  // Cart state - tracks number of items for floating cart summary
  // This enables cross-screen cart awareness without full state management
  const [cartCount] = useState(2);

  /**
   * REWARDS CATALOG
   * Defines all available rewards that users can redeem with their points.
   *
   * Point Tiers:
   * - 250 pts: Small perks (add-ins, extras)
   * - 500 pts: Free drinks
   * - 750 pts: Discount offers
   * - 1000 pts: Premium/special rewards
   *
   * Fields:
   * - id: Unique identifier for tracking redemptions
   * - name: Display name of the reward
   * - points: Cost in community points to redeem
   * - description: Details about the reward benefit
   * - icon: Emoji visual identifier (warm, friendly design element)
   * - available: Whether user has enough points (dynamically calculated in production)
   * - expiresIn: Time-limited validity to encourage timely redemption
   */
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
      available: false, // User doesn't have enough points yet
      expiresIn: null,
    },
  ];

  /**
   * WAYS TO EARN POINTS
   * Showcases different methods for users to accumulate community points.
   * Encourages engagement through various activities beyond just purchases.
   *
   * Strategy:
   * - Referrals: Viral growth through word-of-mouth
   * - Special days: Drive traffic on slower days (Tuesdays)
   * - Community events: Build local community and brand loyalty
   *
   * Fields:
   * - title: Name of the earning opportunity
   * - points: Point value (can be fixed amount or multiplier)
   * - description: Brief explanation of how it works
   * - icon: Feather icon name for visual representation
   */
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

  /**
   * BADGES & ACHIEVEMENTS SYSTEM
   * Gamification element that rewards specific behaviors and milestones.
   * Displays both completed achievements and progress toward future ones.
   *
   * Badge Categories:
   * - Behavioral: Encourage specific actions (early visits, event attendance)
   * - Exploratory: Promote trying new products (drink variety)
   * - Loyalty: Reward consistent engagement (streaks)
   *
   * Progress Tracking:
   * - Earned badges: Displayed in full color with celebratory feel
   * - In-progress badges: Shown with grayscale/opacity reduction
   * - Progress bar: Visual representation of completion percentage
   *   Formula: (current progress / total required) * 100
   *   Example: Community Champion = (2/3) * 100 = 66.7%
   *
   * Fields:
   * - name: Badge title
   * - description: Achievement criteria
   * - earned: Boolean indicating if unlocked
   * - progress: Current count toward goal (for unearned badges)
   * - total: Required count to unlock (for unearned badges)
   * - icon: Emoji representation (matches warm, friendly design)
   */
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
    <SafeAreaView style={styles.container} edges={['top']}>
      {/*
        HEADER SECTION
        Displays the screen title with clear visual hierarchy.
        Uses bold, large typography to establish context immediately.
        Single-word title follows Apple/Airbnb design pattern.

        SafeAreaView ensures the header is not cut off by status bar/notch
        on devices like iPhone 14 Pro, matching the pattern used in HomeScreen.
      */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
      </View>

      {/*
        MAIN SCROLLABLE CONTENT
        Contains all reward information in a vertically scrollable view.
        Bottom padding prevents content from being hidden behind floating cart.
      */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*
          ENHANCED REWARDS STATUS CARD
          The hero section displaying membership tier, points, and user stats.

          TIER SYSTEM:
          - Bronze: 0-249 points
          - Silver: 250-499 points
          - Gold: 500-999 points (current: 750 pts)
          - Platinum: 1000+ points

          DESIGN ELEMENTS:
          - LinearGradient: Creates depth with sage green gradient (accent → accentDark)
          - Premium shadow: Elevated card effect for importance
          - White text/elements on dark background for maximum contrast and readability
        */}
        <View style={styles.statusCardContainer}>
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statusCard}
          >
            {/*
              Membership Tier Header
              Shows current tier level with award icon for achievement feel
            */}
            <View style={styles.statusHeader}>
              <View>
                <Text style={styles.statusLabel}>MEMBER STATUS</Text>
                <Text style={styles.statusTier}>Gold Tier</Text>
              </View>
              <View style={styles.statusIconContainer}>
                <Feather name="award" size={icon.xl} color={theme.colors.white} />
              </View>
            </View>

            {/*
              POINTS TRACKING SECTION
              Displays current points balance and progress to next reward.

              PROGRESS BAR CALCULATION:
              Current: 750 points
              Next Reward: 1000 points (250 points away)
              Progress: 750/1000 = 75%

              The progress bar width is set to 75% to visually represent how close
              the user is to their next reward milestone. This creates motivation
              to accumulate the remaining 250 points.
            */}
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
                  {/*
                    Progress bar shows 75% completion
                    Calculation: (current points / next milestone) * 100
                    In production: (750 / 1000) * 100 = 75%
                  */}
                  <View style={[styles.progressBarFill, { width: '75%' }]} />
                </View>
              </View>
            </View>

            {/*
              STATISTICS GRID
              Three-column layout showing key engagement metrics:
              - Visits: Number of check-ins (drives foot traffic)
              - Rewards: Total rewards redeemed (shows value received)
              - Saved: Dollar amount saved through rewards (demonstrates ROI)

              Vertical borders between stats create visual separation while
              maintaining a cohesive grid layout.
            */}
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

        {/*
          REDEEMABLE REWARDS SECTION
          Catalog of available rewards users can claim with their points.

          DESIGN STRATEGY:
          - Shows only top 3 rewards to avoid overwhelming the user
          - "View All" button provides access to full catalog
          - Each reward displays key info: name, description, cost, expiration

          EXPIRATION LOGIC:
          - Time-limited offers create urgency and encourage redemption
          - Prevents point hoarding while maintaining engagement
          - Currently set to 30 days for active rewards

          AVAILABILITY SYSTEM:
          - Green accent button: User has enough points (can redeem)
          - Gray button with lock icon: Insufficient points (aspirational)
          - Showing locked rewards motivates users to earn more points
        */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Redeem Rewards</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rewardsList}>
            {/* Display first 3 rewards - slice(0, 3) limits array to improve scrolling performance */}
            {availableRewards.slice(0, 3).map((reward) => (
              <View key={reward.id} style={styles.rewardCard}>
                {/* Icon container with subtle accent-colored background */}
                <View style={styles.rewardIconContainer}>
                  <Text style={styles.rewardIcon}>{reward.icon}</Text>
                </View>
                {/* Reward information - flex:1 allows it to fill available space */}
                <View style={styles.rewardContent}>
                  <Text style={styles.rewardName}>{reward.name}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                  {/* Conditional rendering: only show expiration if it exists */}
                  {reward.expiresIn && (
                    <Text style={styles.rewardExpiry}>Expires in {reward.expiresIn}</Text>
                  )}
                </View>
                {/*
                  Redeem button with dynamic styling:
                  - Available: Accent green background, shows point cost
                  - Unavailable: Gray background, shows lock icon
                  - disabled prop prevents interaction when unavailable
                */}
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
                      <Feather name="lock" size={icon.sm} color={theme.colors.gray400} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/*
          WAYS TO EARN SECTION
          Educational component showing users how to accumulate points beyond purchases.

          DESIGN APPROACH:
          - Grouped in single card to emphasize they're all earning opportunities
          - Terracotta accent for icons creates visual distinction from rewards (sage green)
          - Chevron right indicates these items are tappable for more details
          - Border between items (except last) provides clear separation

          USER ENGAGEMENT:
          Each method targets different engagement behaviors:
          1. Referrals (+250 pts): Viral growth, rewards both referrer and referee
          2. 2x Points Tuesdays: Drives traffic on traditionally slower days
          3. Community Events (+100 pts): Builds local presence and brand loyalty

          WARM MINIMALIST DESIGN:
          - Soft terracotta background (15% opacity) for icons
          - Consistent spacing and alignment
          - Clear typography hierarchy (title bold, description lighter)
        */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ways to Earn</Text>
          <View style={styles.waysToEarnCard}>
            {waysToEarn.map((way, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.earnItem,
                  /* Conditional border: add border to all except last item for clean visual separation */
                  index < waysToEarn.length - 1 && styles.earnItemBorder,
                ]}
              >
                {/* Terracotta-tinted icon container - distinct from reward green */}
                <View style={styles.earnIconContainer}>
                  <Feather name={way.icon} size={icon.md} color={theme.colors.terracotta} />
                </View>
                <View style={styles.earnContent}>
                  <Text style={styles.earnTitle}>{way.title}</Text>
                  <Text style={styles.earnDescription}>{way.description}</Text>
                </View>
                {/* Points badge and chevron indicate tappable item with more details */}
                <View style={styles.earnAction}>
                  <Text style={styles.earnPoints}>{way.points}</Text>
                  <Feather name="chevron-right" size={icon.sm} color={theme.colors.gray400} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/*
          BADGES & ACHIEVEMENTS SECTION
          Gamification system rewarding specific user behaviors and milestones.

          GRID LAYOUT:
          - 2-column grid layout for efficient space usage
          - Width calculation: (screen width - horizontal padding - gap) / 2
          - Ensures consistent sizing across all devices

          VISUAL STATES:
          1. EARNED BADGES:
             - Full opacity (1.0)
             - Full color icon (no filters)
             - Shows achievement celebration

          2. IN-PROGRESS BADGES:
             - Reduced opacity (0.75) on entire card
             - Grayscale icon with 50% opacity (badgeIconInactive)
             - Progress bar shows completion percentage
             - Motivates users to complete the achievement

          PROGRESS BAR LOGIC:
          For unearned badges with progress tracking:
          - Shows fraction: "2/3" or "12/30"
          - Shows percentage: Math.round((2/3) * 100) = 67%
          - Bar width dynamically set: (progress/total) * 100 + '%'

          Examples:
          - Community Champion: (2/3) * 100 = 66.7% → rounds to 67%
          - Zen Master: (12/30) * 100 = 40%

          DESIGN CONSISTENCY:
          - Soft shadows maintain warm minimalist aesthetic
          - Accent green progress bars match brand color
          - Center alignment creates balanced, organized appearance
        */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges & Achievements</Text>
          <View style={styles.badgesGrid}>
            {badges.map((badge, index) => (
              <View
                key={index}
                style={[
                  styles.badgeCard,
                  /* Reduce opacity for unearned badges to indicate locked state */
                  !badge.earned && styles.badgeCardInactive,
                ]}
              >
                <Text
                  style={[
                    styles.badgeIcon,
                    /* Apply grayscale and opacity to unearned badge icons */
                    !badge.earned && styles.badgeIconInactive,
                  ]}
                >
                  {badge.icon}
                </Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                {/*
                  PROGRESS TRACKING (for unearned badges only)
                  Conditional rendering: only show if badge is not earned AND has progress data
                  This provides visual feedback on how close users are to unlocking the badge
                */}
                {!badge.earned && badge.progress && (
                  <View style={styles.badgeProgressContainer}>
                    {/* Progress header shows both fraction and percentage */}
                    <View style={styles.badgeProgressHeader}>
                      <Text style={styles.badgeProgressText}>
                        {badge.progress}/{badge.total}
                      </Text>
                      <Text style={styles.badgeProgressText}>
                        {/* Math.round ensures clean percentage display (no decimals) */}
                        {Math.round((badge.progress / badge.total) * 100)}%
                      </Text>
                    </View>
                    {/* Progress bar visual representation */}
                    <View style={styles.badgeProgressBarBackground}>
                      <View
                        style={[
                          styles.badgeProgressBarFill,
                          /*
                            Dynamic width calculation for accurate progress visualization
                            Example: (12/30) * 100 = 40% width
                          */
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

    </SafeAreaView>
  );
};

/*
  ═══════════════════════════════════════════════════════════════════════
  STYLESHEET - WARM MINIMALIST DESIGN SYSTEM
  ═══════════════════════════════════════════════════════════════════════

  This stylesheet implements the HideOut Kava app's design philosophy:

  COLOR PALETTE:
  - Background: #FAFAF8 (warm off-white)
  - Surface: #FFFFFF (pure white for cards)
  - Primary Text: #1C1C1E (nearly black)
  - Secondary Text: #8E8E93 (medium gray)
  - Accent: #6B7F47 (sage green - earthy, calming)
  - Accent Dark: #5A6B3B (darker sage for gradients)
  - Terracotta: #B8654B (warm rust - secondary accent)

  SPACING SYSTEM:
  Based on theme.spacing with consistent increments (xs, sm, md, lg, xl, xxl)
  Creates visual rhythm and breathing room between elements

  SHADOW HIERARCHY:
  - soft: Subtle elevation for cards (4px blur, low opacity)
  - premium: Enhanced elevation for hero elements (40px blur)
  - float: Strong elevation for floating elements (50px blur)

  BORDER RADIUS:
  - round: Fully circular (9999px) for icons/buttons
  - xxl: Large radius for cards (maintains soft, approachable feel)
  - lg/md: Medium radius for smaller elements

  TYPOGRAPHY:
  - Bold weights for headings (creates clear hierarchy)
  - Semibold for important labels
  - Regular for body text
  - Size scale from xs to xxxl for consistent proportions
*/

const styles = StyleSheet.create({
  // ═══ CONTAINER & LAYOUT ═══
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // Warm off-white (#FAFAF8)
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,      // Symmetric vertical padding
    paddingBottom: theme.spacing.lg,   // Creates breathing room
  },
  headerTitle: {
    ...theme.typography.styles.h1,     // Larger, bolder - Apple/Airbnb style
    color: theme.colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Increased for better bottom breathing room
  },

  // ═══ ENHANCED REWARDS STATUS CARD ═══
  // The hero section with gradient background showcasing tier status and points
  statusCardContainer: {
    marginHorizontal: theme.spacing.lg,    // Reduced from xl for more screen real estate
    marginBottom: theme.spacing.xxl,       // Increased bottom margin for visual separation
  },
  statusCard: {
    borderRadius: theme.borderRadius.lg,   // Refined for modern feel (16px)
    paddingVertical: theme.spacing.lg,     // More compact (24px, was 40px)
    paddingHorizontal: 20,                 // Tighter horizontal (20px, was 32px)
    ...theme.shadows.premium,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,        // Tighter spacing (16px, was 40px)
  },
  statusLabel: {
    ...theme.typography.styles.label,       // Upgraded from caption (15px vs 13px)
    color: theme.colors.white,              // Full white for better contrast
    opacity: 0.9,                           // Slight transparency
    textTransform: 'uppercase',
    letterSpacing: 1.5,                     // More spacing for readability
    marginBottom: theme.spacing.sm,         // Increased from xs
    fontWeight: '600',                      // Semi-bold for emphasis
  },
  statusTier: {
    ...theme.typography.styles.h2,         // Refined size (24px, was ~32-40px)
    color: theme.colors.white,
  },
  statusIconContainer: {
    width: 44,                              // More compact (44px, was 56px)
    height: 44,
    backgroundColor: theme.colors.whiteTransparent20,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsContainer: {
    backgroundColor: theme.colors.whiteTransparent20, // Increased from 10% to 20% for visibility
    borderRadius: theme.borderRadius.md,   // Refined (12px)
    paddingVertical: theme.spacing.md,     // More compact (20px, was 40px)
    paddingHorizontal: theme.spacing.md,   // Tighter (20px, was 32px)
    marginBottom: theme.spacing.md,        // Reduced (16px, was 32px)
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',                // Align baselines better
    marginBottom: theme.spacing.sm,        // Tighter (12px, was 24px)
  },
  pointsValue: {
    ...theme.typography.styles.h1,         // Hero number (40px scaled)
    color: theme.colors.white,
    lineHeight: theme.typography.sizes.xxxl * 1.1, // Tighter line height
  },
  pointsLabel: {
    ...theme.typography.styles.finePrint,  // Even smaller (11px vs 13px caption)
    color: theme.colors.whiteTransparent70,
    marginTop: theme.spacing.xs,
    fontWeight: '500',                     // Medium weight for better readability
  },
  nextRewardContainer: {
    alignItems: 'flex-end',
  },
  nextRewardLabel: {
    ...theme.typography.styles.finePrint,  // Even smaller (was caption)
    color: theme.colors.whiteTransparent70,
    marginBottom: theme.spacing.xxs,
    fontWeight: '500',
  },
  nextRewardValue: {
    ...theme.typography.styles.h4,         // Larger than h5 but smaller than h1
    color: theme.colors.white,
    lineHeight: theme.typography.sizes.lg * 1.1,
  },
  // Progress bar styling
  progressBarContainer: {
    marginTop: theme.spacing.sm,           // Tighter (12px, was 16px)
  },
  progressBarBackground: {
    height: 6,                             // Refined (6px, was 8px)
    backgroundColor: theme.colors.whiteTransparent20,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.round,
    // Width set inline: '75%' represents 750/1000 points progress
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.md,         // Tighter (16px, was 32px)
    marginTop: theme.spacing.xs,          // Reduced (8px, was 16px)
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,    // More compact (12px, was 16px)
  },
  statItemBorder: {
    borderLeftWidth: 0.5,                 // Hairline (was 1px)
    borderRightWidth: 0.5,
    borderColor: theme.colors.whiteTransparent30, // Slightly more visible
  },
  statValue: {
    ...theme.typography.styles.h5,        // Smaller for tighter spacing (was h4)
    color: theme.colors.white,
    marginBottom: theme.spacing.xxs,      // Tighter (4px, was 8px)
    fontWeight: '700',                    // Ensure bold
  },
  statLabel: {
    ...theme.typography.styles.finePrint, // Reduced from caption
    color: theme.colors.whiteTransparent70,
    fontWeight: '500',
  },

  // ═══ SECTION LAYOUT ═══
  // Reusable section container for content areas
  section: {
    paddingHorizontal: theme.spacing.lg,   // Consistent with header/status
    marginBottom: theme.spacing.lg,        // Tighter between sections (24px, was 40px)
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,        // Tighter (16px, was 24px)
  },
  sectionTitle: {
    ...theme.typography.styles.h3,
    color: theme.colors.primary,
    fontWeight: '700',                     // Ensure bold
  },
  viewAllButton: {
    ...theme.typography.styles.bodyMedium, // Slightly less prominent
    color: theme.colors.accent,
  },

  // ═══ REDEEMABLE REWARDS LIST ═══
  // Card-based layout for reward items with icon, details, and action button
  rewardsList: {
    gap: theme.spacing.xs,                 // Tighter gap (8px, was 12px)
  },
  rewardCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,   // More compact (12px, was 24px)
    paddingVertical: theme.spacing.md,     // Tighter (16px, was 24px)
    paddingHorizontal: theme.spacing.md,   // Maintained (16px)
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 76,                         // Reduced (76px, was 88px)
    ...theme.shadows.soft,
  },
  rewardIconContainer: {
    width: 48,                             // More compact (48px, was 64px)
    height: 48,
    backgroundColor: 'rgba(107, 127, 71, 0.1)', // Slightly more subtle
    borderRadius: theme.borderRadius.md,   // Rounded square (12px)
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,         // Tighter (12px, was 16px)
  },
  rewardIcon: {
    fontSize: theme.typography.sizes.xl,   // Smaller icon (32px, was 40px)
  },
  rewardContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  rewardName: {
    ...theme.typography.styles.h5,         // Upgraded from bodyLargeMedium
    color: theme.colors.primary,
    marginBottom: theme.spacing.xxs,       // Tiny gap before description
  },
  rewardDescription: {
    ...theme.typography.styles.caption,    // Reduced from body
    color: theme.colors.secondary,
    marginTop: 0,                          // Remove conflicting margin
  },
  rewardExpiry: {
    ...theme.typography.styles.caption,
    color: theme.colors.secondary,
    opacity: 0.8,                          // Slightly muted
    marginTop: theme.spacing.xxs,
  },
  rewardAction: {
    marginLeft: 0,                         // Remove extra margin
  },
  redeemButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.md,   // Maintained (16px)
    paddingVertical: theme.spacing.xs,     // Tighter (8px, was 16px)
    borderRadius: theme.borderRadius.sm,   // Smaller radius (8px)
    minWidth: 72,                          // Slightly smaller (72px, was 80px)
    minHeight: 40,                         // Slightly smaller (40px, was 44px)
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemButtonDisabled: {
    backgroundColor: theme.colors.gray100,
  },
  redeemButtonText: {
    ...theme.typography.styles.buttonSmall, // Reduced from button
    color: theme.colors.white,
  },

  // ═══ WAYS TO EARN SECTION ═══
  // Single card containing multiple earning opportunities
  waysToEarnCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,   // More compact (12px, was 24px)
    overflow: 'hidden',
    ...theme.shadows.soft,
  },
  earnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,     // Tighter (16px, was 24px)
    paddingHorizontal: theme.spacing.md,   // Maintained (16px)
    minHeight: 64,                         // Reduced (64px, was 76px)
  },
  earnItemBorder: {
    borderBottomWidth: 0.5,                // Hairline separator (thinner)
    borderBottomColor: theme.colors.gray200, // Lighter color
  },
  earnIconContainer: {
    width: 40,                             // More compact (40px, was 48px)
    height: 40,
    backgroundColor: 'rgba(184, 101, 75, 0.1)', // More subtle
    borderRadius: theme.borderRadius.sm,   // Smaller radius (8px)
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,         // Tighter (12px, was 16px)
  },
  earnContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  earnTitle: {
    ...theme.typography.styles.bodyLargeMedium, // Upgraded
    color: theme.colors.primary,
    marginBottom: theme.spacing.xxs,       // Tiny gap before description
  },
  earnDescription: {
    ...theme.typography.styles.caption,
    color: theme.colors.secondary,
    marginTop: 0,                          // Remove conflicting margin
  },
  earnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,                 // Reduced gap
  },
  earnPoints: {
    ...theme.typography.styles.h6,         // Upgraded from bodyBold
    color: theme.colors.terracotta,
  },

  // ═══ BADGES & ACHIEVEMENTS ═══
  // 2-column grid layout for achievement badges
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,                 // Maintained at 12px for grid
  },
  badgeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,   // More compact (12px, was 24px)
    paddingVertical: theme.spacing.md,     // Tighter (20px, was 32px)
    paddingHorizontal: theme.spacing.sm,   // Tighter (12px, was 16px)
    // Percentage-based width accounts for gap
    width: '48%',
    minHeight: 140,                        // Reduced (140px, was 160px)
    alignItems: 'center',
    justifyContent: 'center',              // Center content vertically too
    ...theme.shadows.soft,
  },
  badgeCardInactive: {
    opacity: 0.6,                          // More pronounced dimming (was 0.75)
  },
  badgeIcon: {
    fontSize: theme.typography.sizes.xxl,  // Smaller (40px, was 48px)
    marginBottom: theme.spacing.sm,        // Tighter (12px, was 16px)
  },
  badgeIconInactive: {
    opacity: 0.4,                          // More pronounced (was 0.5)
  },
  badgeName: {
    ...theme.typography.styles.bodyLargeMedium, // Upgraded
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxs,       // Consistent tiny gap
  },
  badgeDescription: {
    ...theme.typography.styles.caption,
    color: theme.colors.secondary,
    textAlign: 'center',
    lineHeight: theme.typography.sizes.sm, // Better line height for readability
  },
  // Badge progress tracking (for unearned badges)
  badgeProgressContainer: {
    width: '100%',
    marginTop: theme.spacing.sm,           // Tighter (12px, was 16px)
  },
  badgeProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xxs,       // Reduced from 4
  },
  badgeProgressText: {
    ...theme.typography.styles.finePrint,  // Smaller (was caption)
    color: theme.colors.secondary,
    opacity: 0.8,
  },
  badgeProgressBarBackground: {
    height: 4,                             // Thinner (4px, was 8px)
    backgroundColor: theme.colors.gray200,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  badgeProgressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.round,
    // Width dynamically calculated: (progress/total) * 100 + '%'
  },

});

export default RewardsScreen;
