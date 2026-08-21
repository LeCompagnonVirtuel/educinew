import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  FlatList, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator,
  Platform, useWindowDimensions, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { haptics } from '../../utils/haptics';
import { supabase } from '../../services/supabase';

const ONBOARDING_KEY = '@educi_onboarding_seen';
const INVITATION_KEY = '@educi_pending_invitation';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ── Button state machine ────────────────────────────────────
type ButtonPhase = 'idle' | 'checking' | 'navigating' | 'success' | 'error';
type LastAction = 'start' | 'login' | null;

const PHASE_LABELS: Record<ButtonPhase, string> = {
  idle: '',
  checking: 'Vérification...',
  navigating: 'Redirection...',
  success: 'Prêt',
  error: '',
};

const DASHBOARD_MAP: Record<string, string> = {
  STUDENT: 'Home',
  PARENT: 'ParentDashboard',
  TEACHER: 'TeacherDashboard',
  ADMIN: 'AdminDashboard',
  COMPTABLE: 'ComptableDashboard',
  SECRETAIRE: 'SurveillantDashboard',
  CENSEUR: 'SurveillantDashboard',
  SURVEILLANT: 'SurveillantDashboard',
  CHAUFFEUR: 'DriverHome',
  DRIVER: 'DriverHome',
};

// ── Connectivity helpers ────────────────────────────────────
async function checkInternet(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch('https://clients3.google.com/generate_204', {
      method: 'HEAD',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res.status === 204 || res.ok;
  } catch {
    return false;
  }
}

async function checkSupabaseHealth(): Promise<{ ok: boolean; error?: string }> {
  // Try multiple health check strategies
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return { ok: false, error: 'Configuration manquante. Vérifiez les variables d\'environnement.' };
  }

  // Strategy 1: Direct REST API health check (no RLS)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok || res.status === 401 || res.status === 404) {
      // Server is responding (even auth errors mean server is up)
      return { ok: true };
    }
    return { ok: false, error: `Serveur inaccessible (HTTP ${res.status}). Réessayez.` };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { ok: false, error: 'Le serveur met trop de temps à répondre. Vérifiez votre connexion.' };
    }
  }

  // Strategy 2: Auth health check
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${url}/auth/v1/health`, {
      method: 'GET',
      headers: { 'apikey': key },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) return { ok: true };
  } catch {}

  // Strategy 3: Supabase client check (with timeout via Promise.race)
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 6000)
    );
    const checkPromise = supabase.rpc('resolve_login_identifier', { p_identifier: '__health_check__' });
    const { error } = await Promise.race([checkPromise, timeoutPromise]);
    if (!error || error.code === 'PGRST116' || error.message?.includes('not found')) {
      return { ok: true };
    }
    return { ok: true };
  } catch {}

  return { ok: false, error: 'Le serveur est temporairement indisponible. Réessayez dans quelques instants.' };
}

interface Slide {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: [string, string];
  title: string;
  subtitle: string;
  badges: { icon: keyof typeof Ionicons.glyphMap; label: string; color: string }[];
}

const slides: Slide[] = [
  {
    id: '1',
    icon: 'school',
    iconBg: ['#4F46E5', '#6366F1'],
    title: 'Bienvenue dans EduCI',
    subtitle: 'La plateforme qui connecte établissements, enseignants, élèves et parents en temps réel.',
    badges: [
      { icon: 'people', label: 'Multi-acteurs', color: '#4F46E5' },
      { icon: 'globe', label: 'Temps réel', color: '#06B6D4' },
      { icon: 'shield-checkmark', label: 'Sécurisé', color: '#10B981' },
    ],
  },
  {
    id: '2',
    icon: 'layers',
    iconBg: ['#7C3AED', '#A855F7'],
    title: 'Une gestion scolaire simplifiée',
    subtitle: 'Présences, notes, bulletins, emplois du temps et communication centralisés sur une seule plateforme.',
    badges: [
      { icon: 'document-text', label: 'Bulletins', color: '#7C3AED' },
      { icon: 'calculator', label: 'Notes', color: '#F59E0B' },
      { icon: 'calendar', label: 'Planning', color: '#06B6D4' },
    ],
  },
  {
    id: '3',
    icon: 'qr-code',
    iconBg: ['#059669', '#10B981'],
    title: 'Pointages intelligents',
    subtitle: 'QR Code pour les élèves et géolocalisation temps réel pour les enseignants.',
    badges: [
      { icon: 'scan', label: 'QR Code', color: '#059669' },
      { icon: 'location', label: 'GPS', color: '#0284C7' },
      { icon: 'time', label: 'Instantané', color: '#7C3AED' },
    ],
  },
  {
    id: '4',
    icon: 'wallet',
    iconBg: ['#D97706', '#F59E0B'],
    title: 'Paiements sécurisés',
    subtitle: 'Payez les frais scolaires directement depuis votre téléphone et recevez vos reçus automatiquement.',
    badges: [
      { icon: 'phone-portrait', label: 'Mobile Money', color: '#D97706' },
      { icon: 'receipt', label: 'Reçus PDF', color: '#4F46E5' },
      { icon: 'notifications', label: 'Relances', color: '#EF4444' },
    ],
  },
  {
    id: '5',
    icon: 'sparkles',
    iconBg: ['#4F46E5', '#8B5CF6'],
    title: 'EduCI AI',
    subtitle: "Une intelligence artificielle intégrée pour accompagner les enseignants, les élèves et les établissements.",
    badges: [
      { icon: 'bulb', label: 'Quiz IA', color: '#8B5CF6' },
      { icon: 'analytics', label: 'Analyse', color: '#06B6D4' },
      { icon: 'book', label: 'Révisions', color: '#059669' },
    ],
  },
  {
    id: '6',
    icon: 'rocket',
    iconBg: ['#4F46E5', '#06B6D4'],
    title: 'Prêt à vous connecter ?',
    subtitle: 'Connectez-vous avec les identifiants fournis par votre établissement.',
    badges: [
      { icon: 'shield-checkmark', label: 'Sécurisé', color: '#10B981' },
      { icon: 'flash', label: 'Instantané', color: '#F59E0B' },
      { icon: 'people', label: 'Collaboratif', color: '#EF4444' },
    ],
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const { user, token, isTokenExpired } = useAuth();
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // ── Button state ────────────────────────────────────────
  const [phase, setPhase] = useState<ButtonPhase>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<LastAction>(null);
  const isNavigatingRef = useRef(false);
  const isBusy = phase === 'checking' || phase === 'navigating';

  // ── Button press animations ─────────────────────────────
  const startBtnScale = useRef(new Animated.Value(1)).current;
  const startBtnOpacity = useRef(new Animated.Value(1)).current;
  const loginBtnScale = useRef(new Animated.Value(1)).current;
  const loginBtnOpacity = useRef(new Animated.Value(1)).current;
  const errorOpacity = useRef(new Animated.Value(0)).current;

  const isLast = activeIndex === slides.length - 1;

  // ── Auto-redirect if already logged in ──────────────────
  useEffect(() => {
    if (user && token && !isTokenExpired()) {
      const screen = DASHBOARD_MAP[user.role?.toUpperCase() || ''] || 'Home';
      navigation.replace(screen);
    }
  }, [user, token]);

  // ── Animate error in/out ────────────────────────────────
  const showError = useCallback((msg: string) => {
    setErrorMessage(msg);
    setPhase('error');
    haptics.error();
    Animated.timing(errorOpacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  }, []);

  const clearError = useCallback(() => {
    Animated.timing(errorOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setErrorMessage(null);
      setPhase('idle');
    });
  }, []);

  // ── Press animation ─────────────────────────────────────
  function animatePress(scale: Animated.Value, opacity: Animated.Value) {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, speed: 50 }),
        Animated.timing(opacity, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }),
        Animated.timing(opacity, { toValue: 1, duration: 80, useNativeDriver: true }),
      ]),
    ]).start();
  }

  // ── Safe navigate (prevents double navigation) ──────────
  function safeNavigate(method: 'replace' | 'navigate', screen: string) {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    setPhase('navigating');
    haptics.success();

    // Small delay for visual feedback before transition
    setTimeout(() => {
      try {
        if (method === 'replace') {
          navigation.replace(screen);
        } else {
          navigation.navigate(screen);
        }
      } catch (err) {
        console.error('[Onboarding] Navigation error:', err);
        isNavigatingRef.current = false;
        showError('Erreur de navigation. Réessayez.');
      }
    }, 150);
  }

  // ── Pre-flight checks ───────────────────────────────────
  async function runPreflight(): Promise<{ ok: boolean }> {
    // 1. Internet
    const online = await checkInternet();
    if (!online) {
      showError('Pas de connexion Internet. Vérifiez votre réseau et réessayez.');
      return { ok: false };
    }

    // 2. Supabase backend
    const health = await checkSupabaseHealth();
    if (!health.ok) {
      showError(health.error || 'Le serveur est temporairement indisponible. Réessayez dans quelques instants.');
      return { ok: false };
    }

    return { ok: true };
  }

  // ── BUTTON: "Commencer" ─────────────────────────────────
  const handleStart = useCallback(async () => {
    if (isBusy || isNavigatingRef.current) return;

    haptics.medium();
    animatePress(startBtnScale, startBtnOpacity);
    clearError();
    setLastAction('start');
    setPhase('checking');

    try {
      // Pre-flight
      const { ok } = await runPreflight();
      if (!ok) return;

      // Check existing valid session
      if (user && token && !isTokenExpired()) {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        const screen = DASHBOARD_MAP[user.role?.toUpperCase() || ''] || 'Home';
        safeNavigate('replace', screen);
        return;
      }

      // First-time user: mark onboarding done, go to Activate Account
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      safeNavigate('replace', 'ActivateAccount');
    } catch (err: any) {
      console.error('[Onboarding] handleStart error:', err);
      const msg = err?.message?.includes('network')
        ? 'Erreur réseau. Vérifiez votre connexion.'
        : 'Une erreur inattendue est survenue. Réessayez.';
      showError(msg);
    }
  }, [phase, user, token]);

  // ── BUTTON: "Se connecter" ──────────────────────────────
  const handleLogin = useCallback(async () => {
    if (isBusy || isNavigatingRef.current) return;

    haptics.light();
    animatePress(loginBtnScale, loginBtnOpacity);
    clearError();
    setLastAction('login');
    setPhase('checking');

    try {
      // Pre-flight
      const { ok } = await runPreflight();
      if (!ok) return;

      // Mark onboarding as seen and go directly to login
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      safeNavigate('replace', 'LoginScreen');
    } catch (err: any) {
      console.error('[Onboarding] handleLogin error:', err);
      showError('Impossible d\'accéder à la page de connexion. Réessayez.');
    }
  }, [phase]);

  // ── RETRY handler ───────────────────────────────────────
  const handleRetry = useCallback(() => {
    haptics.light();
    isNavigatingRef.current = false;
    if (lastAction === 'start') {
      handleStart();
    } else if (lastAction === 'login') {
      handleLogin();
    } else {
      clearError();
    }
  }, [lastAction, handleStart, handleLogin]);

  // ── Navigation helpers (skip, next, back) ───────────────
  function handleNext() {
    haptics.selection();
    if (isLast) {
      handleStart();
    } else {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    }
  }

  function handleBack() {
    haptics.selection();
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: activeIndex - 1, animated: true });
    }
  }

  async function handleSkip() {
    if (isBusy || isNavigatingRef.current) return;
    haptics.light();
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    safeNavigate('replace', 'LoginScreen');
  }

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    if (idx !== activeIndex) setActiveIndex(idx);
  }

  function renderSlide({ item, index }: { item: Slide; index: number }) {
    return (
      <View style={[styles.slide, { width }]}>
        {/* Illustration area */}
        <View style={styles.illustrationArea}>
          {/* Background shapes */}
          <View style={[styles.shapeBg, { backgroundColor: item.iconBg[0] + '10', width: width * 0.7, height: width * 0.7, borderRadius: width * 0.35 }]} />
          <View style={[styles.shapeRing, { borderColor: item.iconBg[0] + '20', width: width * 0.55, height: width * 0.55, borderRadius: width * 0.275 }]} />

          {/* Main icon */}
          <LinearGradient colors={item.iconBg} style={styles.iconCircle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Ionicons name={item.icon} size={48} color="#FFFFFF" />
          </LinearGradient>

          {/* Feature badges */}
          <View style={styles.badgesRow}>
            {item.badges.map((badge, i) => (
              <View key={i} style={styles.badge}>
                <View style={[styles.badgeIcon, { backgroundColor: badge.color + '15' }]}>
                  <Ionicons name={badge.icon} size={16} color={badge.color} />
                </View>
                <Text style={styles.badgeLabel}>{badge.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Text content */}
        <View style={styles.textArea}>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
        </View>

        {/* Last slide: extra buttons */}
        {index === slides.length - 1 && (
          <View style={styles.lastSlideActions}>
            {/* Error banner */}
            {phase === 'error' && errorMessage && (
              <Animated.View style={[styles.errorBanner, { opacity: errorOpacity }]}>
                <View style={styles.errorContent}>
                  <Ionicons name="alert-circle" size={18} color="#EF4444" />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={handleRetry}
                  activeOpacity={0.7}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel="Réessayer"
                >
                  <Ionicons name="refresh" size={14} color="#4F46E5" />
                  <Text style={styles.retryText}>Réessayer</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* Primary: Commencer */}
            <Animated.View style={{ transform: [{ scale: startBtnScale }], opacity: startBtnOpacity }}>
              <TouchableOpacity
                style={[styles.primaryBtn, isBusy && styles.btnDisabled]}
                onPress={handleStart}
                disabled={isBusy}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Commencer"
                accessibilityHint="Vérifie votre session et vous redirige"
                accessibilityState={{ disabled: isBusy, busy: phase === 'checking' }}
              >
                {phase === 'checking' && lastAction === 'start' ? (
                  <View style={styles.btnLoadingRow}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.primaryBtnText}>{PHASE_LABELS.checking}</Text>
                  </View>
                ) : phase === 'navigating' && lastAction === 'start' ? (
                  <View style={styles.btnLoadingRow}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.primaryBtnText}>{PHASE_LABELS.navigating}</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.primaryBtnText}>Commencer</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Secondary: Se connecter */}
            <Animated.View style={{ transform: [{ scale: loginBtnScale }], opacity: loginBtnOpacity }}>
              <TouchableOpacity
                style={[styles.secondaryBtn, isBusy && styles.btnDisabled]}
                onPress={handleLogin}
                disabled={isBusy}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Se connecter"
                accessibilityHint="Ouvre la page de connexion"
                accessibilityState={{ disabled: isBusy, busy: phase === 'checking' }}
              >
                {phase === 'checking' && lastAction === 'login' ? (
                  <View style={styles.btnLoadingRow}>
                    <ActivityIndicator size="small" color="#475569" />
                    <Text style={styles.secondaryBtnText}>{PHASE_LABELS.checking}</Text>
                  </View>
                ) : phase === 'navigating' && lastAction === 'login' ? (
                  <View style={styles.btnLoadingRow}>
                    <ActivityIndicator size="small" color="#475569" />
                    <Text style={styles.secondaryBtnText}>{PHASE_LABELS.navigating}</Text>
                  </View>
                ) : (
                  <Text style={styles.secondaryBtnText}>Se connecter</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandDot} />
          <Text style={styles.brandText}>EduCI</Text>
        </View>
        {!isLast && (
          <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, listener: onScroll })}
        scrollEventThrottle={16}
        bounces={false}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
      />

      {/* Bottom navigation */}
      {!isLast && (
        <View style={styles.bottomNav}>
          {/* Pagination */}
          <View style={styles.pagination}>
            {slides.map((_, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
              const dotWidth = scrollX.interpolate({ inputRange, outputRange: [8, 28, 8], extrapolate: 'clamp' });
              const dotOpacity = scrollX.interpolate({ inputRange, outputRange: [0.3, 1, 0.3], extrapolate: 'clamp' });
              return (
                <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity: dotOpacity, backgroundColor: '#4F46E5' }]} />
              );
            })}
          </View>

          {/* Nav buttons */}
          <View style={styles.navButtons}>
            {activeIndex > 0 && (
              <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                <Ionicons name="arrow-back" size={20} color="#64748B" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>Suivant</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 56, paddingBottom: 8, zIndex: 10 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4F46E5' },
  brandText: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  skipText: { fontSize: 14, fontWeight: '600', color: '#94A3B8' },
  slide: { paddingHorizontal: 24, justifyContent: 'center', paddingTop: 20 },
  illustrationArea: { alignItems: 'center', marginBottom: 40, position: 'relative', height: SCREEN_HEIGHT * 0.32 },
  shapeBg: { position: 'absolute', top: '5%' },
  shapeRing: { position: 'absolute', top: '12%', borderWidth: 2 },
  iconCircle: { width: 110, height: 110, borderRadius: 55, justifyContent: 'center', alignItems: 'center', marginTop: SCREEN_HEIGHT * 0.06, shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 24, elevation: 12 },
  badgesRow: { flexDirection: 'row', gap: 12, marginTop: 32 },
  badge: { alignItems: 'center', gap: 6 },
  badgeIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  badgeLabel: { fontSize: 11, fontWeight: '600', color: '#475569' },
  textArea: { alignItems: 'center', paddingHorizontal: 12 },
  slideTitle: { fontSize: 28, fontWeight: '800', color: '#1E293B', textAlign: 'center', marginBottom: 12, lineHeight: 34 },
  slideSubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', lineHeight: 22, maxWidth: 320 },
  lastSlideActions: { marginTop: 32, gap: 12 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#4F46E5', paddingVertical: 16, borderRadius: 16, minHeight: 54, shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  secondaryBtn: { alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 16, borderWidth: 1.5, borderColor: '#E2E8F0', minHeight: 50 },
  secondaryBtnText: { fontSize: 15, fontWeight: '600', color: '#475569' },
  btnDisabled: { opacity: 0.6 },
  btnLoadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  errorBanner: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  errorContent: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  errorText: { fontSize: 13, fontWeight: '500', color: '#991B1B', flex: 1, lineHeight: 18 },
  retryBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#EEF2FF' },
  retryText: { fontSize: 13, fontWeight: '600', color: '#4F46E5' },
  bottomNav: { paddingHorizontal: 24, paddingBottom: 48, gap: 20 },
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { height: 6, borderRadius: 3 },
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  nextBtn: { flex: 1, marginLeft: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#4F46E5', paddingVertical: 16, borderRadius: 16, shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 6 },
  nextBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});
