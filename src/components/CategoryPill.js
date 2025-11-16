import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';

/**
 * A horizontal scrolling list of pill-shaped category buttons.
 *
 * @param {object} props - The component's props.
 * @param {string[]} props.categories - An array of category names to display.
 * @param {number} props.selectedIndex - The index of the currently selected category.
 * @param {function(number): void} props.onSelectCategory - A callback function that is called when a category is selected. It receives the index of the selected category.
 * @param {boolean} [props.showScrollIndicator=false] - Whether to show the horizontal scroll indicator.
 * @returns {React.ReactElement} The rendered component.
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
