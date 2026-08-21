import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Filter, FeGaussianBlur, FeComposite } from 'react-native-svg';
import { LOGO_CONFIG } from './splashConfig';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  drawProgress: Animated.Value;
  fillProgress: Animated.Value;
  glowIntensity: Animated.Value;
  primaryColor: string;
  accentColor: string;
}

const LOGO_PATHS = [
  'M30 25 L90 25 L90 35 L30 35 Z',
  'M30 25 L30 95 L40 95 L40 35 Z',
  'M30 55 L75 55 L75 65 L30 65 Z',
  'M30 85 L90 85 L90 95 L30 95 Z',
  'M80 55 L90 55 L90 85 L80 85 Z',
];

const TOTAL_LENGTH = 400;

export default function LogoSVG({ drawProgress, fillProgress, glowIntensity, primaryColor, accentColor }: Props) {
  const strokeDashoffset = drawProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [TOTAL_LENGTH, 0],
  });

  const fillOpacity = fillProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const glowOpacity = glowIntensity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glowOrb, { opacity: glowOpacity }]} />
      <Svg
        width={LOGO_CONFIG.size}
        height={LOGO_CONFIG.size}
        viewBox={LOGO_CONFIG.viewBox}
        style={styles.svg}
      >
        <Defs>
          <LinearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={primaryColor} />
            <Stop offset="50%" stopColor={accentColor} />
            <Stop offset="100%" stopColor="#06B6D4" />
          </LinearGradient>
          <LinearGradient id="fillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
            <Stop offset="100%" stopColor={accentColor} stopOpacity="0.9" />
          </LinearGradient>
          <Filter id="glow">
            <FeGaussianBlur stdDeviation="3" result="blur" />
            <FeComposite in="SourceGraphic" in2="blur" operator="over" />
          </Filter>
        </Defs>

        {LOGO_PATHS.map((d, i) => (
          <React.Fragment key={i}>
            <AnimatedPath
              d={d}
              stroke="url(#logoGrad)"
              strokeWidth={1.5}
              fill="none"
              strokeDasharray={TOTAL_LENGTH}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            <AnimatedPath
              d={d}
              fill="url(#fillGrad)"
              opacity={fillOpacity}
            />
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrb: {
    position: 'absolute',
    width: LOGO_CONFIG.size + LOGO_CONFIG.glowRadius,
    height: LOGO_CONFIG.size + LOGO_CONFIG.glowRadius,
    borderRadius: (LOGO_CONFIG.size + LOGO_CONFIG.glowRadius) / 2,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: LOGO_CONFIG.glowRadius / 2,
  },
  svg: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
});
