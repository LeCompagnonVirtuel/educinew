import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  useColorScheme,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../services/supabase';
import { SPLASH_COLORS, SCREEN } from '../../components/splash/splashConfig';
import ParticleField from '../../components/splash/ParticleField';
import LogoSVG from '../../components/splash/LogoSVG';
import LightWave from '../../components/splash/LightWave';
import Subtitle from '../../components/splash/Subtitle';
import LoadingDots from '../../components/splash/LoadingDots';
import { useSplashAudio } from '../../components/splash/useSplashAudio';
import { useSplashAnimation } from '../../components/splash/useSplashAnimation';

const ONBOARDING_KEY = '@educi_onboarding_seen';

type Props = { navigation?: any };

export default function SplashScreen({ navigation }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? SPLASH_COLORS.dark : SPLASH_COLORS.light;

  const audio = useSplashAudio();

  const getDestination = useCallback(async (): Promise<string> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        // Valid session exists — check if user needs first-login or is blocked
        const storedUser = await AsyncStorage.getItem('educi_user');
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            const blockedRoles = ['SUPER_ADMIN', 'OWNER', 'ADMIN'];
            if (blockedRoles.includes(parsed.role)) {
              return 'LoginScreen';
            }
            // Check if this is a first-login user
            if (parsed.isFirstLogin || parsed.is_first_login || parsed.must_change_password) {
              return 'FirstLogin';
            }
          } catch {}
        }
        // Valid session, not blocked, not first login — go to main app
        // The AppContent in navigation.tsx will handle role-based routing
        return 'LoginScreen';
      }
      const seen = await AsyncStorage.getItem(ONBOARDING_KEY);
      return seen === 'true' ? 'LoginScreen' : 'Onboarding';
    } catch {
      return 'Onboarding';
    }
  }, []);

  const handleComplete = useCallback(async () => {
    const dest = await getDestination();
    navigation?.replace(dest);
  }, [navigation, getDestination]);

  const anim = useSplashAnimation(handleComplete);

  useEffect(() => {
    let mounted = true;

    // Preload audio
    audio.preload();

    // Start animation sequence
    anim.start(() => {
      if (mounted) audio.play();
    });

    return () => {
      mounted = false;
      anim.cancel();
      audio.cleanup();
    };
  }, []);

  const { vals } = anim;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: vals.screenOpacity,
          transform: [{ scale: vals.screenScale }],
        },
      ]}
      accessibilityRole="none"
      accessibilityLabel="EduCI, La plateforme intelligente qui connecte toute votre ecole"
      importantForAccessibility="yes"
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Background gradient */}
      <Animated.View style={[styles.background, { opacity: vals.bgOpacity }]}>
        <LinearGradient
          colors={colors.gradient as unknown as [string, string, string]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
        {/* Subtle radial glow spots */}
        <View style={[styles.glowSpot, styles.glowSpot1, { backgroundColor: isDark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)' }]} />
        <View style={[styles.glowSpot, styles.glowSpot2, { backgroundColor: isDark ? 'rgba(168,85,247,0.03)' : 'rgba(168,85,247,0.02)' }]} />
        <View style={[styles.glowSpot, styles.glowSpot3, { backgroundColor: isDark ? 'rgba(59,130,246,0.03)' : 'rgba(59,130,246,0.02)' }]} />
      </Animated.View>

      {/* Particle field */}
      <Animated.View style={[styles.particlesLayer, { opacity: vals.particleOpacity }]} pointerEvents="none">
        <ParticleField
          colors={colors.particle}
          convergenceProgress={vals.convergence}
        />
      </Animated.View>

      {/* Central composition */}
      <View style={styles.center}>
        {/* Logo container with glass card effect */}
        <View style={[styles.glassCard, { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)' }]}>
          <LogoSVG
            drawProgress={vals.drawProgress}
            fillProgress={vals.fillProgress}
            glowIntensity={vals.glowIntensity}
            primaryColor={isDark ? '#818CF8' : '#4F46E5'}
            accentColor={isDark ? '#6366F1' : '#6366F1'}
          />

          {/* Light wave overlay */}
          <LightWave
            waveProgress={vals.waveProgress}
            colors={isDark ? ['transparent', 'rgba(255,255,255,0.15)', 'transparent'] as const : ['transparent', 'rgba(255,255,255,0.3)', 'transparent'] as const}
          />

          {/* Shimmer overlay */}
          <Animated.View
            style={[
              styles.shimmer,
              { transform: [{ translateX: vals.shimmerX }] },
            ]}
          />
        </View>

        {/* Holographic reflection */}
        <Animated.View style={[styles.reflection, { opacity: vals.reflectionOpacity }]}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.reflectionImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Subtitle */}
        <Subtitle
          opacity={vals.subtitleOpacity}
          translateY={vals.subtitleY}
          textColor={colors.subtitle}
          accentColor={colors.subtitleAccent}
        />
      </View>

      {/* Loading dots */}
      <View style={[styles.bottom, { bottom: SCREEN.bottomOffset }]}>
        <LoadingDots
          opacity={vals.dotsOpacity}
          dotColor={colors.dot}
          glowColor={colors.dotGlow}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowSpot: {
    position: 'absolute',
    borderRadius: 999,
  },
  glowSpot1: {
    top: SCREEN.height * 0.08,
    left: -SCREEN.width * 0.15,
    width: SCREEN.width * 0.6,
    height: SCREEN.width * 0.6,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 60,
  },
  glowSpot2: {
    top: SCREEN.height * 0.45,
    right: -SCREEN.width * 0.1,
    width: SCREEN.width * 0.5,
    height: SCREEN.width * 0.5,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 50,
  },
  glowSpot3: {
    bottom: SCREEN.height * 0.1,
    left: SCREEN.width * 0.25,
    width: SCREEN.width * 0.45,
    height: SCREEN.width * 0.45,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
  },
  particlesLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassCard: {
    width: 160,
    height: 160,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 28,
    elevation: 15,
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    width: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    transform: [{ skewX: '-20deg' }],
  },
  reflection: {
    marginTop: 6,
    transform: [{ scaleY: -0.3 }, { scaleX: 0.75 }],
  },
  reflectionImage: {
    width: 140,
    height: 70,
    opacity: 0.2,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
