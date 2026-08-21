import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useAuth } from '../context/AuthContext';
import { COLORS, withAlpha } from '../../constants/colors';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { supabase } from '../../services/supabase';

export default function TeacherCheckinScreen({ navigation }: any) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkedOut, setCheckedOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => { initData(); }, [user?.id]);

  async function initData() {
    if (!user?.id) return;
    setInitialLoading(true);
    try {
      const { data: teacher } = await supabase
        .from('teachers').select('id').eq('user_id', user.id).single();
      if (teacher) {
        setTeacherId(teacher.id);
        await loadTodayStatus(teacher.id);
        await loadHistory(teacher.id);
      }
    } catch (err) {
      console.error('[TeacherCheckin] init', err);
    } finally {
      setInitialLoading(false);
    }
  }

  async function loadTodayStatus(tId: string) {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('teacher_attendance')
      .select('check_in_time, check_out_time, status')
      .eq('teacher_id', tId).eq('date', today).maybeSingle();

    if (data) {
      if (data.check_in_time) {
        setCheckedIn(true);
        setCheckInTime(new Date(data.check_in_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
        setStatus(data.status || 'PRESENT');
      }
      if (data.check_out_time) {
        setCheckedOut(true);
      }
    }
  }

  async function loadHistory(tId: string) {
    const { data } = await supabase
      .from('teacher_attendance')
      .select('date, check_in_time, check_out_time, status')
      .eq('teacher_id', tId)
      .order('date', { ascending: false })
      .limit(7);
    setHistory(data || []);
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (teacherId) {
      await loadTodayStatus(teacherId);
      await loadHistory(teacherId);
    }
    setRefreshing(false);
  }, [teacherId]);

  const handleCheckIn = async () => {
    if (!teacherId) return;
    setLoading(true);
    setMessage('');
    try {
      const { status: permStatus } = await Location.requestForegroundPermissionsAsync();
      if (permStatus !== 'granted') {
        Alert.alert('Erreur', 'Permission de localisation requise pour le pointage GPS.');
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const today = new Date().toISOString().split('T')[0];
      const now = new Date().toISOString();

      const { error } = await supabase.from('teacher_attendance').upsert({
        teacher_id: teacherId,
        date: today,
        check_in_time: now,
        status: 'PRESENT',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }, { onConflict: 'teacher_id,date' });

      if (error) throw error;

      setCheckedIn(true);
      setCheckInTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      setStatus('PRESENT');
      setMessage('Pointage enregistré avec succès');
      loadHistory(teacherId);
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Pointage échoué.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!teacherId) return;
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase.from('teacher_attendance')
        .update({ check_out_time: new Date().toISOString() })
        .eq('teacher_id', teacherId).eq('date', today);
      if (error) throw error;

      setCheckedOut(true);
      setMessage('Fin de service enregistrée');
      loadHistory(teacherId);
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Départ échoué');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
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
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 12 }}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
          <Ionicons name="location" size={28} color={COLORS.primary} />
          <Text style={styles.title}>Pointage GPS</Text>
          <Text style={styles.clock}>
            {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </Text>
          <Text style={styles.subtitle}>
            {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
        </View>

        {message ? (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            <Text style={styles.successText}>{message}</Text>
          </View>
        ) : null}

        <View style={[styles.statusCard, checkedIn && styles.statusCardSuccess]}>
          <Ionicons
            name={checkedIn ? (checkedOut ? 'checkmark-done-circle' : 'checkmark-circle') : 'radio-button-off'}
            size={48}
            color={checkedIn ? COLORS.success : COLORS.outline}
          />
          <Text style={styles.statusText}>
            {checkedOut ? 'Service terminé' : checkedIn ? (status === 'LATE' ? 'En retard' : 'Présent') : 'Non pointé'}
          </Text>
          {checkInTime ? <Text style={styles.statusTime}>Depuis {checkInTime}</Text> : null}
        </View>

        {!checkedIn ? (
          <TouchableOpacity style={[styles.primaryBtn, loading && { opacity: 0.7 }]} onPress={handleCheckIn} disabled={loading}>
            {loading ? <ActivityIndicator color={COLORS.onPrimary} /> : (
              <>
                <Ionicons name="location" size={20} color={COLORS.onPrimary} />
                <Text style={styles.primaryBtnText}>Pointer ma présence</Text>
              </>
            )}
          </TouchableOpacity>
        ) : !checkedOut ? (
          <TouchableOpacity style={[styles.secondaryBtn, loading && { opacity: 0.7 }]} onPress={handleCheckOut} disabled={loading}>
            {loading ? <ActivityIndicator color={COLORS.primary} /> : (
              <>
                <Ionicons name="log-out" size={20} color={COLORS.primary} />
                <Text style={styles.secondaryBtnText}>Pointer ma sortie</Text>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBox}>
            <Ionicons name="checkmark-done-circle" size={24} color={COLORS.success} />
            <Text style={styles.completedText}>Journée terminée</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={18} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Méthode</Text>
            <Text style={styles.infoValue}>GPS</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark-outline" size={18} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Statut</Text>
            <Text style={styles.infoValue}>{checkedIn ? 'Validé' : 'En attente'}</Text>
          </View>
        </View>

        {history.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historySectionTitle}>Historique récent</Text>
            {history.map((record: any, i: number) => {
              const checkin = record.check_in_time ? new Date(record.check_in_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--';
              const checkout = record.check_out_time ? new Date(record.check_out_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--';
              const dateStr = record.date ? new Date(record.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '';
              const isLate = record.status === 'LATE';
              return (
                <View key={i} style={styles.historyItem}>
                  <View style={[styles.historyDot, { backgroundColor: isLate ? COLORS.warning : COLORS.success }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.historyDate}>{dateStr}</Text>
                    <Text style={styles.historyTime}>{checkin} → {checkout}</Text>
                  </View>
                  {isLate && <View style={styles.lateBadge}><Text style={styles.lateBadgeText}>Retard</Text></View>}
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TeacherTabBar activeTab="dashboard" onTabPress={(tab) => {
        const r: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
        navigation.navigate(r[tab] || 'TeacherDashboard');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 12 },
  header: { alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.onSurface, marginTop: 6 },
  clock: { fontSize: 36, fontWeight: '900', color: COLORS.primary, marginTop: 4, letterSpacing: -1 },
  subtitle: { fontSize: 13, color: COLORS.onSurfaceVariant, marginTop: 4, textTransform: 'capitalize' },
  successBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#ECFDF5', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16 },
  successText: { fontSize: 13, fontWeight: '600', color: COLORS.success },
  statusCard: { alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  statusCardSuccess: { borderWidth: 2, borderColor: withAlpha(COLORS.success, 0.25) },
  statusText: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, marginTop: 8 },
  statusTime: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 4 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.primary, borderRadius: 16, paddingVertical: 16, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  primaryBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.onPrimary },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, paddingVertical: 16, borderWidth: 2, borderColor: COLORS.primary },
  secondaryBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
  completedBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#ECFDF5', borderRadius: 16, paddingVertical: 16 },
  completedText: { fontSize: 15, fontWeight: '700', color: COLORS.success },
  infoRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  infoCard: { flex: 1, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, padding: 12, alignItems: 'center', gap: 4 },
  infoLabel: { fontSize: 10, color: COLORS.onSurfaceVariant, fontWeight: '600', textTransform: 'uppercase' },
  infoValue: { fontSize: 14, fontWeight: '700', color: COLORS.onSurface },
  historySection: { marginTop: 24 },
  historySectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface, marginBottom: 12 },
  historyItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, padding: 12, marginBottom: 8 },
  historyDot: { width: 8, height: 8, borderRadius: 4 },
  historyDate: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface },
  historyTime: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  lateBadge: { backgroundColor: withAlpha(COLORS.warning, 0.12), paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  lateBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.warning },
});
