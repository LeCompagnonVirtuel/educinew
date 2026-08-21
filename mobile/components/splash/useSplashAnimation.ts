import { useRef, useCallback, useEffect } from 'react';
import { Animated, Easing, AccessibilityInfo } from 'react-native';
import { SPLASH_TIMING } from './splashConfig';

interface AnimationValues {
  screenOpacity: Animated.Value;
  screenScale: Animated.Value;
  bgOpacity: Animated.Value;
  particleOpacity: Animated.Value;
  convergence: Animated.Value;
  drawProgress: Animated.Value;
  fillProgress: Animated.Value;
  glowIntensity: Animated.Value;
  waveProgress: Animated.Value;
  reflectionOpacity: Animated.Value;
  subtitleOpacity: Animated.Value;
  subtitleY: Animated.Value;
  dotsOpacity: Animated.Value;
  shimmerX: Animated.Value;
}

export function useSplashAnimation(onComplete: () => void) {
  const cancelledRef = useRef(false);
  const reduceMotionRef = useRef(false);

  const vals = useRef<AnimationValues>({
    screenOpacity: new Animated.Value(1),
    screenScale: new Animated.Value(1),
    bgOpacity: new Animated.Value(0),
    particleOpacity: new Animated.Value(0),
    convergence: new Animated.Value(0),
    drawProgress: new Animated.Value(0),
    fillProgress: new Animated.Value(0),
    glowIntensity: new Animated.Value(0),
    waveProgress: new Animated.Value(0),
    reflectionOpacity: new Animated.Value(0),
    subtitleOpacity: new Animated.Value(0),
    subtitleY: new Animated.Value(20),
    dotsOpacity: new Animated.Value(0),
    shimmerX: new Animated.Value(-200),
  }).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      reduceMotionRef.current = enabled;
    });
  }, []);

  const start = useCallback((onPhase3?: () => void) => {
    cancelledRef.current = false;
    const T = SPLASH_TIMING;
    const isFast = reduceMotionRef.current;
    const speed = isFast ? 0.15 : 1;

    const sequence = Animated.sequence([
      // Phase 1: Background + particles appear
      Animated.parallel([
        Animated.timing(vals.bgOpacity, {
          toValue: 1,
          duration: T.phase1 * speed,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(vals.particleOpacity, {
          toValue: 1,
          duration: T.phase1 * speed,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // Phase 2: Line drawing + convergence
      Animated.parallel([
        Animated.timing(vals.drawProgress, {
          toValue: 1,
          duration: T.phase2 * speed,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(vals.convergence, {
          toValue: 1,
          duration: T.phase2 * speed,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(vals.glowIntensity, {
          toValue: 0.5,
          duration: T.phase2 * speed,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // Phase 3: Fill + glow + wave + shimmer
      Animated.parallel([
        Animated.timing(vals.fillProgress, {
          toValue: 1,
          duration: T.phase3 * speed,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(vals.glowIntensity, {
          toValue: 1,
          duration: T.phase3 * speed,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(vals.waveProgress, {
          toValue: 1,
          duration: T.phase3 * speed,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(vals.reflectionOpacity, {
          toValue: 0.35,
          duration: T.phase3 * speed * 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(vals.shimmerX, {
          toValue: 200,
          duration: T.phase3 * speed * 0.5,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // Phase 4: Glow pulse stabilization
      Animated.timing(vals.glowIntensity, {
        toValue: 0.7,
        duration: T.phase4 * speed,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),

      // Phase 5: Subtitle + dots
      Animated.parallel([
        Animated.timing(vals.subtitleOpacity, {
          toValue: 1,
          duration: T.phase5 * speed,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(vals.subtitleY, {
          toValue: 0,
          friction: 10,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(vals.dotsOpacity, {
          toValue: 1,
          duration: (T.phase5 * 0.5) * speed,
          useNativeDriver: true,
        }),
      ]),

      // Phase 6: Hold
      Animated.delay(T.phase6 * speed),

      // Phase 7: Exit transition
      Animated.parallel([
        Animated.timing(vals.screenOpacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(vals.screenScale, {
          toValue: 1.05,
          duration: 400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);

    // Trigger voice at phase 3
    const voiceDelay = (T.phase1 + T.phase2) * speed;
    setTimeout(() => {
      if (!cancelledRef.current && onPhase3) onPhase3();
    }, voiceDelay);

    sequence.start(() => {
      if (!cancelledRef.current) onComplete();
    });
  }, [onComplete]);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
  }, []);

  return { vals, start, cancel };
}
