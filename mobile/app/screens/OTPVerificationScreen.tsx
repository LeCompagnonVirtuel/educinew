import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../../constants/theme';
import { useLanguage } from '../context/LanguageContext';

const RESEND_DELAY = 60;
const API_BASE = process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_SITE_URL || 'https://educi.live';

type ScreenStatus = 'pending' | 'sending' | 'sent' | 'error';

export default function EmailVerificationScreen({ navigation, route }: any) {
  const { t } = useLanguage();
  const email = route?.params?.email || '';

  const [status, setStatus] = useState<ScreenStatus>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResend = async () => {
    if (!email || resendCooldown > 0) return;
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/resend-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok && data.success !== false) {
        setStatus('sent');
        setResendCooldown(RESEND_DELAY);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Erreur lors de l\'envoi.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Erreur de connexion.');
    }
  };

  const handleOpenEmail = () => {
    Linking.openURL('mailto:');
  };

  const handleBackToLogin = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="mail-outline" size={48} color={COLORS.primary} />
          </View>
          <View style={styles.badgeCircle}>
            <Ionicons name="checkmark" size={16} color={COLORS.white} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Vérifiez votre e-mail</Text>
        <Text style={styles.subtitle}>
          Nous avons envoyé un lien de confirmation à
        </Text>
        {email ? <Text style={styles.email}>{email}</Text> : null}
        <Text style={styles.description}>
          Cliquez sur le bouton dans l'e-mail pour activer votre compte et votre établissement.
        </Text>

        {/* Status messages */}
        {status === 'sent' && (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={18} color="#059669" />
            <Text style={styles.successText}>Lien renvoyé avec succès !</Text>
          </View>
        )}
        {status === 'error' && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={18} color="#DC2626" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          {/* Open email app */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleOpenEmail} activeOpacity={0.8}>
            <Ionicons name="mail" size={18} color={COLORS.white} />
            <Text style={styles.primaryButtonText}>Ouvrir l'application e-mail</Text>
          </TouchableOpacity>

          {/* Resend */}
          <TouchableOpacity
            style={[styles.secondaryButton, (resendCooldown > 0 || status === 'sending') && styles.buttonDisabled]}
            onPress={handleResend}
            disabled={resendCooldown > 0 || status === 'sending'}
            activeOpacity={0.8}
          >
            {status === 'sending' ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Ionicons name="refresh" size={18} color={COLORS.primary} />
            )}
            <Text style={styles.secondaryButtonText}>
              {resendCooldown > 0 ? `Renvoyer dans ${resendCooldown}s` : 'Renvoyer le lien'}
            </Text>
          </TouchableOpacity>

          {/* Back to login */}
          <TouchableOpacity style={styles.tertiaryButton} onPress={handleBackToLogin} activeOpacity={0.8}>
            <Text style={styles.tertiaryButtonText}>Retour à la connexion</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={16} color="#6B7280" />
          <Text style={styles.infoText}>
            Le lien expire dans 24 heures. Vérifiez aussi votre dossier spam.
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: withAlpha(COLORS.primary, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: withAlpha(COLORS.primary, 0.2),
  },
  badgeCircle: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.extrabold,
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 4,
  },
  email: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: BORDER_RADIUS.lg,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  successText: {
    fontSize: FONT_SIZES.sm,
    color: '#059669',
    fontWeight: FONT_WEIGHTS.medium,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: BORDER_RADIUS.lg,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: '#DC2626',
    fontWeight: FONT_WEIGHTS.medium,
    flex: 1,
  },
  actions: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS.xl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  tertiaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  tertiaryButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    fontWeight: FONT_WEIGHTS.medium,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: BORDER_RADIUS.lg,
    padding: 16,
    width: '100%',
  },
  infoText: {
    fontSize: FONT_SIZES.xs,
    color: '#6B7280',
    lineHeight: 18,
    flex: 1,
  },
});
