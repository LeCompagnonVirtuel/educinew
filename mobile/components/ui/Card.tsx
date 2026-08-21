import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { COLORS, withAlpha } from '../../constants/colors';
import {
  BORDER_RADIUS,
  SHADOWS,
  SPACING,
  ANIMATION,
} from '../../constants/theme';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';
type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: object;
  testID?: string;
}

const PADDING_SIZES: Record<CardPadding, number> = {
  sm: SPACING.sm,
  md: SPACING.lg,
  lg: SPACING.xl,
};

const GLASS_BACKGROUND = Platform.select({
  ios: withAlpha(COLORS.white, 0.7),
  android: withAlpha(COLORS.white, 0.85),
  default: withAlpha(COLORS.white, 0.7),
});

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  const paddingValue = PADDING_SIZES[padding];

  const cardStyle = [
    styles.base,
    {
      padding: paddingValue,
    },
    variant === 'default' && styles.defaultVariant,
    variant === 'elevated' && [styles.elevatedVariant, SHADOWS.lg],
    variant === 'outlined' && styles.outlinedVariant,
    variant === 'glass' && styles.glassVariant,
    disabled && styles.disabled,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        testID={testID}
        style={cardStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View testID={testID} style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
  },
  defaultVariant: {
    ...SHADOWS.sm,
    backgroundColor: COLORS.white,
  },
  elevatedVariant: {
    backgroundColor: COLORS.white,
  },
  outlinedVariant: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  glassVariant: {
    backgroundColor: GLASS_BACKGROUND,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.white, 0.2),
  },
  disabled: {
    opacity: 0.5,
  },
});
