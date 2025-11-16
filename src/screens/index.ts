/**
 * @fileoverview This file serves as a central export point for all screen components.
 * Consolidating exports here allows for cleaner imports in other parts of the application,
 * such as the navigation setup. Instead of importing each screen individually, other files
 * can import them from `@/screens`.
 *
 * For example:
 * `import { HomeScreen, CartScreen } from '@/screens';`
 */

export { default as HomeScreen } from './HomeScreen';
export { default as CartScreen } from './CartScreen';
export { default as RewardsScreen } from './RewardsScreen';
export { default as ProfileScreen } from './ProfileScreen';
export { default as ProductDetailScreen } from './ProductDetailScreen';
