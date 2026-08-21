import { Platform } from 'react-native';
import { COLORS, withAlpha } from './colors';

export const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
} as const;

export const FONT_WEIGHTS = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: Platform.select({
    ios: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
  }),
  xl: Platform.select({
    ios: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
    default: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
  }),
} as const;

export const ANIMATION = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export const BREAKPOINTS = {
  sm: 320,
  md: 375,
  lg: 414,
  xl: 768,
  xxl: 1024,
} as const;

export const OPACITY = {
  disabled: 0.5,
  pressed: 0.7,
  hover: 0.8,
  focused: 0.9,
  subtle: 0.1,
  light: 0.3,
  medium: 0.5,
  strong: 0.7,
} as const;

export const SEMANTIC_COLORS = {
  success: {
    main: COLORS.success,
    light: '#dcfce7',
    dark: '#166534',
    surface: '#f0fdf4',
    border: '#bbf7d0',
    text: '#166534',
  },
  warning: {
    main: COLORS.warning,
    light: '#fef3c7',
    dark: '#92400e',
    surface: '#fffbeb',
    border: '#fde68a',
    text: '#92400e',
  },
  error: {
    main: COLORS.error,
    light: COLORS.errorContainer,
    dark: '#7f1d1d',
    surface: '#fef2f2',
    border: '#fecaca',
    text: '#7f1d1d',
  },
  info: {
    main: COLORS.secondary,
    light: '#dbeafe',
    dark: '#1e3a5f',
    surface: '#eff6ff',
    border: '#bfdbfe',
    text: '#1e3a5f',
  },
  neutral: {
    main: COLORS.outline,
    light: '#f3f4f6',
    dark: '#374151',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: '#374151',
  },
} as const;

export const NEUTRALS = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712',
} as const;

export const BACKGROUNDS = {
  primary: COLORS.background,
  secondary: COLORS.surfaceContainerLow,
  tertiary: COLORS.surfaceContainer,
  elevated: COLORS.surfaceContainerLowest,
  card: COLORS.white,
  overlay: withAlpha(COLORS.black, 0.5),
  shimmer: withAlpha(COLORS.white, 0.3),
  skeleton: COLORS.surfaceContainer,
} as const;

export const TYPOGRAPHY = {
  h1: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES.xxxl * LINE_HEIGHTS.tight,
    color: COLORS.text,
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES.xxl * LINE_HEIGHTS.tight,
    color: COLORS.text,
  },
  h3: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.tight,
    color: COLORS.text,
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.normal,
    color: COLORS.text,
  },
  body: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,
    color: COLORS.text,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    color: COLORS.text,
  },
  caption: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,
    color: COLORS.textSecondary,
  },
  button: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.tight,
    color: COLORS.white,
  },
  label: {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
    color: COLORS.textSecondary,
  },
} as const;
