import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';

/**
 * CategoryPill - Horizontal scrolling category selector
 * Displays a horizontal list of pill-shaped category buttons
 *
 * @param {Array} categories - Array of category strings
 * @param {number} selectedIndex - Index of the selected category
 * @param {function} onSelectCategory - Callback when category is selected
 * @param {boolean} showScrollIndicator - Show scroll indicator (default: false)
 */
const CategoryPill = ({
  categories = [],
  selectedIndex = 0,
  onSelectCategory,
  showScrollIndicator = false
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={showScrollIndicator}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectCategory && onSelectCategory(index)}
          style={[
            styles.pill,
            selectedIndex === index && styles.pillSelected
          ]}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.pillText,
              selectedIndex === index && styles.pillTextSelected
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.xl,
    gap: 10,
  },
  pill: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    marginRight: 10,
  },
  pillSelected: {
    backgroundColor: theme.colors.accent,
    ...theme.shadows.soft,
  },
  pillText: {
    fontSize: theme.typography.sm,
    fontWeight: theme.typography.medium,
    color: theme.colors.secondary,
    whiteSpace: 'nowrap',
  },
  pillTextSelected: {
    color: theme.colors.white,
  },
});

export default CategoryPill;
