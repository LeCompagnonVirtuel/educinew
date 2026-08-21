import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export const SPLASH_TIMING = {
  phase1: 400,
  phase2: 800,
  phase3: 800,
  phase4: 600,
  phase5: 600,
  phase6: 300,
  get total() {
    return this.phase1 + this.phase2 + this.phase3 + this.phase4 + this.phase5 + this.phase6;
  },
} as const;

export const SPLASH_COLORS = {
  light: {
    background: '#FFFFFF',
    gradient: ['#FFFFFF', '#F0F4FF', '#E8EEFF'] as const,
    particle: ['#6366F1', '#3B82F6', '#06B6D4', '#A855F7'] as const,
    glow: 'rgba(99, 102, 241, 0.12)',
    subtitle: '#4B5563',
    subtitleAccent: '#4F46E5',
    dot: '#6366F1',
    dotGlow: 'rgba(99, 102, 241, 0.4)',
    track: 'rgba(99, 102, 241, 0.08)',
  },
  dark: {
    background: '#080E1E',
    gradient: ['#080E1E', '#0D1333', '#100A2A'] as const,
    particle: ['#818CF8', '#60A5FA', '#22D3EE', '#C084FC'] as const,
    glow: 'rgba(129, 140, 248, 0.15)',
    subtitle: '#9CA3AF',
    subtitleAccent: '#818CF8',
    dot: '#818CF8',
    dotGlow: 'rgba(129, 140, 248, 0.5)',
    track: 'rgba(129, 140, 248, 0.1)',
  },
} as const;

export const PARTICLE_CONFIG = {
  count: 30,
  minSize: 1.5,
  maxSize: 4,
  minOpacity: 0.06,
  maxOpacity: 0.22,
  minSpeed: 2000,
  maxSpeed: 5000,
  convergenceDelay: 600,
  convergenceDuration: 800,
} as const;

export const LOGO_CONFIG = {
  size: 140,
  borderRadius: 32,
  glowRadius: 80,
  strokeWidth: 2,
  viewBox: '0 0 120 120',
} as const;

export const AUDIO_CONFIG = {
  file: require('../../assets/announcement.mp3'),
  voiceText: 'Bienvenue sur EduCI... La plateforme intelligente qui connecte toute votre ecole.',
  voiceLanguage: 'fr-FR',
  voiceRate: 0.82,
  voicePitch: 1.04,
  triggerDelay: 800,
} as const;

export const SUBTITLE_CONFIG = {
  text: 'La plateforme intelligente qui connecte toute votre ecole.',
  floatDistance: 6,
  floatDuration: 3000,
} as const;

export const SCREEN = {
  width: SCREEN_W,
  height: SCREEN_H,
  isSmall: SCREEN_H < 700,
  bottomOffset: Platform.OS === 'ios' ? 110 : 90,
} as const;
