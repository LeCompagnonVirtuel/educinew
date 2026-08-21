import React, { useCallback, useRef } from 'react';
import {
  TouchableOpacity,
  Animated,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Platform,
  GestureResponderEvent,
} from 'react-native';
import { COLORS, withAlpha } from '../../constants/colors';
import {
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SPACING,
  ANIMATION,
  OPACITY,
} from '../../constants/theme';
import { haptics } from '../../utils/haptics';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  fullWidth?: boolean;
  testID?: string;
  style?: object;
}

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: {
    bg: COLORS.primary,
    text: COLORS.white,
  },
  secondary: {
    bg: COLORS.secondary,
    text: COLORS.white,
  },
  outline: {
    bg: 'transparent',
    text: COLORS.primary,
    border: COLORS.primary,
  },
  ghost: {
    bg: 'transparent',
    text: COLORS.primary,
  },
  danger: {
    bg: COLORS.error,
    text: COLORS.white,
  },
};

const SIZE_STYLES: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number; iconSize: number }> = {
  sm: { height: 36, paddingHorizontal: SPACING.md, fontSize: FONT_SIZES.sm, iconSize: 16 },
  md: { height: 44, paddingHorizontal: SPACING.lg, fontSize: FONT_SIZES.md, iconSize: 20 },
  lg: { height: 52, paddingHorizontal: SPACING.xl, fontSize: FONT_SIZES.lg, iconSize: 24 },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  onPress,
  fullWidth = false,
  testID,
  style,
}) => {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const isDisabled = disabled || loading;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const hapticMap: Record<string, () => void> = {
        primary: haptics.light,
        secondary: haptics.selection,
        outline: haptics.selection,
        ghost: haptics.selection,
        danger: haptics.warning,
      };
      hapticMap[variant]?.();
      onPress?.(event);
    },
    [variant, onPress]
  );

  const containerStyle = [
    styles.container,
    {
      height: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      backgroundColor: variantStyle.bg,
      borderColor: variantStyle.border || 'transparent',
    },
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    variant === 'outline' && styles.outlineBorder,
    variant === 'ghost' && styles.ghostBg,
    style,
  ];

  const textStyle = [
    styles.text,
    {
      fontSize: sizeStyle.fontSize,
      color: variantStyle.text,
    },
    loading && styles.textHidden,
  ];

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && styles.fullWidthAnimated]}>
      <TouchableOpacity
        testID={testID}
        style={containerStyle}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={OPACITY.pressed}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
      >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={variantStyle.text}
            testID={`${testID}-spinner`}
          />
        </View>
      ) : (
        <View style={styles.content}>
          {iconLeft && (
            <View style={styles.iconLeft} testID={`${testID}-icon-left`}>
              {iconLeft}
            </View>
          )}
          <Text style={textStyle} testID={`${testID}-text`}>
            {title}
          </Text>
          {iconRight && (
            <View style={styles.iconRight} testID={`${testID}-icon-right`}>
              {iconRight}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  fullWidthAnimated: {
    width: '100%',
  },
  disabled: {
    opacity: OPACITY.disabled,
  },
  outlineBorder: {
    borderWidth: 1.5,
  },
  ghostBg: {
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.semibold,
    textAlign: 'center',
  },
  textHidden: {
    opacity: 0,
  },
  loadingContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: SPACING.sm,
  },
  iconRight: {
    marginLeft: SPACING.sm,
  },
});
