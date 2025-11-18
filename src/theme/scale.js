/**
 * @fileoverview Scaling utilities wrapper for react-native-size-matters.
 * This wrapper allows us to swap the scaling library in the future if needed
 * without changing all component files.
 *
 * IMPORTANT: This file should ONLY be imported by theme files (typography.js, icon.js).
 * Components should NEVER import this directly - they should use theme tokens instead.
 *
 * @see /docs/responsive-design-standards.md for usage guidelines.
 */

import { moderateScale as ms } from 'react-native-size-matters';

/**
 * Moderate scale function with controllable resize factor.
 *
 * This function scales a size value based on the device screen width,
 * but applies a "factor" to prevent over-scaling on very large devices.
 *
 * @param {number} size - The base size (designed for ~5" screen)
 * @param {number} factor - Resize factor (0 = no scaling, 1 = full scaling, 0.5 = moderate)
 * @returns {number} Scaled size appropriate for current device
 *
 * Examples:
 * - moderateScale(16) → 16 on base device, ~18 on large phone, ~14 on small phone
 * - moderateScale(16, 0.3) → Less scaling (more conservative)
 * - moderateScale(16, 0.7) → More scaling (more aggressive)
 *
 * Default factor of 0.5 provides good balance:
 * - Prevents text from becoming too large on tablets
 * - Prevents text from becoming too small on small phones
 * - Works well for most UI elements
 */
export const moderateScale = (size, factor = 0.5) => ms(size, factor);

export default moderateScale;
