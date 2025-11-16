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
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import theme from '../theme';

const { width } = Dimensions.get('window');

const RewardsScreen = () => {
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
    <View style={styles.container}>
      {/*
        HEADER SECTION
        Displays the screen title with clear visual hierarchy.
        Uses bold, large typography to establish context immediately.
      */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards & Status</Text>
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
                <Feather name="award" size={24} color={theme.colors.white} />
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
                      <Feather name="lock" size={16} color={theme.colors.gray400} />
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
                  <Feather name={way.icon} size={20} color={theme.colors.terracotta} />
                </View>
                <View style={styles.earnContent}>
                  <Text style={styles.earnTitle}>{way.title}</Text>
                  <Text style={styles.earnDescription}>{way.description}</Text>
                </View>
                {/* Points badge and chevron indicate tappable item with more details */}
                <View style={styles.earnAction}>
                  <Text style={styles.earnPoints}>{way.points}</Text>
                  <Feather name="chevron-right" size={16} color={theme.colors.gray400} />
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

      {/*
        FLOATING CART SUMMARY BAR
        Persistent bottom element that appears when items are in cart.

        CONDITIONAL RENDERING:
        - Only displays when cartCount > 0
        - Prevents visual clutter when cart is empty
        - Maintains awareness of pending orders while browsing rewards

        POSITIONING:
        - Absolutely positioned above bottom navigation (bottom: 80px)
        - Fixed to bottom with left/right margins for floating effect
        - Float shadow creates depth and draws attention

        DESIGN ELEMENTS:
        - Dark primary background (#1C1C1E) for high contrast
        - White text for readability
        - Prominent shadow (shadow-float) emphasizes importance
        - Rounded corners (xxl) maintain warm aesthetic
        - Arrow in CTA text suggests forward action

        USER FLOW:
        Allows quick cart access without leaving rewards screen,
        reducing friction in the purchase journey.
      */}
      {cartCount > 0 && (
        <View style={styles.floatingCartContainer}>
          <TouchableOpacity style={styles.floatingCartButton}>
            <View style={styles.floatingCartContent}>
              {/* Shopping bag icon with semi-transparent background */}
              <View style={styles.floatingCartIconContainer}>
                <Feather name="shopping-bag" size={16} color={theme.colors.white} />
              </View>
              <View>
                {/* Cart summary: item count and total price */}
                <Text style={styles.floatingCartItems}>{cartCount} items</Text>
                <Text style={styles.floatingCartPrice}>$24.50</Text>
              </View>
            </View>
            {/* Call-to-action with arrow for visual direction */}
            <Text style={styles.floatingCartCTA}>View Cart →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.xxxl, // Large, bold title
    fontWeight: theme.typography.bold,
    color: theme.colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Prevents content from being hidden behind floating cart + nav
  },

  // ═══ ENHANCED REWARDS STATUS CARD ═══
  // The hero section with gradient background showcasing tier status and points
  statusCardContainer: {
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  statusCard: {
    borderRadius: theme.borderRadius.xxl, // Large rounded corners for soft, friendly feel
    padding: theme.spacing.xl,
    ...theme.shadows.premium, // Strong shadow elevates importance
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
  // Progress bar styling
  progressBarContainer: {
    marginTop: theme.spacing.sm,
  },
  progressBarBackground: {
    height: 10, // Thick enough to be easily visible
    backgroundColor: theme.colors.whiteTransparent20, // Semi-transparent white
    borderRadius: theme.borderRadius.round, // Fully rounded ends
    overflow: 'hidden', // Ensures fill respects rounded corners
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.white, // Bright white stands out on gradient
    borderRadius: theme.borderRadius.round,
    // Width set inline: '75%' represents 750/1000 points progress
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

  // ═══ SECTION LAYOUT ═══
  // Reusable section container for content areas
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
    color: theme.colors.accent, // Sage green draws attention
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.medium,
  },

  // ═══ REDEEMABLE REWARDS LIST ═══
  // Card-based layout for reward items with icon, details, and action button
  rewardsList: {
    gap: theme.spacing.md, // Vertical spacing between reward cards
  },
  rewardCard: {
    backgroundColor: theme.colors.surface, // Pure white stands out on off-white bg
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    flexDirection: 'row', // Horizontal layout: icon | content | button
    alignItems: 'center',
    ...theme.shadows.soft, // Subtle elevation
  },
  rewardIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(107, 127, 71, 0.15)', // 15% opacity sage green
    borderRadius: theme.borderRadius.round, // Circular container
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

  // ═══ WAYS TO EARN SECTION ═══
  // Single card containing multiple earning opportunities
  waysToEarnCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden', // Ensures content respects rounded corners
    ...theme.shadows.soft,
  },
  earnItem: {
    flexDirection: 'row', // Horizontal: icon | content | points+chevron
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  earnItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100, // Subtle separator between items
  },
  earnIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(184, 101, 75, 0.15)', // 15% terracotta (differentiates from rewards)
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

  // ═══ BADGES & ACHIEVEMENTS ═══
  // 2-column grid layout for achievement badges
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to next row
    gap: theme.spacing.md, // Space between badge cards
  },
  badgeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    // Dynamic width calculation for 2-column grid:
    // (screen width - horizontal padding on both sides - gap) / 2
    width: (width - theme.spacing.xl * 2 - theme.spacing.md) / 2,
    alignItems: 'center', // Centers content horizontally
    ...theme.shadows.soft,
  },
  badgeCardInactive: {
    opacity: 0.75, // Dims unearned badges to show locked state
  },
  badgeIcon: {
    fontSize: 40, // Large emoji for visual impact
    marginBottom: theme.spacing.sm,
  },
  badgeIconInactive: {
    opacity: 0.5, // Further reduces opacity for unearned badge icons
    // Note: React Native doesn't support CSS filters like grayscale
    // Opacity reduction provides similar visual distinction
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
  // Badge progress tracking (for unearned badges)
  badgeProgressContainer: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
  badgeProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Spreads fraction and percentage to edges
    marginBottom: 4,
  },
  badgeProgressText: {
    fontSize: theme.typography.xs,
    color: theme.colors.secondary,
  },
  badgeProgressBarBackground: {
    height: 6, // Thin but visible progress bar
    backgroundColor: theme.colors.gray200, // Light gray background
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  badgeProgressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.accent, // Sage green matches brand
    borderRadius: theme.borderRadius.round,
    // Width dynamically calculated: (progress/total) * 100 + '%'
  },

  // ═══ FLOATING CART SUMMARY ═══
  // Persistent bottom bar showing cart status
  floatingCartContainer: {
    position: 'absolute',
    bottom: 80, // Positioned above bottom navigation bar
    left: theme.spacing.lg,
    right: theme.spacing.lg, // Creates margin on both sides for floating effect
  },
  floatingCartButton: {
    backgroundColor: theme.colors.primary, // Dark background (#1C1C1E)
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    flexDirection: 'row', // Horizontal: cart info | CTA
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.float, // Strong shadow creates prominent floating effect
  },
  floatingCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  floatingCartIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.whiteTransparent10, // Subtle icon background
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingCartItems: {
    color: theme.colors.white, // High contrast on dark background
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
  },
  floatingCartPrice: {
    color: theme.colors.whiteTransparent70, // Slightly muted for secondary info
    fontSize: theme.typography.xs,
  },
  floatingCartCTA: {
    color: theme.colors.white,
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.semibold,
    // Arrow (→) provides visual direction cue
  },
});

export default RewardsScreen;
