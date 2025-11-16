import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme';
import StatusBar from '../components/StatusBar';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [cartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = [
    'All',
    'Kava Cocktails',
    'Botanical Teas',
    'Kava Shots',
    'Coffee & Lattes',
    'Elixirs',
  ];

  const products = [
    {
      name: 'Sunset Serenity',
      category: 'Kava Cocktails',
      price: '$12.00',
      image: '🥥',
      color: '#A67B5B',
    },
    {
      name: 'Island Dreams',
      category: 'Kava Cocktails',
      price: '$14.00',
      image: '🌺',
      color: '#8B7355',
    },
    {
      name: 'Tropical Bliss',
      category: 'Kava Cocktails',
      price: '$13.00',
      image: '🍹',
      color: '#6B7F47',
    },
    {
      name: 'Midnight Calm',
      category: 'Kava Shots',
      price: '$8.00',
      image: '🌙',
      color: '#5A6B3B',
    },
  ];

  const rewardsProgress = 0.75; // 75% (750/1000)

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good evening</Text>
            <Text style={styles.welcomeText}>Welcome back, Alex</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Rewards Card */}
        <View style={styles.rewardsContainer}>
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rewardsCard}
          >
            <View style={styles.rewardsHeader}>
              <View>
                <Text style={styles.rewardsTitle}>Community Points</Text>
                <Text style={styles.rewardsSubtitle}>Your journey to rewards</Text>
              </View>
              <View style={styles.starContainer}>
                <Ionicons name="star" size={20} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressCurrent}>750 points</Text>
                <Text style={styles.progressTarget}>1,000</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${rewardsProgress * 100}%` },
                  ]}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.rewardsButton}>
              <Text style={styles.rewardsButtonText}>View All Rewards</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(index)}
                style={[
                  styles.categoryButton,
                  selectedCategory === index && styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === index && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Popular Now</Text>
          <View style={styles.productsGrid}>
            {products.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <View
                  style={[
                    styles.productImage,
                    { backgroundColor: product.color + '20' },
                  ]}
                >
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Feather name="shopping-bag" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Community Event Banner */}
        <View style={styles.eventContainer}>
          <LinearGradient
            colors={[theme.colors.terracotta, theme.colors.terracottaDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.eventBanner}
          >
            <View style={styles.eventContent}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventDay}>THURSDAY NIGHTS</Text>
                <Text style={styles.eventTitle}>Open Mic Night</Text>
                <Text style={styles.eventDescription}>
                  Join our community for an evening of connection
                </Text>
                <TouchableOpacity style={styles.eventButton}>
                  <Text style={styles.eventButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.eventEmoji}>🎤</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color={theme.colors.accent} />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="star-outline" size={24} color={theme.colors.gray400} />
          <Text style={styles.tabLabel}>Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <View>
            <Feather name="shopping-bag" size={24} color={theme.colors.gray400} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color={theme.colors.gray400} />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: theme.typography.sm,
    color: theme.colors.secondary,
    marginBottom: 2,
  },
  welcomeText: {
    fontSize: theme.typography.huge,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 44,
    height: 44,
    backgroundColor: theme.colors.surface,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Rewards Card
  rewardsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  rewardsCard: {
    borderRadius: theme.borderRadius.xl,
    padding: 20,
    ...theme.shadows.premium,
  },
  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rewardsTitle: {
    fontSize: theme.typography.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rewardsSubtitle: {
    fontSize: theme.typography.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  starContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressCurrent: {
    fontSize: theme.typography.sm,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  progressTarget: {
    fontSize: theme.typography.sm,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  rewardsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  rewardsButtonText: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.accentDark,
    letterSpacing: 0.3,
  },

  // Categories
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.soft,
  },
  categoryText: {
    fontSize: theme.typography.sm,
    fontWeight: '500',
    color: theme.colors.secondary,
  },
  categoryTextActive: {
    color: theme.colors.white,
  },

  // Products
  productsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: theme.typography.lg,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: (width - 64) / 2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.soft,
  },
  productImage: {
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 48,
  },
  productInfo: {
    padding: 16,
  },
  productCategory: {
    fontSize: theme.typography.xs,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  productName: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: theme.typography.base,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.soft,
  },

  // Event Banner
  eventContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  eventBanner: {
    borderRadius: theme.borderRadius.xl,
    padding: 24,
    ...theme.shadows.premium,
  },
  eventContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventDay: {
    fontSize: theme.typography.xs,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: theme.typography.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
    lineHeight: 20,
  },
  eventButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  eventButtonText: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.terracotta,
  },
  eventEmoji: {
    fontSize: 64,
    opacity: 0.5,
    marginLeft: 16,
  },

  // Tab Bar
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.sm,
    position: 'relative',
  },
  tabLabel: {
    fontSize: theme.typography.xs,
    color: theme.colors.gray400,
    marginTop: 4,
  },
  tabLabelActive: {
    color: theme.colors.accent,
    fontWeight: '500',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: theme.colors.terracotta,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HomeScreen;
