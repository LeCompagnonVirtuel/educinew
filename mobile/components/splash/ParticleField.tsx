import React, { useRef, useEffect, useMemo } from 'react';
import { Animated, Easing, StyleSheet, ViewStyle } from 'react-native';
import { PARTICLE_CONFIG, SCREEN } from './splashConfig';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  speed: number;
  drift: number;
  color: string;
  targetX: number;
  targetY: number;
}

interface Props {
  colors: readonly [string, string, string, string];
  convergenceProgress: Animated.Value;
}

function generateParticles(colors: readonly [string, string, string, string]): Particle[] {
  const centerX = SCREEN.width / 2;
  const centerY = SCREEN.height / 2;
  return Array.from({ length: PARTICLE_CONFIG.count }, (_, i) => {
    const x = Math.random() * SCREEN.width;
    const y = Math.random() * SCREEN.height;
    return {
      id: i,
      x,
      y,
      size: PARTICLE_CONFIG.minSize + Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize),
      baseOpacity: PARTICLE_CONFIG.minOpacity + Math.random() * (PARTICLE_CONFIG.maxOpacity - PARTICLE_CONFIG.minOpacity),
      speed: PARTICLE_CONFIG.minSpeed + Math.random() * (PARTICLE_CONFIG.maxSpeed - PARTICLE_CONFIG.minSpeed),
      drift: 10 + Math.random() * 25,
      color: colors[i % 4],
      targetX: centerX + (Math.random() - 0.5) * 60,
      targetY: centerY + (Math.random() - 0.5) * 60,
    };
  });
}

export default function ParticleField({ colors, convergenceProgress }: Props) {
  const particles = useMemo(() => generateParticles(colors), [colors]);
  const animRefs = useRef(
    particles.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    const loops = particles.map((p, i) => {
      const anim = animRefs[i];
      return Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(anim.opacity, {
              toValue: p.baseOpacity,
              duration: p.speed * 0.4,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: p.baseOpacity * 0.3,
              duration: p.speed * 0.6,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(anim.translateY, {
              toValue: -p.drift,
              duration: p.speed,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: p.drift,
              duration: p.speed,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(anim.translateX, {
              toValue: p.drift * 0.6,
              duration: p.speed * 1.2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateX, {
              toValue: -p.drift * 0.6,
              duration: p.speed * 1.2,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    });

    loops.forEach(l => l.start());
    return () => { loops.forEach(l => l.stop()); };
  }, []);

  return (
    <>
      {particles.map((p, i) => {
        const anim = animRefs[i];
        const convergeX = convergenceProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, p.targetX - p.x],
        });
        const convergeY = convergenceProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, p.targetY - p.y],
        });

        return (
          <Animated.View
            key={p.id}
            style={[
              styles.particle,
              {
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                borderRadius: p.size,
                backgroundColor: p.color,
                opacity: anim.opacity,
                shadowColor: p.color,
                transform: [
                  { translateX: Animated.add(anim.translateX, convergeX) },
                  { translateY: Animated.add(anim.translateY, convergeY) },
                ],
              },
            ]}
          />
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  } as ViewStyle,
});
