import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    setError('');
    if (!email.trim()) {
      setError(t('errors.required'));
      return;
    }
    if (!email.includes('@')) {
      setError(t('errors.required'));
      return;
    }

    setLoading(true);
    try {
      await api.forgotPassword(email.trim());
      setSent(true);
    } catch (err: any) {
      setError(err.message || t('errors.serverError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.bgOrb1} />
          <View style={styles.bgOrb2} />

          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>

          <View style={styles.centerContent}>
            <View style={styles.iconBox}>
              <Ionicons name="key" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>{t('auth.forgotPassword')}</Text>
            <Text style={styles.subtitle}>
              {t('auth.enterCredentials')}
            </Text>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color={COLORS.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {sent ? (
              <View style={styles.successBox}>
                <View style={styles.successIconBox}>
                  <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
                </View>
                <Text style={styles.successTitle}>{t('success.passwordReset')}</Text>
                <Text style={styles.successText}>
                  {t('success.passwordResetSent') || 'Un email de réinitialisation a été envoyé à votre adresse email.'}
                </Text>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => navigation.navigate('LoginScreen')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitText}>{t('auth.backToLogin')}</Text>
                  <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimary} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>EMAIL</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="name@educi.ci"
                      placeholderTextColor={COLORS.outline}
                      value={email}
                      onChangeText={(text) => { setEmail(text); setError(''); }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.submitButton, loading && styles.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.onPrimary} size="small" />
                  ) : (
                    <>
                      <Text style={styles.submitText}>{t('common.submit')}</Text>
                      <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimary} />
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.backLink}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={18} color={COLORS.primary} />
              <Text style={styles.backLinkText}>{t('auth.backToLogin')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, position: 'relative' },
  bgOrb1: {
    position: 'absolute', bottom: -100, left: -50,
    width: 300, height: 300, backgroundColor: COLORS.primaryFixed,
    borderRadius: 150, opacity: 0.3,
  },
  bgOrb2: {
    position: 'absolute', top: -80, right: -50,
    width: 250, height: 250, backgroundColor: COLORS.secondaryContainer,
    borderRadius: 125, opacity: 0.2,
  },
  backBtn: { paddingHorizontal: 24, paddingTop: 12 },
  centerContent: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  iconBox: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 24, alignSelf: 'center',
  },
  title: {
    fontSize: 28, fontWeight: '800', color: COLORS.onSurface,
    textAlign: 'center', marginBottom: 12,
  },
  subtitle: {
    fontSize: 14, color: COLORS.onSurfaceVariant,
    textAlign: 'center', lineHeight: 22, marginBottom: 32,
    maxWidth: 320, alignSelf: 'center',
  },
  errorBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.errorContainer,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 16, gap: 8,
  },
  errorText: { flex: 1, fontSize: 13, color: COLORS.error, fontWeight: '600' },
  inputGroup: { marginBottom: 24 },
  label: {
    fontSize: 11, fontWeight: '700', color: COLORS.onSurfaceVariant,
    letterSpacing: 1, marginBottom: 8, marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 14, paddingHorizontal: 14, height: 52,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: COLORS.onSurface, paddingVertical: 0 },
  submitButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: COLORS.primary,
    borderRadius: 14, height: 52,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  buttonDisabled: { opacity: 0.7 },
  submitText: { fontSize: 16, fontWeight: '700', color: COLORS.onPrimary },
  successBox: { alignItems: 'center', marginBottom: 24 },
  successIconBox: { marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: '700', color: COLORS.onSurface, marginBottom: 8 },
  successText: {
    fontSize: 14, color: COLORS.onSurfaceVariant,
    textAlign: 'center', lineHeight: 20, marginBottom: 24,
    maxWidth: 300,
  },
  backLink: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 4, marginTop: 24,
  },
  backLinkText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
});
