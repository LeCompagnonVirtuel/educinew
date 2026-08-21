import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
  Animated,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, withAlpha } from '../../constants/colors';

const DEFAULT_HEIGHT = 812;

interface SchoolBranding {
  name: string;
  logo_url?: string;
  primary_color?: string;
  slogan?: string;
}

export default function LoginScreen({ navigation, route }: any) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { height } = useWindowDimensions();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [schoolBranding, setSchoolBranding] = useState<SchoolBranding | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (route?.params?.branding) {
      setSchoolBranding(route.params.branding);
    }
  }, [route?.params?.branding]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const getIdentifierType = (value: string): string => {
    if (/^\+?\d+$/.test(value.trim())) return 'phone';
    if (/^[A-Z]{2,}-[\w]+-\d{4,}$/i.test(value.trim())) return 'matricule';
    if (/^\d{5,}[A-Z]$/i.test(value.trim())) return 'matricule';
    if (value.includes('@')) return 'email';
    return 'id';
  };

  const getIdentifierIcon = (): string => {
    if (!identifier) return 'person-outline';
    const type = getIdentifierType(identifier);
    switch (type) {
      case 'email': return 'mail-outline';
      case 'phone': return 'call-outline';
      case 'matricule': return 'id-card-outline';
      default: return 'person-outline';
    }
  };

  const handleLogin = async () => {
    setError('');
    if (!identifier.trim() || !password) {
      setError('Veuillez renseigner votre identifiant et votre mot de passe.');
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      await login(identifier.trim(), password);
    } catch (err: any) {
      let message = err.message || 'Identifiants incorrects.';
      if (message.includes('401') || message.includes('Invalid login')) {
        message = 'Identifiants incorrects. Vérifiez votre identifiant et mot de passe.';
      } else if (message.includes('Account locked') || message.includes('verrouillé')) {
        message = 'Compte verrouillé. Contactez l\'administration de votre établissement.';
      } else if (message.includes('not activated') || message.includes('non activé')) {
        message = 'Compte non activé. Utilisez votre code d\'invitation pour activer votre compte.';
      } else       if (message.includes('OWNER_BLOCKED')) {
        message = 'Les propriétaires d\'établissement doivent utiliser la plateforme Web pour administrer leur établissement.';
      } else if (message.includes('ADMIN_USE_WEB')) {
        message = 'L\'espace administration est disponible uniquement sur le portail Web educi.live. Utilisez un navigateur pour gérer votre établissement.';
      } else if (message.includes('not allowed on mobile') || message.includes('non autorisé')) {
        message = 'Ce type de compte n\'est pas autorisé sur l\'application mobile.';
      } else if (message.includes('Email not confirmed') || message.includes('pas encore confirmé')) {
        message = 'Votre email n\'est pas encore confirmé. Vérifiez votre boîte de réception.';
      } else if (message.includes('network') || message.includes('Network') || message.includes('fetch')) {
        message = 'Erreur réseau. Vérifiez votre connexion Internet et réessayez.';
      } else if (message.includes('timeout') || message.includes('Timeout') || message.includes('AbortError')) {
        message = 'Le serveur met trop de temps à répondre. Réessayez dans quelques instants.';
      } else if (message.includes('500') || message.includes('502') || message.includes('503')) {
        message = 'Le serveur rencontre un problème temporaire. Réessayez dans quelques instants.';
      } else if (message.includes('Identifiant non reconnu')) {
        message = 'Identifiant non reconnu. Vérifiez votre identifiant ou contactez votre établissement.';
      }
      setError(message);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const brandColor = schoolBranding?.primary_color || COLORS.primary;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.topSection, { opacity: fadeAnim, transform: [{ scale: logoScale }] }]}>
            <View style={styles.bgOrb1} />
            <View style={styles.bgOrb2} />

            {schoolBranding?.logo_url ? (
              <Image source={{ uri: schoolBranding.logo_url }} style={styles.schoolLogo} resizeMode="contain" />
            ) : (
              <View style={styles.logoContainer}>
                <View style={[styles.logoBox, { backgroundColor: brandColor }]}>
                  <Text style={{ fontSize: 32, fontWeight: '900', color: '#FFFFFF' }}>E</Text>
                </View>
              </View>
            )}

            {schoolBranding ? (
              <>
                <Text style={styles.schoolName}>{schoolBranding.name}</Text>
                {schoolBranding.slogan && (
                  <Text style={styles.schoolSlogan}>{schoolBranding.slogan}</Text>
                )}
              </>
            ) : (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.brandTitle, { color: '#1E3A5F' }]}>Edu</Text>
                  <Text style={[styles.brandTitle, { color: '#FF8A00' }]}>CI</Text>
                </View>
                <Text style={styles.brandSubtitle}>Espace des membres</Text>
              </>
            )}
          </Animated.View>

          <Animated.View
            style={[
              styles.formCard,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { translateX: shakeAnim },
                ],
              },
            ]}
          >
            <Text style={styles.formTitle}>Connexion à votre espace</Text>
            <Text style={styles.formSubtitle}>
              Réservé aux élèves, parents, enseignants et au personnel des établissements partenaires.
            </Text>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color={COLORS.error} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => setError('')} style={styles.errorClose}>
                  <Ionicons name="close" size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>IDENTIFIANT</Text>
              <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                <Ionicons
                  name={getIdentifierIcon() as any}
                  size={20}
                  color={COLORS.outline}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail, matricule, téléphone ou identifiant"
                  placeholderTextColor={COLORS.outline}
                  value={identifier}
                  onChangeText={(text) => { setIdentifier(text); setError(''); }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
                {identifier.length > 0 && (
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>
                      {getIdentifierType(identifier) === 'email' ? 'Email' :
                       getIdentifierType(identifier) === 'phone' ? 'Tél' :
                       getIdentifierType(identifier) === 'matricule' ? 'ID' : ''}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.inputHint}>Identifiant fourni par votre établissement</Text>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.inputLabel}>MOT DE PASSE</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <Text style={styles.forgotLink}>Mot de passe oublié ?</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Votre mot de passe"
                  placeholderTextColor={COLORS.outline}
                  value={password}
                  onChangeText={(text) => { setPassword(text); setError(''); }}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.outline}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled, { backgroundColor: brandColor }]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.onPrimary} size="small" />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Se connecter</Text>
                  <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimary} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.securityNote}>
              <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.success} />
              <Text style={styles.securityNoteText}>Connexion sécurisée</Text>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => navigation.navigate('QRLogin')}
              activeOpacity={0.8}
            >
              <Ionicons name="qr-code-outline" size={20} color={brandColor} />
              <Text style={[styles.qrButtonText, { color: brandColor }]}>Scanner mon QR Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.activateButton}
              onPress={() => navigation.navigate('ActivateAccount')}
              activeOpacity={0.8}
            >
              <Ionicons name="key-outline" size={18} color={COLORS.primary} />
              <Text style={styles.activateButtonText}>Activer mon compte</Text>
            </TouchableOpacity>

          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>EduCI v1.0.0</Text>
            <Text style={styles.footerSubtext}>Application réservée aux membres des établissements</Text>
          </View>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: DEFAULT_HEIGHT * 0.04,
    paddingBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  bgOrb1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 250,
    height: 250,
    backgroundColor: COLORS.primaryFixed,
    borderRadius: 125,
    opacity: 0.35,
  },
  bgOrb2: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 180,
    height: 180,
    backgroundColor: COLORS.secondaryContainer,
    borderRadius: 90,
    opacity: 0.2,
  },
  logoContainer: {
    marginBottom: 12,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  schoolLogo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: 4,
  },
  schoolSlogan: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  formCard: {
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
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginBottom: 20,
    lineHeight: 19,
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
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 4,
  },
  forgotLink: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
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
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: withAlpha(COLORS.error, 0.08),
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
  typeBadge: {
    backgroundColor: COLORS.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  inputHint: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 6,
    marginLeft: 4,
    opacity: 0.7,
  },
  loginButton: {
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
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    justifyContent: 'center',
  },
  securityNoteText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.outlineVariant,
  },
  dividerText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.primaryFixed,
    borderRadius: 14,
    height: 48,
    marginBottom: 10,
  },
  qrButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    height: 48,
    borderWidth: 1.5,
    borderColor: COLORS.outlineVariant,
    backgroundColor: 'transparent',
  },
  activateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
    opacity: 0.6,
    textAlign: 'center',
  },
});
