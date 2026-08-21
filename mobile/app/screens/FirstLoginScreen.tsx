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
  ActivityIndicator,
  Animated,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { api } from '../../services/api';
import { useAuth } from '../context/AuthContext';

type Step = 'identity' | 'password' | 'terms' | 'profile';

export default function FirstLoginScreen({ navigation, route }: any) {
  const { user, logout } = useAuth();
  const [step, setStep] = useState<Step>('identity');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Identity verification
  const [verificationCode, setVerificationCode] = useState('');

  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Terms
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Profile completion
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [step]);

  const passwordStrength = (): { level: number; label: string; color: string } => {
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.length >= 12) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 2) return { level: score, label: 'Faible', color: COLORS.error };
    if (score <= 3) return { level: score, label: 'Moyen', color: COLORS.warning };
    if (score <= 4) return { level: score, label: 'Bon', color: '#22C55E' };
    return { level: score, label: 'Excellent', color: '#16A34A' };
  };

  const handleVerifyIdentity = async () => {
    setError('');
    setStep('password');
  };

  const handleChangePassword = async () => {
    setError('');
    if (!newPassword || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins une majuscule.');
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins une minuscule.');
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setError('Le mot de passe doit contenir au moins un chiffre.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      await api.changePassword(route?.params?.tempPassword || '', newPassword);
      setStep('terms');
    } catch (err: any) {
      setError(err.message || 'Impossible de modifier le mot de passe.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTerms = () => {
    if (!acceptedTerms) {
      setError('Vous devez accepter les conditions d\'utilisation.');
      return;
    }
    setError('');
    setStep('profile');
  };

  const handleCompleteProfile = async () => {
    setLoading(true);
    setError('');
    try {
      await api.completeFirstLogin({
        phone: phone.trim() || undefined,
        emergency_contact: emergencyContact.trim() || undefined,
        first_login_completed: true,
      });
      navigation.replace('Main');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la finalisation.');
    } finally {
      setLoading(false);
    }
  };

  const getStepNumber = (): number => {
    switch (step) {
      case 'identity': return 1;
      case 'password': return 2;
      case 'terms': return 3;
      case 'profile': return 4;
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4].map((s) => (
        <View
          key={s}
          style={[
            styles.progressDot,
            s <= getStepNumber() && styles.progressDotActive,
            s === getStepNumber() && styles.progressDotCurrent,
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons
                name={
                  step === 'identity' ? 'finger-print' :
                  step === 'password' ? 'lock-closed' :
                  step === 'terms' ? 'document-text' : 'person'
                }
                size={28}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.title}>
              {step === 'identity' && 'Vérification d\'identité'}
              {step === 'password' && 'Nouveau mot de passe'}
              {step === 'terms' && 'Conditions d\'utilisation'}
              {step === 'profile' && 'Compléter votre profil'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'identity' && 'Confirmez votre identité pour activer votre compte.'}
              {step === 'password' && 'Choisissez un mot de passe sécurisé pour votre compte.'}
              {step === 'terms' && 'Veuillez lire et accepter les conditions d\'utilisation.'}
              {step === 'profile' && 'Complétez les informations manquantes de votre profil.'}
            </Text>
            {renderProgressBar()}
          </View>

          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color={COLORS.error} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => setError('')}>
                  <Ionicons name="close" size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ) : null}

            {step === 'identity' && (
              <>
                <View style={styles.infoBox}>
                  <Ionicons name="information-circle" size={18} color={COLORS.primary} />
                  <Text style={styles.infoText}>
                    Bienvenue {user?.name || ''}. C'est votre première connexion.
                    Veuillez confirmer vos informations pour sécuriser votre compte.
                  </Text>
                </View>

                <View style={styles.identityCard}>
                  <Text style={styles.identityLabel}>Nom</Text>
                  <Text style={styles.identityValue}>{user?.name || '-'}</Text>
                  <Text style={styles.identityLabel}>Email</Text>
                  <Text style={styles.identityValue}>{user?.email || '-'}</Text>
                  <Text style={styles.identityLabel}>Rôle</Text>
                  <Text style={styles.identityValue}>{user?.role || '-'}</Text>
                  <Text style={styles.identityLabel}>Établissement</Text>
                  <Text style={styles.identityValue}>{user?.school?.name || '-'}</Text>
                </View>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleVerifyIdentity}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Confirmer mon identité</Text>
                  <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimary} />
                </TouchableOpacity>
              </>
            )}

            {step === 'password' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>NOUVEAU MOT DE PASSE</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Min. 8 caractères"
                      placeholderTextColor={COLORS.outline}
                      value={newPassword}
                      onChangeText={(t) => { setNewPassword(t); setError(''); }}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.outline} />
                    </TouchableOpacity>
                  </View>
                  {newPassword.length > 0 && (
                    <View style={styles.strengthContainer}>
                      <View style={styles.strengthBar}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <View
                            key={i}
                            style={[
                              styles.strengthSegment,
                              { backgroundColor: i <= passwordStrength().level ? passwordStrength().color : COLORS.outlineVariant },
                            ]}
                          />
                        ))}
                      </View>
                      <Text style={[styles.strengthLabel, { color: passwordStrength().color }]}>
                        {passwordStrength().label}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>CONFIRMER LE MOT DE PASSE</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Répétez le mot de passe"
                      placeholderTextColor={COLORS.outline}
                      value={confirmPassword}
                      onChangeText={(t) => { setConfirmPassword(t); setError(''); }}
                      secureTextEntry={!showPassword}
                    />
                    {confirmPassword.length > 0 && (
                      <Ionicons
                        name={newPassword === confirmPassword ? 'checkmark-circle' : 'close-circle'}
                        size={20}
                        color={newPassword === confirmPassword ? COLORS.success : COLORS.error}
                      />
                    )}
                  </View>
                </View>

                <View style={styles.rulesBox}>
                  {[
                    { rule: 'Au moins 8 caractères', met: newPassword.length >= 8 },
                    { rule: 'Une lettre majuscule', met: /[A-Z]/.test(newPassword) },
                    { rule: 'Une lettre minuscule', met: /[a-z]/.test(newPassword) },
                    { rule: 'Un chiffre', met: /[0-9]/.test(newPassword) },
                  ].map((r, i) => (
                    <View key={i} style={styles.ruleRow}>
                      <Ionicons
                        name={r.met ? 'checkmark-circle' : 'ellipse-outline'}
                        size={14}
                        color={r.met ? COLORS.success : COLORS.outline}
                      />
                      <Text style={[styles.ruleText, r.met && styles.ruleTextMet]}>{r.rule}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.primaryButton, loading && styles.buttonDisabled]}
                  onPress={handleChangePassword}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.onPrimary} />
                  ) : (
                    <>
                      <Text style={styles.primaryButtonText}>Définir mon mot de passe</Text>
                      <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimary} />
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}

            {step === 'terms' && (
              <>
                <View style={styles.termsBox}>
                  <Text style={styles.termsTitle}>Conditions Générales d'Utilisation</Text>
                  <ScrollView style={styles.termsScroll} nestedScrollEnabled>
                    <Text style={styles.termsContent}>
                      {`En utilisant l'application EduCI, vous acceptez les conditions suivantes :\n\n`}
                      {`1. UTILISATION AUTORISÉE\n`}
                      {`L'application est exclusivement réservée aux membres autorisés des établissements partenaires (élèves, parents, enseignants, personnel).\n\n`}
                      {`2. CONFIDENTIALITÉ\n`}
                      {`Vos données personnelles sont protégées conformément aux réglementations en vigueur. Les données sont isolées par établissement.\n\n`}
                      {`3. SÉCURITÉ DU COMPTE\n`}
                      {`Vous êtes responsable de la confidentialité de vos identifiants. Ne partagez jamais votre mot de passe ou QR Code.\n\n`}
                      {`4. USAGE RESPONSABLE\n`}
                      {`Toute utilisation frauduleuse, tentative d'accès non autorisé ou contournement des mesures de sécurité entraînera la suspension immédiate du compte.\n\n`}
                      {`5. DONNÉES\n`}
                      {`Les données académiques, financières et personnelles sont la propriété de l'établissement et de l'utilisateur concerné.`}
                    </Text>
                  </ScrollView>
                </View>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}>
                    {acceptedTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <Text style={styles.checkboxText}>
                    J'accepte les conditions générales d'utilisation d'EduCI
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.primaryButton, !acceptedTerms && styles.buttonDisabled]}
                  onPress={handleAcceptTerms}
                  disabled={!acceptedTerms}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Accepter et continuer</Text>
                  <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimary} />
                </TouchableOpacity>
              </>
            )}

            {step === 'profile' && (
              <>
                <View style={styles.infoBox}>
                  <Ionicons name="information-circle" size={18} color={COLORS.primary} />
                  <Text style={styles.infoText}>
                    Ces informations sont facultatives mais permettent à votre établissement de mieux vous contacter.
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>TÉLÉPHONE (facultatif)</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="call-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="+225 07 XX XX XX XX"
                      placeholderTextColor={COLORS.outline}
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>CONTACT D'URGENCE (facultatif)</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="people-outline" size={20} color={COLORS.outline} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Nom et téléphone"
                      placeholderTextColor={COLORS.outline}
                      value={emergencyContact}
                      onChangeText={setEmergencyContact}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.primaryButton, loading && styles.buttonDisabled]}
                  onPress={handleCompleteProfile}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.onPrimary} />
                  ) : (
                    <>
                      <Text style={styles.primaryButtonText}>Terminer l'activation</Text>
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.onPrimary} />
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={() => handleCompleteProfile()}
                  disabled={loading}
                >
                  <Text style={styles.skipButtonText}>Passer cette étape</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
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
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.outlineVariant,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressDotCurrent: {
    backgroundColor: COLORS.primary,
    width: 56,
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: withAlpha(COLORS.primary, 0.08),
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.onSurface,
    lineHeight: 19,
  },
  identityCard: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 4,
  },
  identityLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginTop: 8,
  },
  identityValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
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
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  strengthBar: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
    height: 4,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  rulesBox: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 8,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ruleText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  ruleTextMet: {
    color: COLORS.success,
  },
  termsBox: {
    marginBottom: 16,
  },
  termsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 12,
  },
  termsScroll: {
    maxHeight: 200,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    padding: 14,
  },
  termsContent: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.outline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.onSurface,
    lineHeight: 18,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 52,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
  },
  skipButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
});
