import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { supabase } from '../../services/supabase';

export default function TeacherSettingsScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [classReminders, setClassReminders] = useState(true);
  const [gradeReports, setGradeReports] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => { loadProfile(); }, [user?.id]);

  async function loadProfile() {
    if (!user?.id) return;
    try {
      const { data } = await supabase
        .from('teachers')
        .select('id, first_name, last_name, matricule, subject:subjects(name), school:schools(name)')
        .eq('user_id', user.id).single();
      setTeacher(data);
    } catch (err) {
      console.error('[TeacherSettings]', err);
    } finally {
      setLoading(false);
    }
  }

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      Alert.alert('Succès', 'Mot de passe modifié avec succès.');
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Échec du changement de mot de passe.');
    } finally {
      setChangingPassword(false);
    }
  };

  const teacherName = teacher ? `${teacher.first_name || ''} ${teacher.last_name || ''}`.trim() : (user?.name || 'Professeur');
  const initials = teacherName.split(' ').map((n: string) => n[0]).join('').slice(0, 2);
  const subjectName = teacher?.subject?.name || '';
  const schoolName = teacher?.school?.name || '';
  const matricule = teacher?.matricule || '';

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials || 'T'}</Text>
          </View>
          <Text style={styles.userName}>{teacherName}</Text>
          {subjectName ? <Text style={styles.userRole}>{subjectName}</Text> : null}
          {schoolName ? <Text style={styles.schoolName}>{schoolName}</Text> : null}
          {matricule ? (
            <View style={styles.idBadge}>
              <Text style={styles.idLabel}>Code:</Text>
              <Text style={styles.idValue}>{matricule}</Text>
            </View>
          ) : null}
        </View>

        {/* Account Info */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <Ionicons name="person" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.cardTitle}>Informations</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email || '--'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Matricule</Text>
            <Text style={styles.infoValue}>{matricule || '--'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Matière</Text>
            <Text style={styles.infoValue}>{subjectName || '--'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Établissement</Text>
            <Text style={styles.infoValue}>{schoolName || '--'}</Text>
          </View>
        </View>

        {/* Language */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={[styles.cardIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="language" size={20} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Langue</Text>
              <Text style={{ fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 }}>Français</Text>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="notifications" size={20} color="#EA580C" />
            </View>
            <Text style={styles.cardTitle}>Notifications</Text>
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Rappels de cours</Text>
            <Switch value={classReminders} onValueChange={setClassReminders} trackColor={{ false: '#c7c4d84d', true: COLORS.primary }} thumbColor={COLORS.onPrimary} />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Rapports de notes</Text>
            <Switch value={gradeReports} onValueChange={setGradeReports} trackColor={{ false: '#c7c4d84d', true: COLORS.primary }} thumbColor={COLORS.onPrimary} />
          </View>
        </View>

        {/* Security */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
            </View>
            <Text style={styles.cardTitle}>Sécurité</Text>
          </View>
          <TouchableOpacity style={styles.linkRow} onPress={() => setShowPasswordForm(!showPasswordForm)}>
            <Text style={styles.linkText}>Changer le mot de passe</Text>
            <Ionicons name={showPasswordForm ? 'chevron-up' : 'chevron-forward'} size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
          {showPasswordForm && (
            <View style={styles.passwordForm}>
              <TextInput style={styles.passwordInput} placeholder="Nouveau mot de passe" secureTextEntry value={newPassword} onChangeText={setNewPassword} placeholderTextColor={COLORS.outline} />
              <TextInput style={styles.passwordInput} placeholder="Confirmer le mot de passe" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor={COLORS.outline} />
              <TouchableOpacity style={styles.passwordBtn} onPress={handleChangePassword} disabled={changingPassword}>
                {changingPassword ? <ActivityIndicator color={COLORS.onPrimary} size="small" /> : <Text style={styles.passwordBtnText}>Modifier</Text>}
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('TeacherCheckin')}>
            <Text style={styles.linkText}>Mon pointage</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => {
          Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Déconnexion', style: 'destructive', onPress: logout },
          ]);
        }}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
      </KeyboardAvoidingView>

      <TeacherTabBar activeTab="profile" onTabPress={(tab) => {
        const r: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
        navigation.navigate(r[tab] || 'TeacherDashboard');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  profileSection: { alignItems: 'center', paddingTop: 20, paddingBottom: 20 },
  avatar: { width: 88, height: 88, borderRadius: 24, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 30, fontWeight: '800', color: COLORS.primary },
  userName: { fontSize: 22, fontWeight: '800', color: COLORS.onSurface },
  userRole: { fontSize: 13, fontWeight: '600', color: COLORS.primary, marginTop: 4 },
  schoolName: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  idBadge: { flexDirection: 'row', backgroundColor: COLORS.surfaceContainerLow, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginTop: 8 },
  idLabel: { fontSize: 11, fontWeight: '600', color: COLORS.primary, marginRight: 4 },
  idValue: { fontSize: 11, fontWeight: '700', color: COLORS.onSurface },

  card: { backgroundColor: COLORS.surfaceContainerLowest, marginHorizontal: 20, marginBottom: 12, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  cardIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.onSurface },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: withAlpha(COLORS.outlineVariant, 0.15) },
  infoLabel: { fontSize: 13, color: COLORS.onSurfaceVariant },
  infoValue: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface, maxWidth: '60%', textAlign: 'right' },


  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  switchLabel: { fontSize: 14, fontWeight: '500', color: COLORS.onSurface },

  linkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: withAlpha(COLORS.outlineVariant, 0.15) },
  linkText: { fontSize: 14, fontWeight: '500', color: COLORS.onSurface },

  passwordForm: { paddingVertical: 10, gap: 10 },
  passwordInput: { backgroundColor: COLORS.surfaceContainer, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: COLORS.onSurface },
  passwordBtn: { backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  passwordBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.onPrimary },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.surfaceContainerLowest, marginHorizontal: 20, marginTop: 8, paddingVertical: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  logoutText: { fontSize: 15, fontWeight: '700', color: COLORS.error },
});
