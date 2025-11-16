import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create User Context
const UserContext = createContext();

// Default user state
const defaultUserState = {
  profile: {
    id: null,
    name: '',
    email: '',
    phone: '',
    avatar: '',
    memberSince: null,
  },
  rewards: {
    points: 0,
    pointsGoal: 1000,
    tier: 'Bronze', // Bronze, Silver, Gold, Platinum
    badges: [],
    availableRewards: [],
  },
  orderHistory: [],
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

// User Provider Component
export const UserProvider = ({ children }) => {
  // Initialize user state
  const [user, setUser] = useState(defaultUserState);

  // Load user from AsyncStorage on mount
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
  }, []);

  // Save user to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem('hideoutUser', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user to AsyncStorage:', error);
      }
    };
    if (user.profile.id) {
      saveUser();
    }
  }, [user]);

  // Update user profile
  const updateProfile = (profileData) => {
    setUser((prevUser) => ({
      ...prevUser,
      profile: {
        ...prevUser.profile,
        ...profileData,
      },
    }));
  };

  // Update rewards data
  const updateRewards = (rewardsData) => {
    setUser((prevUser) => ({
      ...prevUser,
      rewards: {
        ...prevUser.rewards,
        ...rewardsData,
      },
    }));
  };

  // Add points to user account
  const addPoints = (points) => {
    setUser((prevUser) => {
      const newPoints = prevUser.rewards.points + points;
      const newRewards = { ...prevUser.rewards, points: newPoints };

      // Check if user should tier up
      const newTier = calculateTier(newPoints);
      if (newTier !== prevUser.rewards.tier) {
        newRewards.tier = newTier;
      }

      return {
        ...prevUser,
        rewards: newRewards,
      };
    });
  };

  // Redeem points for a reward
  const redeemReward = (reward) => {
    setUser((prevUser) => {
      if (prevUser.rewards.points < reward.pointsCost) {
        console.error('Not enough points to redeem this reward');
        return prevUser;
      }

      return {
        ...prevUser,
        rewards: {
          ...prevUser.rewards,
          points: prevUser.rewards.points - reward.pointsCost,
        },
      };
    });
  };

  // Add a badge to user account
  const addBadge = (badge) => {
    setUser((prevUser) => {
      // Check if badge already exists
      const badgeExists = prevUser.rewards.badges.some(
        (b) => b.id === badge.id
      );

      if (badgeExists) {
        return prevUser;
      }

      return {
        ...prevUser,
        rewards: {
          ...prevUser.rewards,
          badges: [...prevUser.rewards.badges, { ...badge, earnedAt: new Date().toISOString() }],
        },
      };
    });
  };

  // Add order to history
  const addOrderToHistory = (order) => {
    setUser((prevUser) => ({
      ...prevUser,
      orderHistory: [
        {
          ...order,
          id: order.id || `order-${Date.now()}`,
          date: order.date || new Date().toISOString(),
        },
        ...prevUser.orderHistory,
      ],
    }));
  };

  // Update preferences
  const updatePreferences = (preferences) => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        ...preferences,
      },
    }));
  };

  // Update notification preferences
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        darkMode: !prevUser.preferences.darkMode,
      },
    }));
  };

  // Calculate tier based on points
  const calculateTier = (points) => {
    if (points >= 5000) return 'Platinum';
    if (points >= 2500) return 'Gold';
    if (points >= 1000) return 'Silver';
    return 'Bronze';
  };

  // Get progress to next tier
  const getTierProgress = () => {
    const currentPoints = user.rewards.points;
    const currentTier = user.rewards.tier;

    const tierThresholds = {
      Bronze: { next: 'Silver', pointsNeeded: 1000 },
      Silver: { next: 'Gold', pointsNeeded: 2500 },
      Gold: { next: 'Platinum', pointsNeeded: 5000 },
      Platinum: { next: 'Platinum', pointsNeeded: 5000 },
    };

    const tierInfo = tierThresholds[currentTier];
    const progress = (currentPoints / tierInfo.pointsNeeded) * 100;

    return {
      currentTier,
      nextTier: tierInfo.next,
      pointsNeeded: tierInfo.pointsNeeded,
      pointsToNextTier: Math.max(0, tierInfo.pointsNeeded - currentPoints),
      progress: Math.min(100, progress),
    };
  };

  // Get progress to next reward goal
  const getRewardProgress = () => {
    const currentPoints = user.rewards.points;
    const goal = user.rewards.pointsGoal;
    const progress = (currentPoints / goal) * 100;

    return {
      currentPoints,
      goal,
      pointsRemaining: Math.max(0, goal - currentPoints),
      progress: Math.min(100, progress),
    };
  };

  // Check if user is logged in
  const isLoggedIn = () => {
    return user.profile.id !== null && user.profile.email !== '';
  };

  // Login user
  const login = (profileData) => {
    updateProfile({
      ...profileData,
      memberSince: profileData.memberSince || new Date().toISOString(),
    });
  };

  // Logout user
  const logout = async () => {
    setUser(defaultUserState);
    try {
      await AsyncStorage.removeItem('hideoutUser');
    } catch (error) {
      console.error('Error removing user from AsyncStorage:', error);
    }
  };

  const value = {
    user,
    profile: user.profile,
    rewards: user.rewards,
    orderHistory: user.orderHistory,
    preferences: user.preferences,
    updateProfile,
    updateRewards,
    addPoints,
    redeemReward,
    addBadge,
    addOrderToHistory,
    updatePreferences,
    updateNotificationPreferences,
    toggleDarkMode,
    getTierProgress,
    getRewardProgress,
    isLoggedIn: isLoggedIn(),
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use User Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
