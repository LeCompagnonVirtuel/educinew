import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

interface Props {
  opacity: Animated.Value;
  dotColor: string;
  glowColor: string;
}

export default function LoadingDots({ opacity, dotColor, glowColor }: Props) {
  const dots = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  useEffect(() => {
    const animations = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      )
    );
    animations.forEach(a => a.start());
    return () => { animations.forEach(a => a.stop()); };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {dots.map((dot, i) => {
        const scale = dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 1.2],
        });
        const dotOpacity = dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: dotColor,
                shadowColor: glowColor,
                opacity: dotOpacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    gap: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
});
