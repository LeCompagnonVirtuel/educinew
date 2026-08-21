import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { api } from '../../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function ActivateAccountScreen({ navigation, route }: any) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [step, setStep] = useState<'token' | 'details'>('token');
  const [invitationToken, setInvitationToken] = useState(route?.params?.token || '');
  const [schoolCode, setSchoolCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleValidateToken = async () => {
    setError('');
    if (!invitationToken.trim()) {
      setError(t('errors.required'));
      return;
    }

    setLoading(true);
    try {
      const invitation = await api.validateInvitation(invitationToken.trim());
      if (invitation?.email) setEmail(invitation.email);
      if (invitation?.role) setName(invitation.role);
      setStep('details');
    } catch (err: any) {
      const message = err?.message || t('errors.invalidCredentials');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    setError('');
    if (!password || !confirmPassword) {
      setError(t('errors.required'));
      return;
    }
    const validatePassword = (pwd: string): string | null => {
      if (pwd.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
      if (!/[A-Z]/.test(pwd)) return 'Le mot de passe doit contenir au moins une majuscule';
      if (!/[a-z]/.test(pwd)) return 'Le mot de passe doit contenir au moins une minuscule';
      if (!/[0-9]/.test(pwd)) return 'Le mot de passe doit contenir au moins un chiffre';
      return null;
    };
    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }
    if (password !== confirmPassword) {
      setError(t('errors.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      await api.activateAccount({
        token: invitationToken.trim(),
        email: email || undefined,
        password,
        name: name.trim() || undefined,
        schoolCode: schoolCode.trim() || undefined,
      });
      Alert.alert(
        t('success.accountActivated'),
        t('success.accountActivated'),
        [{ text: t('auth.signIn'), onPress: () => navigation.replace('LoginScreen') }]
      );
    } catch (err: any) {
      let message = err.message || t('errors.serverError');
      if (message.includes('Invalid school code')) {
        message = t('errors.invalidCredentials');
      } else if (message.includes('already activated')) {
        message = t('errors.accountNotActivated');
      }
      setError(message);
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={styles.backBtn} onPress={() => {
              if (step === 'details') {
                setStep('token');
              } else {
                navigation.goBack();
              }
            }}>
              <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
            </TouchableOpacity>

            <View style={styles.bgOrb} />
            <View style={styles.iconBox}>
              <Ionicons name="key" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>
              {step === 'token' ? t('auth.invitationCode') : t('auth.activateAccount')}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'token'
                ? t('auth.secureAccess')
                : t('auth.enterCredentials')}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color={COLORS.error} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => setError('')} style={styles.errorClose}>
                  <Ionicons name="close" size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ) : null}

            {step === 'token' ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{t('auth.invitationCode').toUpperCase()}</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="ticket-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="inv_xxxxxxxxxxxxxxxx"
                      placeholderTextColor={COLORS.outline}
                      value={invitationToken}
                      onChangeText={(text) => { setInvitationToken(text); setError(''); }}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{t('auth.schoolCode').toUpperCase()}</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="business-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="EDUCI-CI-ABJ-COC-1234"
                      placeholderTextColor={COLORS.outline}
                      value={schoolCode}
                      onChangeText={setSchoolCode}
                      autoCapitalize="characters"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.primaryButton, loading && styles.buttonDisabled]}
                  onPress={handleValidateToken}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.onPrimary} />
                  ) : (
                    <>
                      <Text style={styles.primaryButtonText}>{t('common.next')}</Text>
                      <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimary} />
                    </>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NOM COMPLET</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Jean-Pierre Konan"
                      placeholderTextColor={COLORS.outline}
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{t('auth.password').toUpperCase()}</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor={COLORS.outline}
                      value={password}
                      onChangeText={(text) => { setPassword(text); setError(''); }}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.outline} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CONFIRMER LE MOT DE PASSE</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor={COLORS.outline}
                      value={confirmPassword}
                      onChangeText={(text) => { setConfirmPassword(text); setError(''); }}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.outline} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.primaryButton, loading && styles.buttonDisabled]}
                  onPress={handleActivate}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.onPrimary} />
                  ) : (
                    <>
                      <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.onPrimary} />
                      <Text style={styles.primaryButtonText}>{t('auth.activateAccount')}</Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}

            <View style={styles.securityNote}>
              <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.success} />
              <Text style={styles.securityNoteText}>
                {t('auth.secureAccess')}
              </Text>
            </View>
          </Animated.View>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.loginLinkText}>{t('auth.backToLogin')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  bgOrb: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 250,
    height: 250,
    backgroundColor: COLORS.primaryFixed,
    borderRadius: 125,
    opacity: 0.25,
  },
  backBtn: {
    marginBottom: 16,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
    maxWidth: 320,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.errorContainer,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.error,
    fontWeight: '600',
  },
  errorClose: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.onSurface,
    paddingVertical: 0,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 52,
    gap: 8,
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    justifyContent: 'center',
  },
  securityNoteText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 12,
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
