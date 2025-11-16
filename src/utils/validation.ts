/**
 * Utility functions for data validation
 */

/**
 * Validate email format.
 * @param email The email address to validate.
 * @returns `true` if the email is valid, `false` otherwise.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format.
 * @param phone The phone number to validate.
 * @returns `true` if the phone number is valid, `false` otherwise.
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate password strength.
 * @param password The password to validate.
 * @returns `true` if the password is strong enough, `false` otherwise.
 */
export function isValidPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}

/**
 * Sanitize user input by trimming whitespace and removing angle brackets.
 * @param input The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
