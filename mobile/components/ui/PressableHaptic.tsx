import React, { useCallback, useRef } from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { haptics } from '../../utils/haptics';
import { ANIMATION, OPACITY } from '../../constants/theme';

interface PressableHapticProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  hapticType?: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';
  scaleValue?: number;
  style?: object;
  testID?: string;
  accessibilityLabel?: string;
}

export const PressableHaptic: React.FC<PressableHapticProps> = ({
  children,
  onPress,
  onLongPress,
  disabled = false,
  hapticType = 'light',
  scaleValue = 0.97,
  style,
  testID,
  accessibilityLabel,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const triggerHaptic = useCallback(() => {
    haptics[hapticType]();
  }, [hapticType]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: scaleValue,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim, scaleValue]);

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
      triggerHaptic();
      onPress?.(event);
    },
    [triggerHaptic, onPress]
  );

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      haptics.medium();
      onLongPress?.(event);
    },
    [onLongPress]
  );

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        testID={testID}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={({ pressed }) => [
          styles.base,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: OPACITY.pressed,
  },
  disabled: {
    opacity: OPACITY.disabled,
  },
});
