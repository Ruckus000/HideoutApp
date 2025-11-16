/**
 * Utility functions for formatting data
 */

/**
 * Format a number as currency.
 * @param amount The number to format.
 * @returns A string representing the number as currency (e.g., "$12.34").
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Format a date to a readable string.
 * @param date The date to format.
 * @returns A string representing the date (e.g., "November 16, 2025").
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format points with commas.
 * @param points The number of points to format.
 * @returns A string representing the points with commas (e.g., "1,234").
 */
export function formatPoints(points: number): string {
  return points.toLocaleString();
}

/**
 * Truncate text to a specified length.
 * @param text The text to truncate.
 * @param maxLength The maximum length of the text.
 * @returns The truncated text, with "..." appended if the original text was longer than maxLength.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
