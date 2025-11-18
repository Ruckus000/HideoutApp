/**
 * @fileoverview Responsive design hook providing device information and helpers.
 * This hook uses React Native's useWindowDimensions for dynamic updates when
 * device orientation changes or window resizes.
 *
 * USAGE:
 * Use this hook whenever component behavior or layout needs to change based on:
 * - Device size (small phone vs large phone vs tablet)
 * - Percentage-based calculations (width/height)
 * - Orientation changes
 *
 * DO NOT manually use Dimensions.get() in components - use this hook instead.
 *
 * @see /docs/responsive-design-standards.md for detailed usage guidelines.
 */

import { useWindowDimensions } from 'react-native';

/**
 * Custom hook for responsive design utilities.
 *
 * @returns {Object} Responsive utilities and device information
 * @property {number} width - Current window width (updates on rotation)
 * @property {number} height - Current window height (updates on rotation)
 * @property {number} scale - Device pixel ratio
 * @property {number} fontScale - Accessibility font scale multiplier
 * @property {boolean} isSmallPhone - True for devices < 360px width (iPhone SE, older Android)
 * @property {boolean} isLargePhone - True for devices 414-767px width (iPhone Pro Max, etc.)
 * @property {boolean} isTablet - True for devices >= 768px width (iPad, Android tablets)
 * @property {function} wp - Convert percentage to width pixels: wp(50) → 50% of screen width
 * @property {function} hp - Convert percentage to height pixels: hp(25) → 25% of screen height
 *
 * Examples:
 *
 * // Adaptive layout based on device type
 * const { isTablet } = useResponsive();
 * const numColumns = isTablet ? 3 : 2;
 *
 * // Percentage-based spacing
 * const { wp, hp } = useResponsive();
 * const cardWidth = wp(90); // 90% of screen width
 * const headerHeight = hp(15); // 15% of screen height
 *
 * // Conditional rendering
 * const { isSmallPhone } = useResponsive();
 * return isSmallPhone ? <CompactView /> : <StandardView />;
 */
export function useResponsive() {
  const { width, height, scale, fontScale } = useWindowDimensions();

  // Device type breakpoints
  // Based on common device widths:
  // - iPhone SE: 375px
  // - iPhone 14: 390px
  // - iPhone 14 Pro Max: 428px
  // - iPad Mini: 744px
  // - iPad Pro: 1024px
  const isSmallPhone = width < 360;
  const isLargePhone = width >= 414 && width < 768;
  const isTablet = width >= 768;

  /**
   * Width percentage helper.
   * Converts percentage to actual pixels based on screen width.
   *
   * @param {number} percent - Percentage of screen width (0-100)
   * @returns {number} Calculated width in pixels
   *
   * Example: wp(50) on iPhone 14 (390px) → 195px
   */
  const wp = (percent) => (width * percent) / 100;

  /**
   * Height percentage helper.
   * Converts percentage to actual pixels based on screen height.
   *
   * @param {number} percent - Percentage of screen height (0-100)
   * @returns {number} Calculated height in pixels
   *
   * Example: hp(20) on iPhone 14 (844px) → 168.8px
   */
  const hp = (percent) => (height * percent) / 100;

  return {
    // Window dimensions (dynamic - updates on rotation)
    width,
    height,
    scale,
    fontScale,

    // Device type flags
    isSmallPhone,
    isLargePhone,
    isTablet,

    // Percentage helpers
    wp,
    hp,
  };
}

export default useResponsive;
