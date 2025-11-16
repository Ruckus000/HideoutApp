import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../theme';

/**
 * CustomButton - Styled button component
 * Versatile button matching the warm minimalist design system
 *
 * @param {string} title - Button text
 * @param {function} onPress - Callback when button is pressed
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'outline', 'ghost' (default: 'primary')
 * @param {string} size - Button size: 'small', 'medium', 'large' (default: 'medium')
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state with spinner
 * @param {boolean} fullWidth - Make button full width
 * @param {React.Component} icon - Optional icon component
 * @param {object} style - Additional styles
 * @param {object} textStyle - Additional text styles
 */
const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
  style,
  textStyle
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    // Size variants
    if (size === 'small') baseStyle.push(styles.buttonSmall);
    else if (size === 'large') baseStyle.push(styles.buttonLarge);
    else baseStyle.push(styles.buttonMedium);

    // Color variants
    if (variant === 'primary') baseStyle.push(styles.buttonPrimary);
    else if (variant === 'secondary') baseStyle.push(styles.buttonSecondary);
    else if (variant === 'outline') baseStyle.push(styles.buttonOutline);
    else if (variant === 'ghost') baseStyle.push(styles.buttonGhost);

    // States
    if (disabled) baseStyle.push(styles.buttonDisabled);
    if (fullWidth) baseStyle.push(styles.buttonFullWidth);

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    // Size variants
    if (size === 'small') baseStyle.push(styles.textSmall);
    else if (size === 'large') baseStyle.push(styles.textLarge);
    else baseStyle.push(styles.textMedium);

    // Color variants
    if (variant === 'primary') baseStyle.push(styles.textPrimary);
    else if (variant === 'secondary') baseStyle.push(styles.textSecondary);
    else if (variant === 'outline') baseStyle.push(styles.textOutline);
    else if (variant === 'ghost') baseStyle.push(styles.textGhost);

    // States
    if (disabled) baseStyle.push(styles.textDisabled);

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[...getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'secondary' ? theme.colors.white : theme.colors.accent}
          size="small"
        />
      ) : (
        <>
          {Icon && <Icon style={styles.icon} />}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
  },
  buttonSmall: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  buttonMedium: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  buttonLarge: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.accent,
    ...theme.shadows.soft,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.terracotta,
    ...theme.shadows.soft,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.accent,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray200,
    opacity: 0.5,
  },
  buttonFullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: theme.typography.semibold,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: theme.typography.sm,
  },
  textMedium: {
    fontSize: theme.typography.md,
  },
  textLarge: {
    fontSize: theme.typography.lg,
  },
  textPrimary: {
    color: theme.colors.white,
  },
  textSecondary: {
    color: theme.colors.white,
  },
  textOutline: {
    color: theme.colors.accent,
  },
  textGhost: {
    color: theme.colors.accent,
  },
  textDisabled: {
    color: theme.colors.gray400,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
});

export default CustomButton;
