import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import theme from '../theme';

/**
 * A versatile and styled button component that adapts to the app's warm minimalist design system.
 *
 * @param {object} props - The component's props.
 * @param {string} props.title - The text to display inside the button.
 * @param {function(): void} props.onPress - The function to call when the button is pressed.
 * @param {('primary'|'secondary'|'outline'|'ghost')} [props.variant='primary'] - The button's style variant.
 * @param {('small'|'medium'|'large')} [props.size='medium'] - The button's size.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.loading=false] - Whether to show a loading spinner instead of the button text.
 * @param {boolean} [props.fullWidth=false] - Whether the button should take up the full width of its container.
 * @param {React.ComponentType<any>} [props.icon] - An optional icon component to display to the left of the text.
 * @param {object} [props.style] - Additional styles to apply to the button container.
 * @param {object} [props.textStyle] - Additional styles to apply to the button text.
 * @returns {React.ReactElement} The rendered component.
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
