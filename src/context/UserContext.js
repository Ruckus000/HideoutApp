/**
 * UserContext.js
 *
 * Global user state management for the HideOut Kava App.
 * Manages user profile, rewards/loyalty program, order history, and preferences.
 *
 * Key Responsibilities:
 * - User profile data (name, email, avatar, etc.)
 * - Rewards & loyalty system (points, tiers, badges)
 * - Order history tracking
 * - User preferences (notifications, dark mode, default fulfillment)
 * - AsyncStorage persistence for seamless sessions
 *
 * Design Philosophy - Warm Minimalism:
 * - Clean state structure prevents complexity
 * - Comprehensive helper functions (tier calculation, progress tracking)
 * - Automatic tier upgrades reward user engagement
 * - Persistent state creates welcoming, personalized experience
 *
 * Rewards System:
 * - Bronze Tier: 0-999 points
 * - Silver Tier: 1000-2499 points
 * - Gold Tier: 2500-4999 points
 * - Platinum Tier: 5000+ points
 *
 * Used By:
 * - RewardsScreen: Display points, tier, badges, redeemable rewards
 * - ProfileScreen: Display user info and preferences
 * - HomeScreen: Rewards widget summary
 * - Order flow: Track order history, earn points
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * User Context
 *
 * React Context for sharing user state across the component tree without
 * passing props through every level (prevents prop drilling).
 */
const UserContext = createContext();

/**
 * Default User State
 *
 * Initial state structure for user data. Used for:
 * - Initializing new users
 * - Resetting state on logout
 * - TypeScript-like documentation of state shape
 *
 * State Structure:
 *
 * profile: User account information
 * - id: Unique user identifier (null when logged out)
 * - name: Display name
 * - email: Account email
 * - phone: Contact phone number
 * - avatar: Profile image URL
 * - memberSince: Account creation date (ISO string)
 *
 * rewards: Loyalty program data
 * - points: Current reward points balance
 * - pointsGoal: Target points for next reward (defaults to 1000)
 * - tier: Loyalty tier (Bronze, Silver, Gold, Platinum)
 * - badges: Array of earned achievement badges
 * - availableRewards: Array of rewards user can redeem
 *
 * orderHistory: Array of past orders
 * - Each order includes: id, date, items, total, status, etc.
 *
 * preferences: User settings and preferences
 * - notifications: Granular notification preferences
 *   - orderUpdates: Order status notifications
 *   - promotions: Marketing/promotional messages
 *   - rewards: Loyalty program updates
 *   - events: Community event announcements
 * - darkMode: UI theme preference (light/dark)
 * - defaultFulfillment: Preferred order method (pickup/delivery)
 * - favoriteLocation: Preferred store location
 */
const defaultUserState = {
  profile: {
    id: null,           // null = not logged in
    name: '',
    email: '',
    phone: '',
    avatar: '',
    memberSince: null,  // ISO date string
  },
  rewards: {
    points: 0,
    pointsGoal: 1000,   // Next reward milestone
    tier: 'Bronze',     // Bronze, Silver, Gold, Platinum
    badges: [],         // Achievement badges
    availableRewards: [], // Redeemable rewards
  },
  orderHistory: [],     // Past orders
  preferences: {
    notifications: {
      orderUpdates: true,
      promotions: true,
      rewards: true,
      events: true,
    },
    darkMode: false,
    defaultFulfillment: 'pickup', // 'pickup' or 'delivery'
    favoriteLocation: null,
  },
};

/**
 * User Provider Component
 *
 * Wraps the app to provide user state and operations to all child components.
 *
 * State Management:
 * - Single user object containing profile, rewards, history, preferences
 * - Updates are immutable (spread operators) for React optimization
 *
 * Persistence:
 * - Loads user from AsyncStorage on mount
 * - Saves user to AsyncStorage whenever state changes
 * - Only saves if user is logged in (profile.id exists)
 * - Key: 'hideoutUser' - stored as JSON string
 */
/**
 * Provides user state and actions to its children components.
 * It manages user profile information, rewards, order history, and preferences,
 * and persists the user data to AsyncStorage.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that need access to the user context.
 * @returns {JSX.Element} The UserProvider component.
 */
export const UserProvider = ({ children }) => {
  /**
   * User State
   *
   * Complete user data object following defaultUserState structure.
   * Initialized with default values, then loaded from AsyncStorage if available.
   */
  const [user, setUser] = useState(defaultUserState);

  /**
   * Load User from AsyncStorage
   *
   * Runs once on mount to restore user session.
   *
   * Why AsyncStorage?
   * - Persists user data between app sessions
   * - Maintains logged-in state
   * - Preserves rewards progress, preferences, order history
   *
   * Design Philosophy:
   * - Automatic session restoration creates seamless UX
   * - Users don't need to re-login every time
   * - Supports "warm" experience (app remembers you)
   */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('hideoutUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user from AsyncStorage:', error);
      }
    };
    loadUser();
  }, []); // Empty array = run once on mount

  /**
   * Save User to AsyncStorage
   *
   * Runs whenever user state changes to persist data.
   *
   * Conditional Save:
   * - Only saves if user.profile.id exists (user is logged in)
   * - Prevents saving empty/default state for logged-out users
   * - Optimizes storage writes
   *
   * Why on every change?
   * - Ensures data is never lost
   * - Instant persistence of points, badges, preferences
   * - AsyncStorage is fast enough for real-time updates
   */
  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem('hideoutUser', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user to AsyncStorage:', error);
      }
    };
    // Only save if user is logged in
    if (user.profile.id) {
      saveUser();
    }
  }, [user]); // Dependency: runs whenever user changes

  /**
   * Update User Profile
   *
   * Merges new profile data into existing profile.
   *
   * Immutable Update Pattern:
   * - Spreads prevUser to preserve other top-level fields (rewards, orderHistory, etc.)
   * - Spreads prevUser.profile to preserve existing profile fields
   * - Spreads profileData to apply updates
   * - Later spreads override earlier ones
   *
   * Example:
   * updateProfile({ name: 'John Doe', phone: '555-1234' })
   * // Updates name and phone, preserves email, avatar, etc.
   *
   * @param {Object} profileData - Partial profile object with fields to update
   */
  const updateProfile = (profileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      profile: {
        ...prevUser.profile,
        ...profileData,
      },
    }));
  };

  /**
   * Update Rewards Data
   *
   * Merges new rewards data into existing rewards.
   *
   * Use Cases:
   * - Update pointsGoal
   * - Set availableRewards from API
   * - Manually adjust tier (though addPoints handles this automatically)
   *
   * Note: For adding points, use addPoints() instead - it includes tier upgrade logic.
   *
   * @param {Object} rewardsData - Partial rewards object with fields to update
   */
  const updateRewards = (rewardsData) => {
    setUser((prevUser) => ({
      ...prevUser,
      rewards: {
        ...prevUser.rewards,
        ...rewardsData,
      },
    }));
  };

  /**
   * Add Points to User Account
   *
   * Increments user's reward points and automatically handles tier upgrades.
   *
   * Automatic Tier Upgrade:
   * - Calculates new tier based on updated points
   * - If tier changed, updates it automatically
   * - User seamlessly progresses: Bronze → Silver → Gold → Platinum
   *
   * Tier Thresholds:
   * - Bronze: 0-999 points
   * - Silver: 1000-2499 points
   * - Gold: 2500-4999 points
   * - Platinum: 5000+ points
   *
   * Design Philosophy:
   * - Automatic tier progression rewards engagement
   * - No manual tier management needed
   * - Immediate feedback on achievement
   *
   * Use Cases:
   * - Award points after order completion
   * - Bonus points for events/promotions
   * - Referral rewards
   * - Check-in bonuses
   *
   * Example:
   * User has 950 points (Bronze)
   * addPoints(100)
   * → User now has 1050 points (Silver) - tier upgraded automatically!
   *
   * @param {number} points - Points to add (can be negative to subtract)
   */
  const addPoints = (points) => {
    setUser((prevUser) => {
      const newPoints = prevUser.rewards.points + points;
      const newRewards = { ...prevUser.rewards, points: newPoints };

      // Check if user should tier up (or down if points were subtracted)
      const newTier = calculateTier(newPoints);
      if (newTier !== prevUser.rewards.tier) {
        newRewards.tier = newTier;
        // Tier changed - could trigger celebration animation or notification
      }

      return {
        ...prevUser,
        rewards: newRewards,
      };
    });
  };

  /**
   * Redeem Points for Reward
   *
   * Subtracts points cost from user's balance when redeeming a reward.
   *
   * Validation:
   * - Checks if user has enough points before redeeming
   * - Returns unchanged state if insufficient points
   * - Logs error for debugging
   *
   * Point Deduction:
   * - Subtracts reward.pointsCost from current points
   * - Does NOT automatically adjust tier down
   *   (Points spent don't demote you - maintains positive UX)
   *
   * Design Philosophy:
   * - Validation prevents invalid states
   * - Error logging helps debugging
   * - Tier preservation rewards loyalty (once achieved, always achieved)
   *
   * Note: This only deducts points. The actual reward fulfillment
   * (applying discount, generating coupon code, etc.) should be
   * handled separately by the caller.
   *
   * @param {Object} reward - Reward object with structure: { id, name, pointsCost, ... }
   * @returns Updated state on success, unchanged state on failure
   */
  const redeemReward = (reward) => {
    setUser((prevUser) => {
      // Validate sufficient points
      if (prevUser.rewards.points < reward.pointsCost) {
        console.error('Not enough points to redeem this reward');
        return prevUser; // No change - insufficient points
      }

      // Deduct points
      return {
        ...prevUser,
        rewards: {
          ...prevUser.rewards,
          points: prevUser.rewards.points - reward.pointsCost,
          // Note: Tier is NOT recalculated - rewards don't demote you
        },
      };
    });
  };

  /**
   * Add Badge to User Account
   *
   * Awards an achievement badge to the user for accomplishments.
   *
   * Duplicate Prevention:
   * - Checks if badge already exists (by id)
   * - Returns unchanged state if badge already earned
   * - Prevents duplicate badges from appearing
   *
   * Badge Metadata:
   * - Adds earnedAt timestamp (ISO string) to track when badge was earned
   * - Preserves all original badge properties (id, name, icon, description, etc.)
   *
   * Badge Examples:
   * - "First Order" - Complete first purchase
   * - "Kava Explorer" - Try 10 different kava drinks
   * - "Regular" - Visit 5 times in a month
   * - "Community Champion" - Attend 3 events
   *
   * Design Philosophy:
   * - Gamification encourages engagement
   * - Timestamp provides achievement history
   * - Duplicate prevention maintains clean badge collection
   *
   * Display:
   * Badges can be shown in profile or rewards screen with:
   * - Badge icon/image
   * - Badge name
   * - Description of achievement
   * - Date earned
   *
   * @param {Object} badge - Badge object with structure: { id, name, icon, description, ... }
   */
  const addBadge = (badge) => {
    setUser((prevUser) => {
      // Check if badge already exists
      const badgeExists = prevUser.rewards.badges.some(
        (b) => b.id === badge.id
      );

      if (badgeExists) {
        return prevUser; // Already earned - no change
      }

      // Add badge with earned timestamp
      return {
        ...prevUser,
        rewards: {
          ...prevUser.rewards,
          badges: [
            ...prevUser.rewards.badges,
            {
              ...badge,
              earnedAt: new Date().toISOString(), // Record when badge was earned
            },
          ],
        },
      };
    });
  };

  /**
   * Add Order to History
   *
   * Records a completed order in the user's order history.
   *
   * Order Metadata:
   * - Adds unique id if not provided (timestamp-based)
   * - Adds current date if not provided (ISO string)
   * - Prepends to array (newest orders first)
   *
   * Order Structure:
   * {
   *   id: string,
   *   date: ISO string,
   *   items: array of ordered items,
   *   subtotal: number,
   *   deliveryCharge: number,
   *   total: number,
   *   fulfillmentType: 'pickup' or 'delivery',
   *   status: 'pending' | 'preparing' | 'ready' | 'completed',
   *   location: store location,
   *   ...other order details
   * }
   *
   * Array Ordering:
   * - New orders added to front (index 0)
   * - Maintains reverse chronological order
   * - Latest order displayed first in UI
   *
   * Use Cases:
   * - After successful payment/checkout
   * - Track order history in profile
   * - Calculate stats (total orders, favorite items, etc.)
   * - Support reordering from history
   *
   * @param {Object} order - Order object with items, total, etc.
   */
  const addOrderToHistory = (order) => {
    setUser((prevUser) => ({
      ...prevUser,
      orderHistory: [
        {
          ...order,
          id: order.id || `order-${Date.now()}`,      // Ensure unique ID
          date: order.date || new Date().toISOString(), // Ensure timestamp
        },
        ...prevUser.orderHistory, // Prepend new order
      ],
    }));
  };

  /**
   * Update Preferences
   *
   * Merges new preferences into existing preferences.
   *
   * Supported Preferences:
   * - notifications: Notification settings object
   * - darkMode: Boolean theme preference
   * - defaultFulfillment: 'pickup' or 'delivery'
   * - favoriteLocation: Preferred store location
   *
   * Example:
   * updatePreferences({ darkMode: true, defaultFulfillment: 'delivery' })
   *
   * @param {Object} preferences - Partial preferences object
   */
  const updatePreferences = (preferences) => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        ...preferences,
      },
    }));
  };

  /**
   * Update Notification Preferences
   *
   * Merges new notification settings into existing notification preferences.
   *
   * Granular Control:
   * - orderUpdates: Order status notifications
   * - promotions: Marketing messages
   * - rewards: Loyalty program updates
   * - events: Community event announcements
   *
   * Why separate function?
   * - Provides focused API for notification settings
   * - Prevents accidentally overwriting entire preferences object
   * - More intuitive than updatePreferences({ notifications: { ... } })
   *
   * Example:
   * updateNotificationPreferences({ promotions: false, events: true })
   *
   * @param {Object} notificationPrefs - Partial notifications object
   */
  const updateNotificationPreferences = (notificationPrefs) => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        notifications: {
          ...prevUser.preferences.notifications,
          ...notificationPrefs,
        },
      },
    }));
  };

  /**
   * Toggle Dark Mode
   *
   * Switches between light and dark theme.
   *
   * Why dedicated function?
   * - Common operation deserves convenient API
   * - Simpler than updatePreferences({ darkMode: !user.preferences.darkMode })
   * - Prevents errors from stale closure values
   *
   * Design Philosophy:
   * - User preference respected and persisted
   * - Instant toggle without complex state management
   * - Supports warm minimalist aesthetic in both themes
   */
  const toggleDarkMode = () => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        darkMode: !prevUser.preferences.darkMode,
      },
    }));
  };

  /**
   * Calculate Tier Based on Points
   *
   * Determines loyalty tier from point total.
   *
   * Tier Thresholds:
   * - Platinum: 5000+ points
   * - Gold: 2500-4999 points
   * - Silver: 1000-2499 points
   * - Bronze: 0-999 points
   *
   * Why separate function?
   * - Used by addPoints() for automatic tier upgrades
   * - Can be used for preview/calculation purposes
   * - Single source of truth for tier logic
   *
   * Design Philosophy:
   * - Clear, progressive tiers reward loyalty
   * - Thresholds are achievable but meaningful
   * - Higher tiers unlock better rewards/perks
   *
   * @param {number} points - Total reward points
   * @returns {string} Tier name ('Bronze', 'Silver', 'Gold', or 'Platinum')
   */
  const calculateTier = (points) => {
    if (points >= 5000) return 'Platinum';
    if (points >= 2500) return 'Gold';
    if (points >= 1000) return 'Silver';
    return 'Bronze';
  };

  /**
   * Get Tier Progress
   *
   * Calculates user's progress toward the next loyalty tier.
   *
   * Returns comprehensive progress information:
   * - currentTier: User's current tier
   * - nextTier: Next tier to achieve
   * - pointsNeeded: Total points required for next tier
   * - pointsToNextTier: Remaining points needed
   * - progress: Percentage (0-100) toward next tier
   *
   * Tier Progression:
   * - Bronze → Silver: Need 1000 points
   * - Silver → Gold: Need 2500 points
   * - Gold → Platinum: Need 5000 points
   * - Platinum: Max tier (progress stays at 100%)
   *
   * Use Cases:
   * - Display progress bar on Rewards screen
   * - Show "X points to Silver!" messaging
   * - Motivate user to reach next tier
   *
   * Example Output:
   * {
   *   currentTier: 'Bronze',
   *   nextTier: 'Silver',
   *   pointsNeeded: 1000,
   *   pointsToNextTier: 250,    // Need 250 more points
   *   progress: 75               // 75% of the way there
   * }
   *
   * @returns {Object} Tier progress information
   */
  const getTierProgress = () => {
    const currentPoints = user.rewards.points;
    const currentTier = user.rewards.tier;

    // Define tier thresholds and next tier for each level
    const tierThresholds = {
      Bronze: { next: 'Silver', pointsNeeded: 1000 },
      Silver: { next: 'Gold', pointsNeeded: 2500 },
      Gold: { next: 'Platinum', pointsNeeded: 5000 },
      Platinum: { next: 'Platinum', pointsNeeded: 5000 }, // Max tier
    };

    const tierInfo = tierThresholds[currentTier];
    const progress = (currentPoints / tierInfo.pointsNeeded) * 100;

    return {
      currentTier,
      nextTier: tierInfo.next,
      pointsNeeded: tierInfo.pointsNeeded,
      pointsToNextTier: Math.max(0, tierInfo.pointsNeeded - currentPoints),
      progress: Math.min(100, progress), // Cap at 100%
    };
  };

  /**
   * Get Reward Progress
   *
   * Calculates progress toward the user's current reward goal.
   *
   * Different from tier progress:
   * - Tier progress: Fixed milestones (1000, 2500, 5000)
   * - Reward progress: Flexible goal (can be set to any value)
   *
   * pointsGoal Use Cases:
   * - Next redeemable reward (e.g., "Get 200 more points for free drink!")
   * - Personal milestone (e.g., "Reach 1000 points this month")
   * - Dynamic goals from backend/promotions
   *
   * Returns:
   * - currentPoints: User's current point balance
   * - goal: Target points for reward
   * - pointsRemaining: How many more points needed
   * - progress: Percentage (0-100) toward goal
   *
   * Example Output:
   * {
   *   currentPoints: 850,
   *   goal: 1000,
   *   pointsRemaining: 150,
   *   progress: 85
   * }
   *
   * Design Philosophy:
   * - Flexible goals create ongoing engagement
   * - Progress visualization motivates action
   * - Clear "points remaining" sets expectations
   *
   * @returns {Object} Reward goal progress information
   */
  const getRewardProgress = () => {
    const currentPoints = user.rewards.points;
    const goal = user.rewards.pointsGoal;
    const progress = (currentPoints / goal) * 100;

    return {
      currentPoints,
      goal,
      pointsRemaining: Math.max(0, goal - currentPoints),
      progress: Math.min(100, progress), // Cap at 100%
    };
  };

  /**
   * Check if User is Logged In
   *
   * Determines if user has an active session.
   *
   * Login Criteria:
   * - profile.id exists (not null)
   * - profile.email exists (not empty string)
   *
   * Why both checks?
   * - id could be null/undefined when logged out
   * - email is essential account identifier
   * - Both being present confirms valid logged-in state
   *
   * Use Cases:
   * - Show login prompt vs user content
   * - Gate features requiring authentication
   * - Conditional navigation (login screen vs main app)
   *
   * @returns {boolean} true if logged in, false otherwise
   */
  const isLoggedIn = () => {
    return user.profile.id !== null && user.profile.email !== '';
  };

  /**
   * Login User
   *
   * Sets user profile data to establish authenticated session.
   *
   * Login Process:
   * 1. Receives profile data from authentication (email, name, id, etc.)
   * 2. Adds memberSince timestamp if not provided
   * 3. Updates profile state
   * 4. Triggers AsyncStorage save (via useEffect)
   *
   * memberSince:
   * - Records when user first joined
   * - Used for "Member since..." displays
   * - Preserved on subsequent logins
   * - Only set on first login (if not already present)
   *
   * Note: This is a simple login. In production, would integrate with:
   * - OAuth providers (Google, Apple, etc.)
   * - Backend authentication API
   * - JWT token management
   * - Secure credential storage
   *
   * @param {Object} profileData - User profile from authentication
   */
  const login = (profileData) => {
    updateProfile({
      ...profileData,
      memberSince: profileData.memberSince || new Date().toISOString(),
    });
  };

  /**
   * Logout User
   *
   * Clears user session and removes persisted data.
   *
   * Logout Process:
   * 1. Resets user state to defaultUserState
   * 2. Removes user data from AsyncStorage
   * 3. Clears all profile, rewards, history, preferences
   *
   * Side Effects:
   * - User returned to logged-out state
   * - All rewards progress cleared
   * - Order history cleared
   * - Preferences reset to defaults
   * - Cart remains intact (managed separately in CartContext)
   *
   * Error Handling:
   * - Catches AsyncStorage errors
   * - Logs errors but doesn't prevent logout
   * - User state still reset even if storage clear fails
   *
   * Design Philosophy:
   * - Clean logout respects user privacy
   * - Async storage cleared prevents data leakage
   * - Graceful error handling maintains app stability
   */
  const logout = async () => {
    setUser(defaultUserState);
    try {
      await AsyncStorage.removeItem('hideoutUser');
    } catch (error) {
      console.error('Error removing user from AsyncStorage:', error);
    }
  };

  /**
   * Context Value
   *
   * Object containing all user state and operations exposed to consumers.
   *
   * State (direct access):
   * - user: Complete user object
   * - profile: Shortcut to user.profile
   * - rewards: Shortcut to user.rewards
   * - orderHistory: Shortcut to user.orderHistory
   * - preferences: Shortcut to user.preferences
   * - isLoggedIn: Computed boolean for auth status
   *
   * Profile Operations:
   * - updateProfile: Update user profile fields
   * - login: Set profile on authentication
   * - logout: Clear session and data
   *
   * Rewards Operations:
   * - updateRewards: Update rewards data
   * - addPoints: Add points with auto tier upgrade
   * - redeemReward: Spend points on reward
   * - addBadge: Award achievement badge
   * - getTierProgress: Calculate tier progression
   * - getRewardProgress: Calculate goal progression
   *
   * Order Operations:
   * - addOrderToHistory: Record completed order
   *
   * Preference Operations:
   * - updatePreferences: Update user preferences
   * - updateNotificationPreferences: Update notification settings
   * - toggleDarkMode: Switch theme
   *
   * Why shortcuts (profile, rewards, etc.)?
   * - Cleaner syntax: user.profile.name vs user.user.profile.name
   * - More intuitive destructuring: const { profile, rewards } = useUser()
   * - Maintains backwards compatibility if structure changes
   */
  const value = {
    // State
    user,
    profile: user.profile,
    rewards: user.rewards,
    orderHistory: user.orderHistory,
    preferences: user.preferences,
    isLoggedIn: isLoggedIn(),

    // Profile operations
    updateProfile,
    login,
    logout,

    // Rewards operations
    updateRewards,
    addPoints,
    redeemReward,
    addBadge,
    getTierProgress,
    getRewardProgress,

    // Order operations
    addOrderToHistory,

    // Preference operations
    updatePreferences,
    updateNotificationPreferences,
    toggleDarkMode,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * useUser Hook
 *
 * Custom React hook for accessing user context in components.
 *
 * Usage:
 * ```jsx
 * const { profile, rewards, addPoints, isLoggedIn } = useUser();
 * ```
 *
 * Error Handling:
 * - Throws descriptive error if used outside UserProvider
 * - Prevents silent bugs from undefined context
 * - Guides developers to proper usage
 *
 * Why a custom hook?
 * - Cleaner syntax than useContext(UserContext)
 * - Built-in error checking
 * - Single import: useUser instead of UserContext + useContext
 *
 * Design Philosophy:
 * - Developer-friendly API maintains code clarity
 * - Fail-fast error prevents runtime bugs
 * - Follows React best practices for context consumption
 */
/**
 * Custom hook to access the user context.
 * This provides an easy way to access user data and actions in components.
 *
 * @returns {object} The user context value, including user profile, rewards, and actions.
 * @throws {Error} If used outside of a UserProvider.
 */
export const useUser = () => {
  const context = useContext(UserContext);

  // Validate context exists (component is within UserProvider)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export default UserContext;
