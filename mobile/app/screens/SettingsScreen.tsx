import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert, Modal, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isPushEnabled as getPushEnabled } from '../../services/notifications';
import { SUPPORT, callSupport, openWhatsApp, emailSupport } from '../../constants/support';
import { useNotifications } from '../hooks/useNotifications';
import { supabase } from '../../services/supabase';

const ONBOARDING_KEY = '@educi_onboarding_seen';
const NOTIF_PREFS_KEY = '@educi_notif_prefs';
const VOICE_ENABLED_KEY = '@educi_splash_voice';

export default function SettingsScreen({ navigation }: any) {
  const { t, lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const { updatePushEnabled } = useNotifications();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [notifGrades, setNotifGrades] = useState(true);
  const [notifPayments, setNotifPayments] = useState(true);
  const [notifAttendance, setNotifAttendance] = useState(false);
  const [splashVoice, setSplashVoice] = useState(true);

  useEffect(() => {
    getPushEnabled().then(setPushEnabled);
    loadNotifPrefs();
    AsyncStorage.getItem(VOICE_ENABLED_KEY).then((v) => setSplashVoice(v !== 'false'));
  }, []);

  async function loadNotifPrefs() {
    try {
      const raw = await AsyncStorage.getItem(NOTIF_PREFS_KEY);
      if (raw) {
        const prefs = JSON.parse(raw);
        if (prefs.grades !== undefined) setNotifGrades(prefs.grades);
        if (prefs.payments !== undefined) setNotifPayments(prefs.payments);
        if (prefs.attendance !== undefined) setNotifAttendance(prefs.attendance);
      }
    } catch {}
  }

  async function saveNotifPrefs(prefs: { grades: boolean; payments: boolean; attendance: boolean }) {
    try {
      await AsyncStorage.setItem(NOTIF_PREFS_KEY, JSON.stringify(prefs));
    } catch {}
  }

  const getRoleLabel = (role?: string): string => {
    return role || t('common.profile');
  };

  const handleLogout = () => {
    Alert.alert(
      t('settings_screen.disconnect'),
      t('settings_screen.disconnectConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings_screen.disconnect'),
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  async function handleChangePassword() {
    if (!newPassword.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nouveau mot de passe.');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Erreur', t('errors.passwordTooShort'));
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', t('errors.passwordMismatch'));
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      Alert.alert('Succès', 'Mot de passe modifié avec succès.');
      setPasswordModalVisible(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      Alert.alert('Erreur', err?.message || 'Impossible de modifier le mot de passe.');
    } finally {
      setPasswordLoading(false);
    }
  }

  function handleLanguageToggle() {
    const newLang = lang === 'fr' ? 'en' : 'fr';
    setLang(newLang);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || t('common.profile')}</Text>
            <Text style={styles.role}>{getRoleLabel(user?.role)}</Text>
            {user?.school?.name && (
              <Text style={styles.school}>{user.school.name}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="pencil" size={14} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {[
          {
            section: t('settings_screen.account'),
            items: [
              { id: 'editProfile', icon: 'person-outline', label: t('settings_screen.editProfile'), type: 'link' as const },
              { id: 'email', icon: 'mail-outline', label: t('settings_screen.email'), value: user?.email || '-', type: 'info' as const },
              { id: 'role', icon: 'shield-outline', label: t('settings_screen.role'), value: getRoleLabel(user?.role), type: 'info' as const },
            ],
          },
          {
            section: 'Langue',
            items: [
              { id: 'language', icon: 'language-outline', label: 'Langue', value: lang === 'fr' ? 'Français' : 'English', type: 'toggle' as const },
            ],
          },
          {
            section: t('settings_screen.notifications'),
            items: [
              { id: 'push', icon: 'notifications-outline', label: t('settings_screen.push'), type: 'toggle' as const },
              { id: 'emailNotif', icon: 'mail-outline', label: t('settings_screen.email'), type: 'toggle' as const },
              { id: 'notifGrades', icon: 'school-outline', label: 'Notes', type: 'toggle' as const },
              { id: 'notifPayments', icon: 'card-outline', label: 'Paiements', type: 'toggle' as const },
              { id: 'notifAttendance', icon: 'checkmark-circle-outline', label: 'Présences', type: 'toggle' as const },
              { id: 'splashVoice', icon: 'volume-high-outline', label: 'Annonce vocale au démarrage', type: 'toggle' as const },
            ],
          },
          {
            section: t('settings_screen.security'),
            items: [
              { id: 'changePassword', icon: 'lock-closed-outline', label: t('settings_screen.changePassword'), type: 'link' as const },
              { id: 'biometrics', icon: 'finger-print-outline', label: t('settings_screen.biometrics'), type: 'toggle' as const },
            ],
          },
          {
            section: t('settings_screen.support'),
            items: [
              { id: 'helpCenter', icon: 'help-circle-outline', label: t('settings_screen.helpCenter'), type: 'link' as const },
              { id: 'contactUs', icon: 'chatbubble-outline', label: t('settings_screen.contactUs'), type: 'link' as const },
              { id: 'termsOfUse', icon: 'document-text-outline', label: t('settings_screen.termsOfUse'), type: 'link' as const },
              { id: 'replayOnboarding', icon: 'play-circle-outline', label: "Revoir l'introduction", type: 'link' as const },
            ],
          },
        ].map((group) => (
          <View key={group.section} style={styles.group}>
            <Text style={styles.groupTitle}>{group.section}</Text>
            <View style={styles.groupCard}>
              {group.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.item, i < group.items.length - 1 && styles.itemBorder]}
                  onPress={async () => {
                    if (item.id === 'replayOnboarding') {
                      await AsyncStorage.removeItem(ONBOARDING_KEY);
                      await logout();
                    } else if (item.id === 'editProfile') {
                      navigation.navigate('Profile');
                    } else if (item.id === 'changePassword') {
                      setPasswordModalVisible(true);
                    } else if (item.id === 'language') {
                      handleLanguageToggle();
                    } else if (item.id === 'helpCenter') {
                      Alert.alert('Centre d\'aide', `Contactez ${SUPPORT.emails.support} pour toute assistance.`);
                    } else if (item.id === 'contactUs') {
                      Alert.alert('Nous contacter', `Email: ${SUPPORT.emails.support}\nTél: ${SUPPORT.phoneDisplay}\nWhatsApp: ${SUPPORT.whatsappDisplay}`, [
                        { text: 'Appeler', onPress: callSupport },
                        { text: 'WhatsApp', onPress: () => openWhatsApp() },
                        { text: 'Email', onPress: () => emailSupport() },
                        { text: 'Fermer', style: 'cancel' },
                      ]);
                    } else if (item.id === 'termsOfUse') {
                      Alert.alert('Conditions d\'utilisation', 'Version 1.0 — Tous droits réservés.');
                    }
                  }}
                  activeOpacity={item.type === 'toggle' ? 1 : 0.6}
                >
                  <View style={styles.itemLeft}>
                    <View style={styles.itemIcon}>
                      <Ionicons name={item.icon as any} size={18} color={COLORS.primary} />
                    </View>
                    <View>
                      <Text style={styles.itemLabel}>{item.label}</Text>
                      {item.type === 'info' && item.value && (
                        <Text style={styles.itemValue}>{item.value}</Text>
                      )}
                      {item.id === 'language' && (
                        <Text style={styles.itemValue}>{lang === 'fr' ? 'Francais' : 'English'}</Text>
                      )}
                    </View>
                  </View>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={
                        item.id === 'push' ? pushEnabled :
                        item.id === 'emailNotif' ? emailEnabled :
                        item.id === 'notifGrades' ? notifGrades :
                        item.id === 'notifPayments' ? notifPayments :
                        item.id === 'notifAttendance' ? notifAttendance :
                        item.id === 'splashVoice' ? splashVoice :
                        item.id === 'language' ? lang === 'fr' :
                        biometricsEnabled
                      }
                      onValueChange={(v) => {
                        if (item.id === 'push') {
                          setPushEnabled(v);
                          updatePushEnabled(v);
                        } else if (item.id === 'emailNotif') {
                          setEmailEnabled(v);
                        } else if (item.id === 'notifGrades') {
                          setNotifGrades(v);
                          saveNotifPrefs({ grades: v, payments: notifPayments, attendance: notifAttendance });
                        } else if (item.id === 'notifPayments') {
                          setNotifPayments(v);
                          saveNotifPrefs({ grades: notifGrades, payments: v, attendance: notifAttendance });
                        } else if (item.id === 'notifAttendance') {
                          setNotifAttendance(v);
                          saveNotifPrefs({ grades: notifGrades, payments: notifPayments, attendance: v });
                        } else if (item.id === 'splashVoice') {
                          setSplashVoice(v);
                          AsyncStorage.setItem(VOICE_ENABLED_KEY, v ? 'true' : 'false');
                        } else if (item.id === 'language') {
                          handleLanguageToggle();
                        } else {
                          setBiometricsEnabled(v);
                        }
                      }}
                      trackColor={{ false: COLORS.surfaceContainerHigh, true: COLORS.primary }}
                      thumbColor={COLORS.onPrimary}
                    />
                  ) : item.type === 'link' ? (
                    <Ionicons name="chevron-forward" size={18} color={COLORS.outlineVariant} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>{t('settings_screen.disconnect')}</Text>
        </TouchableOpacity>

        <View style={styles.securityBanner}>
          <Ionicons name="shield-checkmark-outline" size={16} color={COLORS.success} />
          <Text style={styles.securityBannerText}>
            {t('settings_screen.secureSession')}
          </Text>
        </View>

        <Text style={styles.version}>EduCI v1.0.0</Text>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('settings_screen.changePassword')}</Text>
              <TouchableOpacity onPress={() => setPasswordModalVisible(false)}>
                <Ionicons name="close" size={22} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="Nouveau mot de passe"
              placeholderTextColor={COLORS.outline}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              editable={!passwordLoading}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Confirmer le mot de passe"
              placeholderTextColor={COLORS.outline}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!passwordLoading}
            />

            {newPassword.length > 0 && newPassword.length < 8 && (
              <Text style={styles.modalHint}>{t('errors.passwordTooShort')}</Text>
            )}
            {newPassword !== confirmPassword && confirmPassword.length > 0 && (
              <Text style={[styles.modalHint, { color: COLORS.error }]}>{t('errors.passwordMismatch')}</Text>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalCancelBtn]}
                onPress={() => {
                  setPasswordModalVisible(false);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                disabled={passwordLoading}
              >
                <Text style={styles.modalCancelText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalConfirmBtn]}
                onPress={handleChangePassword}
                disabled={passwordLoading || !newPassword || !confirmPassword}
              >
                {passwordLoading ? (
                  <ActivityIndicator size="small" color={COLORS.onPrimary} />
                ) : (
                  <Text style={styles.modalConfirmText}>{t('common.save')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <BottomTabBar
        activeTab="profile"
        onTabPress={(tab) => {
          const r: Record<string, string> = {
            home: 'Home', learning: 'Learning', payments: 'Payments',
            messages: 'Messages', profile: 'Profile',
          };
          navigation.navigate(r[tab] || 'Home');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backBtn: { padding: 20, paddingBottom: 0 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: COLORS.primary },
  profileInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface },
  role: { fontSize: 13, color: COLORS.onSurfaceVariant, marginTop: 2 },
  school: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
  editBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  group: { paddingHorizontal: 20, marginBottom: 20 },
  groupTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  groupCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  itemBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainer },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: { fontSize: 14, fontWeight: '600', color: COLORS.onSurface },
  itemValue: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: COLORS.errorContainer,
    borderRadius: 16,
    marginBottom: 16,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: COLORS.error },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  securityBannerText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  version: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface },
  modalInput: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.onSurface,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: 12,
  },
  modalHint: { fontSize: 12, color: COLORS.warning, marginBottom: 8 },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  modalBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  modalCancelBtn: { backgroundColor: COLORS.surfaceContainerHigh },
  modalConfirmBtn: { backgroundColor: COLORS.primary },
  modalCancelText: { fontSize: 14, fontWeight: '600', color: COLORS.onSurfaceVariant },
  modalConfirmText: { fontSize: 14, fontWeight: '700', color: COLORS.onPrimary },
});
