import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS, withAlpha } from '../../constants/colors';
import {
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SPACING,
  SEMANTIC_COLORS,
} from '../../constants/theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  style?: object;
  testID?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  success: {
    bg: SEMANTIC_COLORS.success.light,
    text: SEMANTIC_COLORS.success.text,
    dot: SEMANTIC_COLORS.success.main,
  },
  warning: {
    bg: SEMANTIC_COLORS.warning.light,
    text: SEMANTIC_COLORS.warning.text,
    dot: SEMANTIC_COLORS.warning.main,
  },
  error: {
    bg: SEMANTIC_COLORS.error.light,
    text: SEMANTIC_COLORS.error.text,
    dot: SEMANTIC_COLORS.error.main,
  },
  info: {
    bg: SEMANTIC_COLORS.info.light,
    text: SEMANTIC_COLORS.info.text,
    dot: SEMANTIC_COLORS.info.main,
  },
  neutral: {
    bg: SEMANTIC_COLORS.neutral.light,
    text: SEMANTIC_COLORS.neutral.text,
    dot: SEMANTIC_COLORS.neutral.main,
  },
};

const SIZE_STYLES: Record<BadgeSize, { height: number; paddingHorizontal: number; fontSize: number; dotSize: number }> = {
  sm: { height: 22, paddingHorizontal: SPACING.sm, fontSize: FONT_SIZES.xs, dotSize: 6 },
  md: { height: 26, paddingHorizontal: SPACING.md, fontSize: FONT_SIZES.sm, dotSize: 8 },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  style,
  testID,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulse) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [pulse, pulseAnim]);

  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          backgroundColor: variantStyle.bg,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      {dot && (
        <Animated.View
          testID={`${testID}-dot`}
          style={[
            styles.dot,
            {
              width: sizeStyle.dotSize,
              height: sizeStyle.dotSize,
              borderRadius: sizeStyle.dotSize / 2,
              backgroundColor: variantStyle.dot,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      )}
      <Text
        testID={`${testID}-label`}
        style={[
          styles.label,
          {
            fontSize: sizeStyle.fontSize,
            color: variantStyle.text,
            marginLeft: dot ? SPACING.xs : 0,
          },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: BORDER_RADIUS.full,
  },
  dot: {
    alignSelf: 'center',
  },
  label: {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.medium,
  },
});
