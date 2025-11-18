/**
 * @fileoverview Icon size tokens for consistent, responsive icon sizing across the app.
 * All icon sizes use moderateScale() to ensure appropriate sizing on all device types.
 *
 * USAGE:
 * Components should ALWAYS use these icon tokens instead of hard-coded sizes.
 *
 * ✅ CORRECT:
 * import { icon } from '../theme';
 * <SomeIcon name="star" size={icon.md} />
 *
 * ❌ INCORRECT:
 * <SomeIcon name="star" size={24} />
 * <SomeIcon name="star" size={moderateScale(24)} />
 *
 * @see /docs/responsive-design-standards.md for usage guidelines.
 */

import { moderateScale } from './scale';

/**
 * Icon Size Tokens
 *
 * Provides a consistent scale of icon sizes that adapt to device dimensions.
 *
 * Size Guide:
 * - xs (12px): Tiny icons, decorative elements, inline icons in small text
 * - sm (16px): Small UI icons, list item icons, input field icons
 * - md (20px): Standard icons, toolbar icons, navigation icons
 * - lg (24px): Large icons, primary actions, feature icons
 * - xl (32px): Extra large icons, hero sections, empty states
 * - xxl (40px): Display icons, splash screens, large feature graphics
 *
 * All sizes are scaled using moderateScale with default factor (0.5) to
 * prevent over-scaling on tablets while maintaining legibility on small phones.
 */
export const icon = {
  xs: moderateScale(12),    // Extra small
  sm: moderateScale(16),    // Small
  md: moderateScale(20),    // Medium (most common)
  lg: moderateScale(24),    // Large
  xl: moderateScale(32),    // Extra large
  xxl: moderateScale(40),   // Display size
};

export default icon;
