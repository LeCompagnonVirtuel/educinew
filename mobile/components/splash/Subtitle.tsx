import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import { SUBTITLE_CONFIG } from './splashConfig';

interface Props {
  opacity: Animated.Value;
  translateY: Animated.Value;
  textColor: string;
  accentColor: string;
}

export default function Subtitle({ opacity, translateY, textColor, accentColor }: Props) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: SUBTITLE_CONFIG.floatDuration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: SUBTITLE_CONFIG.floatDuration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => { loop.stop(); };
  }, []);

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SUBTITLE_CONFIG.floatDistance],
  });

  const words = SUBTITLE_CONFIG.text.split(' ');
  const midpoint = Math.ceil(words.length / 2);
  const line1 = words.slice(0, midpoint).join(' ');
  const line2 = words.slice(midpoint).join(' ');

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [
            { translateY: Animated.add(translateY, floatY) },
          ],
        },
      ]}
      accessibilityLabel={SUBTITLE_CONFIG.text}
      accessibilityRole="text"
    >
      <Text style={[styles.line, { color: textColor }]}>{line1}</Text>
      <Text style={[styles.line, styles.accent, { color: accentColor }]}>{line2}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 32,
  },
  line: {
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.3,
    textAlign: 'center',
    lineHeight: 24,
  },
  accent: {
    fontWeight: '500',
  },
});
