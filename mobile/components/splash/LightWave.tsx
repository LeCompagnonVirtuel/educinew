import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LOGO_CONFIG } from './splashConfig';

interface Props {
  waveProgress: Animated.Value;
  colors: readonly [string, string, string];
}

export default function LightWave({ waveProgress, colors }: Props) {
  const translateX = waveProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-LOGO_CONFIG.size * 1.5, LOGO_CONFIG.size * 1.5],
  });

  const opacity = waveProgress.interpolate({
    inputRange: [0, 0.2, 0.5, 0.8, 1],
    outputRange: [0, 0.6, 1, 0.6, 0],
  });

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[
          styles.wave,
          {
            opacity,
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={[colors[0], colors[1], colors[2]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: LOGO_CONFIG.size,
    height: LOGO_CONFIG.size,
    borderRadius: LOGO_CONFIG.borderRadius,
    overflow: 'hidden',
  },
  wave: {
    width: LOGO_CONFIG.size * 0.4,
    height: '100%',
  },
});
